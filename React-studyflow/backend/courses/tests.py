from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework.test import APIClient

from .models import Course, LearningSession, Topic


class LearningSessionApiTests(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(
            username='learner',
            email='learner@example.test',
            password='test-password',
        )
        self.course = Course.objects.create(code='MTH201', title='Mathematical Methods I')
        self.flow = {
            'version': 1,
            'startNodeId': 'first',
            'nodes': [
                {
                    'id': 'first',
                    'conceptId': 'function-rule',
                    'question': {
                        'choices': [
                            {'id': 'correct', 'text': 'Correct'},
                            {'id': 'wrong', 'text': 'Wrong'},
                        ],
                    },
                    'outcomes': {
                        'correct': {'conceptStatus': 'understood', 'nextNodeId': None},
                        'wrong': {
                            'conceptStatus': 'needs_review',
                            'misconceptionId': 'two-outputs',
                            'nextNodeId': 'first',
                        },
                    },
                },
            ],
        }
        self.topic = Topic.objects.create(
            course=self.course,
            topic_id='mth201-t1',
            title='Functions',
            learning_guide={'sessionFlow': self.flow},
        )
        self.client = APIClient()
        self.client.force_authenticate(self.user)
        self.url = '/api/courses/learning-sessions/topic/mth201-t1/'

    def test_session_is_created_and_restored_for_authenticated_learner(self):
        first_response = self.client.get(self.url)
        self.assertEqual(first_response.status_code, 200)
        self.assertEqual(first_response.data['current_node_id'], 'first')
        self.assertEqual(LearningSession.objects.count(), 1)

        payload = {
            'current_node_id': 'first',
            'responses': [
                {'nodeId': 'first', 'choiceId': 'wrong', 'misconceptionId': 'two-outputs'},
            ],
            'concept_states': {'function-rule': 'needs_review'},
            'misconceptions': ['two-outputs'],
            'pending_choice_id': 'wrong',
            'is_completed': False,
        }
        save_response = self.client.put(self.url, payload, format='json')
        self.assertEqual(save_response.status_code, 200)

        restored = self.client.get(self.url)
        self.assertEqual(restored.data['responses'], payload['responses'])
        self.assertEqual(restored.data['concept_states'], payload['concept_states'])
        self.assertEqual(restored.data['pending_choice_id'], 'wrong')

    def test_session_rejects_answer_ids_not_in_the_authored_flow(self):
        self.client.get(self.url)
        payload = {
            'current_node_id': 'first',
            'responses': [{'nodeId': 'first', 'choiceId': 'not-authored'}],
            'concept_states': {},
            'misconceptions': [],
            'pending_choice_id': '',
            'is_completed': False,
        }

        response = self.client.put(self.url, payload, format='json')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(LearningSession.objects.get(user=self.user).responses, [])

    def test_session_data_is_not_shared_between_learners(self):
        self.client.get(self.url)
        another_user = get_user_model().objects.create_user(
            username='another',
            email='another@example.test',
            password='test-password',
        )
        other_client = APIClient()
        other_client.force_authenticate(another_user)

        response = other_client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(LearningSession.objects.count(), 2)
        self.assertEqual(response.data['responses'], [])
