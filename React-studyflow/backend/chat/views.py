import time
import httpx
from django.conf import settings
from django.utils import timezone
from django.db.models import Q
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django_ratelimit.decorators import ratelimit
from django_ratelimit.exceptions import Ratelimited

from .models import ChatSession, ChatMessage, AIUsageLog
from .serializers import (
    ChatSessionListSerializer,
    ChatSessionDetailSerializer,
    ChatSessionCreateSerializer,
    ChatSessionUpdateSerializer,
    ChatMessageSerializer,
    ChatMessageCreateSerializer,
    SendMessageSerializer,
    FeedbackSerializer,
    ExportSessionSerializer,
)


class RatelimitExceeded(Exception):
    pass


class ChatSessionViewSet(viewsets.ModelViewSet):
    """ViewSet for managing chat sessions."""
    permission_classes = [AllowAny]
    parser_classes = [JSONParser, MultiPartParser, FormParser]
    
    def get_queryset(self):
        # For development, use first user or create anonymous user
        user = self.request.user if self.request.user.is_authenticated else self._get_anonymous_user()
        queryset = ChatSession.objects.filter(user=user).select_related(
            'course', 'topic'
        ).prefetch_related('messages')
        
        # Filter by archive status
        archived = self.request.query_params.get('archived')
        if archived is not None:
            queryset = queryset.filter(is_archived=archived.lower() == 'true')
        
        # Filter by course
        course_id = self.request.query_params.get('course')
        if course_id:
            queryset = queryset.filter(course_id=course_id)
        
        # Filter by topic
        topic_id = self.request.query_params.get('topic')
        if topic_id:
            queryset = queryset.filter(topic_id=topic_id)
        
        return queryset
    
    def get_serializer_class(self):
        if self.action == 'list':
            return ChatSessionListSerializer
        elif self.action == 'create':
            return ChatSessionCreateSerializer
        elif self.action in ['update', 'partial_update']:
            return ChatSessionUpdateSerializer
        return ChatSessionDetailSerializer
    
    def perform_create(self, serializer):
        user = self.request.user if self.request.user.is_authenticated else self._get_anonymous_user()
        serializer.save(user=user)
    
    def _get_anonymous_user(self):
        """Get or create an anonymous user for development."""
        from django.contrib.auth import get_user_model
        User = get_user_model()
        user, _ = User.objects.get_or_create(
            username='anonymous',
            defaults={
                'email': 'anonymous@studyflow.local',
                'first_name': 'Anonymous',
                'last_name': 'User',
            }
        )
        return user
    
    @action(detail=True, methods=['post'])
    def messages(self, request, pk=None):
        """Send a message and get AI response."""
        session = self.get_object()
        serializer = SendMessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        content = serializer.validated_data.get('content', '')
        attachments = serializer.validated_data.get('attachments', [])
        regenerate = serializer.validated_data.get('regenerate', False)
        parent_message_id = serializer.validated_data.get('parent_message_id')
        max_tokens = serializer.validated_data.get('max_tokens', 4096)
        
        # Handle regeneration
        if regenerate and parent_message_id:
            try:
                parent_message = ChatMessage.objects.get(
                    id=parent_message_id,
                    session=session,
                    role='assistant'
                )
                # Find the user message that prompted this response
                user_messages = session.messages.filter(
                    role='user',
                    created_at__lt=parent_message.created_at
                ).order_by('-created_at')
                if user_messages.exists():
                    last_user_msg = user_messages.first()
                    content = last_user_msg.content
                    attachments = last_user_msg.attachments
                # Delete the old assistant message and its regenerations
                parent_message.regenerations.all().delete()
                parent_message.delete()
            except ChatMessage.DoesNotExist:
                return Response(
                    {'error': 'Parent message not found'},
                    status=status.HTTP_404_NOT_FOUND
                )
        
        # Create user message
        user_message = ChatMessage.objects.create(
            session=session,
            role='user',
            content=content,
            attachments=attachments,
        )
        
        # Get AI response
        ai_response = self._get_ai_response(
            session=session,
            user_message=user_message,
            max_tokens=max_tokens,
        )
        
        # Create assistant message
        assistant_message = ChatMessage.objects.create(
            session=session,
            role='assistant',
            content=ai_response['content'],
            model_used=ai_response['model_used'],
            tokens_used=ai_response['tokens_used'],
            generation_time_ms=ai_response['generation_time_ms'],
            parent_message=parent_message_id if regenerate else None,
        )
        
        # Update session token count
        session.total_tokens_used += ai_response['tokens_used']
        session.save(update_fields=['total_tokens_used', 'updated_at'])
        
        return Response({
            'user_message': ChatMessageSerializer(user_message).data,
            'assistant_message': ChatMessageSerializer(assistant_message).data,
        })
    
    def _model_supports_images(self, model_name):
        import re
        return bool(re.search(r'vision|vlm|vila|neva|fuyu|kosmos|deplot|phi-3-vision', model_name, re.I))

    def _build_nvidia_messages(self, base_messages, user_content, attachments, model_name):
        messages = [dict(m) for m in base_messages]
        
        text_parts = [user_content or ""]
        image_parts = []
        supports_vision = self._model_supports_images(model_name)
        
        for att in attachments or []:
            kind = att.get('kind')
            name = att.get('name', 'file')
            if kind == 'text' and att.get('text'):
                text_parts.append(f"\n\n--- Uploaded file: {name} ---\n{att['text'][:160000]}")
            elif kind == 'image':
                if supports_vision and att.get('dataUrl'):
                    image_parts.append({
                        "type": "image_url",
                        "image_url": {"url": att['dataUrl']}
                    })
                else:
                    text_parts.append(f"\n\n--- Uploaded image: {name} ---\nImage content requires a vision-capable model.")
        
        full_text = "".join(text_parts).strip()
        if not full_text and not image_parts:
            full_text = "Please analyze the attached content and explain what I should learn from it."
            
        if image_parts:
            content_payload = [{"type": "text", "text": full_text}] + image_parts
        else:
            content_payload = full_text
            
        messages.append({
            "role": "user",
            "content": content_payload
        })
        return messages

    def _get_ai_response(self, session, user_message, max_tokens):
        """Call NVIDIA API and return response."""
        start_time = time.time()
        
        # Build conversation history (last 8 messages)
        history = session.messages.order_by('-created_at')[:8]
        history = list(reversed(history))
        
        # System prompt
        course_title = session.course.title if session.course else "All courses"
        topic_title = session.topic.title if session.topic else "General study"
        topic_notes = session.topic.notes if session.topic else "No topic selected."
        
        system_prompt = f"""You are StudyFlow's Learning Assistant. Your role is to help learners form strong mental models through scaffolded, active learning—not just give answers.

CORE METHODS:
1. ELICIT FIRST: Ask the learner what they already know or think before providing explanations
2. ANALOGY BUILDING: Connect new concepts to familiar real-world analogies
3. ELABORATIVE INTERROGATION: Ask 'why' and 'how' questions to deepen understanding
4. MENTAL MODEL CHECKS: Ask learner to explain back in their own words
5. MISTAKE PATTERNING: Identify and address common misconceptions

CONVERSATION FLOW:
- Start with WHY: "Why do you think this matters?" or "What does this remind you of?"
- Offer PLAIN explanation only after eliciting prior knowledge
- Then offer FORMAL definition and connect it
- Build GLOSSARY incrementally as concepts emerge
- Provide EXAMPLES that learner can relate to
- Highlight MISCONCEPTIONS gently
- End with a small CHECK question

Course: {course_title}. Topic: {topic_title}.
Reference notes: {topic_notes}

NEVER give full answers immediately. Always scaffold learning through questions first."""
        
        base_messages = [{"role": "system", "content": system_prompt}]
        
        # Add conversation history
        for msg in history:
            if msg.id != user_message.id:  # Don't duplicate the current message
                base_messages.append({
                    "role": msg.role,
                    "content": msg.content
                })
        
        user_content = user_message.content or ""
        user_attachments = user_message.attachments or []
        
        # Call NVIDIA API with fallbacks
        api_key = settings.NVIDIA_API_KEY
        base_url = settings.NVIDIA_BASE_URL.rstrip('/')
        chat_endpoint = f"{base_url}/chat/completions"
        
        fallbacks = settings.NVIDIA_MODEL_FALLBACKS
        if isinstance(fallbacks, str):
            fallbacks = [m.strip() for m in fallbacks.split(',') if m.strip()]
        
        candidate_list = [settings.NVIDIA_MODEL_NAME] + list(fallbacks)
        model_candidates = []
        for m in candidate_list:
            if m and m not in model_candidates:
                model_candidates.append(m)
        
        headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}",
        }
        
        last_error = None
        
        for model_name in model_candidates:
            nvidia_messages = self._build_nvidia_messages(base_messages, user_content, user_attachments, model_name)
            payload = {
                "model": model_name,
                "messages": nvidia_messages,
                "chat_template_kwargs": {"enable_thinking": getattr(settings, 'NVIDIA_ENABLE_THINKING', False)},
                "temperature": 0.6,
                "top_p": 0.7,
                "max_tokens": max_tokens,
                "stream": False,
            }
            
            try:
                with httpx.Client(timeout=settings.NVIDIA_REQUEST_TIMEOUT) as client:
                    response = client.post(chat_endpoint, headers=headers, json=payload)
                
                generation_time_ms = int((time.time() - start_time) * 1000)
                
                if response.status_code == 200:
                    data = response.json()
                    content = self._extract_content(data)
                    
                    # Log usage
                    AIUsageLog.objects.create(
                        user=session.user,
                        session=session,
                        model=model_name,
                        endpoint=chat_endpoint,
                        prompt_tokens=data.get('usage', {}).get('prompt_tokens', 0),
                        completion_tokens=data.get('usage', {}).get('completion_tokens', 0),
                        total_tokens=data.get('usage', {}).get('total_tokens', 0),
                        latency_ms=generation_time_ms,
                        status_code=200,
                        course=session.course,
                        topic=session.topic,
                    )
                    
                    return {
                        'content': content,
                        'model_used': model_name,
                        'tokens_used': data.get('usage', {}).get('total_tokens', 0),
                        'generation_time_ms': generation_time_ms,
                    }
                else:
                    last_error = {
                        'status': response.status_code,
                        'body': response.text,
                        'model': model_name,
                    }
                    # Log failed attempt
                    AIUsageLog.objects.create(
                        user=session.user,
                        session=session,
                        model=model_name,
                        endpoint=chat_endpoint,
                        latency_ms=generation_time_ms,
                        status_code=response.status_code,
                        error_message=response.text[:500],
                        course=session.course,
                        topic=session.topic,
                    )
                    
                    if response.status_code in (401, 403):
                        break
                        
            except httpx.TimeoutException:
                last_error = {'status': 408, 'body': 'Request timeout', 'model': model_name}
            except Exception as e:
                last_error = {'status': 500, 'body': str(e), 'model': model_name}
        
        # All models failed
        error_content = "**Could not get AI response.**\n\n"
        if last_error:
            error_content += f"Last error: {last_error['body'][:200]}"
        
        # Log final failure
        AIUsageLog.objects.create(
            user=session.user,
            session=session,
            model=model_candidates[-1] if model_candidates else 'unknown',
            endpoint=chat_endpoint,
            latency_ms=int((time.time() - start_time) * 1000),
            status_code=last_error.get('status', 500) if last_error else 500,
            error_message=last_error.get('body', 'Unknown error')[:500] if last_error else 'All models failed',
            course=session.course,
            topic=session.topic,
        )
        
        return {
            'content': error_content,
            'model_used': 'error',
            'tokens_used': 0,
            'generation_time_ms': int((time.time() - start_time) * 1000),
        }
    
    def _extract_content(self, payload):
        """Extract text content from NVIDIA API response."""
        if payload.get('choices') and payload['choices'][0].get('message', {}).get('content'):
            return payload['choices'][0]['message']['content']
        if payload.get('output_text'):
            return payload['output_text']
        if payload.get('output'):
            return '\n'.join([
                part.get('text', part.get('content', ''))
                for item in payload['output']
                for part in item.get('content', [])
            ])
        return ""
    
    @action(detail=True, methods=['post'], url_path='messages/(?P<message_id>[^/.]+)/feedback')
    def message_feedback(self, request, pk=None, message_id=None):
        """Submit feedback for a message."""
        session = self.get_object()
        try:
            message = ChatMessage.objects.get(id=message_id, session=session)
        except ChatMessage.DoesNotExist:
            return Response({'error': 'Message not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = FeedbackSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        message.is_helpful = serializer.validated_data['is_helpful']
        message.feedback_text = serializer.validated_data.get('feedback_text', '')
        message.save(update_fields=['is_helpful', 'feedback_text'])
        
        return Response({'status': 'feedback recorded'})
    
    @action(detail=True, methods=['get'])
    def export(self, request, pk=None):
        """Export session as markdown."""
        session = self.get_object()
        serializer = ExportSessionSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        
        fmt = serializer.validated_data['format']
        include_meta = serializer.validated_data['include_metadata']
        include_atts = serializer.validated_data['include_attachments']
        
        if fmt == 'markdown':
            content = self._export_markdown(session, include_meta, include_atts)
            filename = f"StudyFlow_{session.course.code if session.course else 'Chat'}_{session.title}.md"
            content_type = 'text/markdown'
        elif fmt == 'json':
            content = self._export_json(session, include_meta, include_atts)
            filename = f"StudyFlow_{session.course.code if session.course else 'Chat'}_{session.title}.json"
            content_type = 'application/json'
        else:
            content = self._export_text(session, include_meta)
            filename = f"StudyFlow_{session.course.code if session.course else 'Chat'}_{session.title}.txt"
            content_type = 'text/plain'
        
        response = Response(content, content_type=content_type)
        response['Content-Disposition'] = f'attachment; filename="{filename}"'
        return response
    
    def _export_markdown(self, session, include_meta, include_atts):
        lines = []
        if include_meta:
            course_title = session.course.title if session.course else "General Assistant"
            lines.append(f"# StudyFlow AI - Study Session Notes\n")
            lines.append(f"**Course:** {course_title} ({session.course.code if session.course else 'ALL'})\n")
            if session.topic:
                lines.append(f"**Topic Focus:** {session.topic.title}\n")
            lines.append(f"**Date:** {timezone.now().strftime('%Y-%m-%d %H:%M')}\n")
            lines.append(f"**Session:** {session.title}\n")
            lines.append("---\n")
        
        for msg in session.messages.all():
            role_title = "### 👤 Student Question" if msg.role == 'user' else "### ✦ StudyFlow AI Tutor"
            lines.append(f"{role_title}\n")
            lines.append(f"{msg.content}\n")
            if include_atts and msg.attachments:
                lines.append("\n**Attachments:**\n")
                for att in msg.attachments:
                    lines.append(f"- {att.get('name', 'file')} ({att.get('kind', 'unknown')})\n")
            lines.append("\n---\n")
        
        return ''.join(lines)
    
    def _export_json(self, session, include_meta, include_atts):
        import json
        data = {
            'session': {
                'id': str(session.id),
                'title': session.title,
                'course': session.course.code if session.course else None,
                'topic': session.topic.title if session.topic else None,
                'created_at': session.created_at.isoformat(),
                'updated_at': session.updated_at.isoformat(),
            },
            'messages': [
                {
                    'id': str(msg.id),
                    'role': msg.role,
                    'content': msg.content,
                    'attachments': msg.attachments if include_atts else [],
                    'model_used': msg.model_used,
                    'tokens_used': msg.tokens_used,
                    'created_at': msg.created_at.isoformat(),
                }
                for msg in session.messages.all()
            ]
        }
        return json.dumps(data, indent=2)
    
    def _export_text(self, session, include_meta):
        lines = []
        if include_meta:
            course_title = session.course.title if session.course else "General Assistant"
            lines.append(f"StudyFlow AI - Study Session Notes")
            lines.append(f"Course: {course_title} ({session.course.code if session.course else 'ALL'})")
            if session.topic:
                lines.append(f"Topic Focus: {session.topic.title}")
            lines.append(f"Date: {timezone.now().strftime('%Y-%m-%d %H:%M')}")
            lines.append(f"Session: {session.title}")
            lines.append("=" * 50)
        
        for msg in session.messages.all():
            role_label = "Student" if msg.role == 'user' else "StudyFlow AI"
            lines.append(f"\n[{role_label}]: {msg.content}\n")
        
        return '\n'.join(lines)
    
    @action(detail=True, methods=['post'])
    def pin(self, request, pk=None):
        """Toggle pin status."""
        session = self.get_object()
        session.is_pinned = not session.is_pinned
        session.save(update_fields=['is_pinned', 'updated_at'])
        return Response({'is_pinned': session.is_pinned})
    
    @action(detail=True, methods=['post'])
    def archive(self, request, pk=None):
        """Toggle archive status."""
        session = self.get_object()
        session.is_archived = not session.is_archived
        session.save(update_fields=['is_archived', 'updated_at'])
        return Response({'is_archived': session.is_archived})
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Get chat statistics for the user."""
        queryset = self.get_queryset()
        total_sessions = queryset.count()
        archived_sessions = queryset.filter(is_archived=True).count()
        pinned_sessions = queryset.filter(is_pinned=True).count()
        total_messages = ChatMessage.objects.filter(session__user=request.user).count()
        user_messages = ChatMessage.objects.filter(session__user=request.user, role='user').count()
        ai_messages = ChatMessage.objects.filter(session__user=request.user, role='assistant').count()
        total_tokens = queryset.aggregate(
            total=models.Sum('total_tokens_used')
        )['total'] or 0
        
        return Response({
            'total_sessions': total_sessions,
            'archived_sessions': archived_sessions,
            'pinned_sessions': pinned_sessions,
            'active_sessions': total_sessions - archived_sessions,
            'total_messages': total_messages,
            'user_messages': user_messages,
            'ai_messages': ai_messages,
            'total_tokens_used': total_tokens,
        })


class ChatMessageViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for viewing messages (read-only, created via session)."""
    serializer_class = ChatMessageSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        user = self.request.user if self.request.user.is_authenticated else self._get_anonymous_user()
        return ChatMessage.objects.filter(session__user=user).select_related('session')
    
    def _get_anonymous_user(self):
        from django.contrib.auth import get_user_model
        User = get_user_model()
        user, _ = User.objects.get_or_create(
            username='anonymous',
            defaults={'email': 'anonymous@studyflow.local', 'first_name': 'Anonymous', 'last_name': 'User'}
        )
        return user