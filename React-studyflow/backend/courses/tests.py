from copy import deepcopy
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
                    'title': 'First step',
                    'explanation': 'Explain the first idea.',
                    'example': 'Show the first idea.',
                    'question': {
                        'prompt': 'Choose the answer.',
                        'choices': [
                            {'id': 'correct', 'text': 'Correct answer'},
                            {'id': 'wrong', 'text': 'Wrong answer'},
                        ],
                    },
                    'outcomes': {
                        'correct': {'feedback': 'Correct.', 'conceptStatus': 'understood', 'nextNodeId': 'last'},
                        'wrong': {
                            'feedback': 'Try again.',
                            'conceptStatus': 'needs_review',
                            'misconceptionId': 'two-outputs',
                            'nextNodeId': 'first',
                        },
                    },
                },
                {
                    'id': 'last',
                    'conceptId': 'domain-range',
                    'title': 'Final step',
                    'explanation': 'Explain the final idea.',
                    'example': 'Show the final idea.',
                    'question': {
                        'prompt': 'Choose the final answer.',
                        'choices': [{'id': 'finish', 'text': 'Final answer'}],
                    },
                    'outcomes': {
                        'finish': {
                            'feedback': 'Finished.',
                            'conceptStatus': 'understood',
                            'nextNodeId': None,
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

    def test_api_rejects_skipped_steps_and_tampered_concept_state(self):
        self.client.get(self.url)
        skipped_step = {
            'current_node_id': 'last',
            'responses': [{'nodeId': 'last', 'choiceId': 'finish'}],
            'concept_states': {'domain-range': 'understood'},
            'misconceptions': [],
            'pending_choice_id': '',
            'is_completed': True,
        }

        response = self.client.put(self.url, skipped_step, format='json')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(LearningSession.objects.get(user=self.user).responses, [])

        first_answer = {
            'current_node_id': 'last',
            'responses': [{'nodeId': 'first', 'choiceId': 'correct'}],
            'concept_states': {'function-rule': 'needs_review'},
            'misconceptions': [],
            'pending_choice_id': '',
            'is_completed': False,
        }
        response = self.client.put(self.url, first_answer, format='json')
        self.assertEqual(response.status_code, 400)

    def test_api_saves_feedback_wait_state_then_marks_final_step_complete(self):
        self.client.get(self.url)
        first_response = {
            'current_node_id': 'first',
            'responses': [{'nodeId': 'first', 'choiceId': 'correct'}],
            'concept_states': {'function-rule': 'understood'},
            'misconceptions': [],
            'pending_choice_id': 'correct',
            'is_completed': False,
        }
        response = self.client.put(self.url, first_response, format='json')
        self.assertEqual(response.status_code, 200)

        continued = {
            **first_response,
            'current_node_id': 'last',
            'pending_choice_id': '',
        }
        response = self.client.put(self.url, continued, format='json')
        self.assertEqual(response.status_code, 200)

        final_feedback = {
            'current_node_id': 'last',
            'responses': [
                {'nodeId': 'first', 'choiceId': 'correct'},
                {'nodeId': 'last', 'choiceId': 'finish'},
            ],
            'concept_states': {
                'function-rule': 'understood',
                'domain-range': 'understood',
            },
            'misconceptions': [],
            'pending_choice_id': 'finish',
            'is_completed': False,
        }
        response = self.client.put(self.url, final_feedback, format='json')
        self.assertEqual(response.status_code, 200)

        completed = {**final_feedback, 'pending_choice_id': '', 'is_completed': True}
        response = self.client.put(self.url, completed, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.data['is_completed'])

    def test_numeric_answer_is_replayed_and_must_match_its_outcome(self):
        numeric_flow = deepcopy(self.flow)
        numeric_flow['nodes'][0]['question'] = {
            'answerType': 'numeric',
            'prompt': 'Enter the answer.',
            'numericAnswer': '2.5',
            'numericTolerance': '0.000001',
        }
        numeric_flow['nodes'][0]['outcomes'] = {
            'correct': {
                'feedback': 'Correct.',
                'conceptStatus': 'understood',
                'nextNodeId': 'last',
            },
            'incorrect': {
                'feedback': 'Try again.',
                'conceptStatus': 'needs_review',
                'misconceptionId': 'numeric-mistake',
                'nextNodeId': 'first',
            },
        }
        self.topic.learning_guide = {'sessionFlow': numeric_flow}
        self.topic.save(update_fields=['learning_guide'])
        self.client.get(self.url)

        payload = {
            'current_node_id': 'first',
            'responses': [{'nodeId': 'first', 'choiceId': 'correct', 'answer': '2.5000001'}],
            'concept_states': {'function-rule': 'understood'},
            'misconceptions': [],
            'pending_choice_id': 'correct',
            'is_completed': False,
        }
        response = self.client.put(self.url, payload, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['responses'][0]['answer'], '2.5000001')

        invalid_payload = {
            **payload,
            'responses': [{'nodeId': 'first', 'choiceId': 'incorrect', 'answer': '2.5'}],
            'concept_states': {'function-rule': 'needs_review'},
            'misconceptions': ['numeric-mistake'],
            'pending_choice_id': 'incorrect',
        }
        response = self.client.put(self.url, invalid_payload, format='json')
        self.assertEqual(response.status_code, 400)

        unsafe_payload = {
            **payload,
            'responses': [{'nodeId': 'first', 'choiceId': 'incorrect', 'answer': '2 + .5'}],
        }
        response = self.client.put(self.url, unsafe_payload, format='json')
        self.assertEqual(response.status_code, 400)

    def test_completed_session_advances_when_authored_flow_gains_a_step(self):
        self.client.get(self.url)
        first_answer = {
            'current_node_id': 'last',
            'responses': [{'nodeId': 'first', 'choiceId': 'correct'}],
            'concept_states': {'function-rule': 'understood'},
            'misconceptions': [],
            'pending_choice_id': '',
            'is_completed': False,
        }
        response = self.client.put(self.url, first_answer, format='json')
        self.assertEqual(response.status_code, 200)

        completed = {
            'current_node_id': 'last',
            'responses': [
                {'nodeId': 'first', 'choiceId': 'correct'},
                {'nodeId': 'last', 'choiceId': 'finish'},
            ],
            'concept_states': {
                'function-rule': 'understood',
                'domain-range': 'understood',
            },
            'misconceptions': [],
            'pending_choice_id': '',
            'is_completed': True,
        }
        response = self.client.put(self.url, completed, format='json')
        self.assertEqual(response.status_code, 200)

        expanded_flow = deepcopy(self.flow)
        expanded_flow['nodes'][1]['outcomes']['finish']['nextNodeId'] = 'new-step'
        expanded_flow['nodes'].append({
            'id': 'new-step',
            'conceptId': 'new-concept',
            'title': 'New lesson step',
            'explanation': 'Explain the new step.',
            'example': 'Show the new step.',
            'question': {
                'prompt': 'Choose the answer.',
                'choices': [{'id': 'new-answer', 'text': 'New answer'}],
            },
            'outcomes': {
                'new-answer': {
                    'feedback': 'Correct.',
                    'conceptStatus': 'understood',
                    'nextNodeId': None,
                },
            },
        })
        self.topic.learning_guide = {'sessionFlow': expanded_flow}
        self.topic.save(update_fields=['learning_guide'])

        restored = self.client.get(self.url)
        self.assertEqual(restored.status_code, 200)
        self.assertEqual(restored.data['current_node_id'], 'new-step')
        self.assertFalse(restored.data['is_completed'])
        self.assertEqual(restored.data['responses'], completed['responses'])
