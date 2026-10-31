from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.db.models import Count

from courses.models import GlossaryTerm, Discipline
from courses.serializers import GlossaryTermListSerializer, GlossaryTermDetailSerializer, DisciplineSerializer


class GlossaryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Glossary-specific endpoints that build on the courses glossary.
    """
    queryset = GlossaryTerm.objects.select_related('discipline').prefetch_related(
        'related_courses', 'related_terms', 'bookmarked_by'
    )
    permission_classes = [AllowAny]
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return GlossaryTermDetailSerializer
        return GlossaryTermListSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filter by discipline
        discipline = self.request.query_params.get('discipline')
        if discipline:
            queryset = queryset.filter(discipline__slug=discipline)
        
        # Filter by category
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category__iexact=category)
        
        # Filter by difficulty
        difficulty = self.request.query_params.get('difficulty')
        if difficulty:
            queryset = queryset.filter(difficulty=difficulty)
        
        # Filter starred/bookmarked
        starred = self.request.query_params.get('starred')
        if starred:
            user = self.request.user if self.request.user.is_authenticated else self._get_anonymous_user()
            queryset = queryset.filter(bookmarked_by=user)
        
        # Search
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                term__icontains=search
            ) | queryset.filter(
                short_definition__icontains=search
            ) | queryset.filter(
                full_definition__icontains=search
            )
        
        return queryset
    
    def _get_user(self):
        return self.request.user if self.request.user.is_authenticated else self._get_anonymous_user()
    
    def _get_anonymous_user(self):
        from django.contrib.auth import get_user_model
        User = get_user_model()
        user, _ = User.objects.get_or_create(
            username='anonymous',
            defaults={'email': 'anonymous@studyflow.local', 'first_name': 'Anonymous', 'last_name': 'User'}
        )
        return user
    
    @action(detail=True, methods=['post'], permission_classes=[AllowAny])
    def bookmark(self, request, pk=None):
        """Toggle bookmark for a glossary term."""
        term = self.get_object()
        user = self._get_user()
        
        if term.bookmarked_by.filter(id=user.id).exists():
            term.bookmarked_by.remove(user)
            bookmarked = False
        else:
            term.bookmarked_by.add(user)
            bookmarked = True
        
        return Response({'is_bookmarked': bookmarked})
    
    @action(detail=True, methods=['post'], permission_classes=[AllowAny])
    def ask_ai(self, request, pk=None):
        """Ask AI to explain this term in detail."""
        term = self.get_object()
        user = self._get_user()
        
        # This would integrate with the chat system
        # For now, return a structured prompt the frontend can use
        prompt = f"""Explain the concept "{term.term}" in detail for a university student.

Context:
- Discipline: {term.discipline.name if term.discipline else 'General'}
- Category: {term.category or 'N/A'}
- Difficulty: {term.difficulty}
- Formal definition: {term.formal_definition or 'Not provided'}
- Current understanding: {term.short_definition}

Please provide:
1. A clear analogy or real-world example
2. Why this concept matters
3. Common misconceptions
4. A simple check-your-understanding question"""
        
        return Response({
            'term': term.term,
            'suggested_prompt': prompt,
            'chat_url': f'/api/chat/sessions/?course={term.related_courses.first().id if term.related_courses.exists() else ""}&topic={term.related_topics.first().id if term.related_topics.exists() else ""}',
        })
    
    @action(detail=False, methods=['get'])
    def categories(self, request):
        """Get all unique categories with counts."""
        categories = GlossaryTerm.objects.values('category').annotate(
            count=Count('id')
        ).exclude(category='').order_by('-count')
        return Response(list(categories))
    
    @action(detail=False, methods=['get'])
    def disciplines(self, request):
        """Get all disciplines with term counts."""
        disciplines = Discipline.objects.filter(is_active=True).annotate(
            term_count=Count('glossary_terms')
        ).values('id', 'name', 'slug', 'icon', 'color', 'term_count')
        return Response(list(disciplines))
    
    @action(detail=False, methods=['get'])
    def alphabet(self, request):
        """Get A-Z letter counts for scrubber navigation."""
        from django.db.models import Count
        letters = GlossaryTerm.objects.extra(
            select={'first_letter': "UPPER(SUBSTRING(term, 1, 1))"}
        ).values('first_letter').annotate(
            count=Count('id')
        ).order_by('first_letter')
        return Response(list(letters))
    
    @action(detail=False, methods=['get'])
    def random(self, request):
        """Get a random term for 'term of the day'."""
        term = GlossaryTerm.objects.order_by('?').first()
        if term:
            serializer = self.get_serializer(term)
            return Response(serializer.data)
        return Response({'detail': 'No terms available'}, status=status.HTTP_404_NOT_FOUND)