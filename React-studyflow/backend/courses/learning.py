import re
from decimal import Decimal, InvalidOperation


_NUMBER_PATTERN = re.compile(r'^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$', re.IGNORECASE)


def _numeric_outcome_id(question, raw_answer):
    if not isinstance(raw_answer, str) or len(raw_answer) > 64:
        raise ValueError('A numeric answer must be a short decimal string.')
    answer_text = raw_answer.strip()
    if not _NUMBER_PATTERN.fullmatch(answer_text):
        raise ValueError('A numeric answer must be a valid decimal number.')
    try:
        answer = Decimal(answer_text)
        expected = Decimal(str(question['numericAnswer']))
        tolerance = Decimal(str(question.get('numericTolerance', '0.000000001')))
    except (InvalidOperation, KeyError, TypeError):
        raise ValueError('The numeric answer rule is invalid.')
    if not answer.is_finite() or not expected.is_finite() or not tolerance.is_finite() or tolerance < 0:
        raise ValueError('The numeric answer rule must use finite values and non-negative tolerance.')
    scale = max(Decimal(1), abs(expected))
    return 'correct' if abs(answer - expected) <= tolerance * scale else 'incorrect'


def validate_session_flow(flow):
    """Validate the authored graph before it is imported or used for a session."""
    if not isinstance(flow, dict) or flow.get('version') not in {1, 2}:
        raise ValueError('Learning flow must declare version 1 or 2.')

    nodes = flow.get('nodes')
    if not isinstance(nodes, list) or not nodes:
        raise ValueError('Learning flow must contain at least one node.')

    node_ids = set()
    for node in nodes:
        if not isinstance(node, dict):
            raise ValueError('Every learning-flow node must be an object.')
        node_id = node.get('id')
        if not isinstance(node_id, str) or not node_id or node_id in node_ids:
            raise ValueError('Learning-flow node ids must be unique non-empty strings.')
        node_ids.add(node_id)

    if flow.get('startNodeId') not in node_ids:
        raise ValueError('Learning-flow startNodeId must identify a node.')

    misconception_ids = set()
    for node in nodes:
        for field in ('title', 'explanation', 'example'):
            if not isinstance(node.get(field), str) or not node[field].strip():
                raise ValueError(f"Node {node['id']} needs non-empty {field} content.")
        if not isinstance(node.get('conceptId'), str) or not node['conceptId']:
            raise ValueError(f"Node {node['id']} needs a conceptId.")
        sections = node.get('sections', [])
        if not isinstance(sections, list):
            raise ValueError(f"Node {node['id']} sections must be a list.")
        for section in sections:
            if (
                not isinstance(section, dict)
                or section.get('kind') not in {'concept', 'formal', 'notation', 'why', 'application'}
                or not isinstance(section.get('title'), str)
                or not section['title'].strip()
                or not isinstance(section.get('content'), str)
                or not section['content'].strip()
            ):
                raise ValueError(f"Node {node['id']} has an invalid teaching section.")

        visual = node.get('visual')
        if visual is not None:
            items = visual.get('items') if isinstance(visual, dict) else None
            if (
                not isinstance(visual, dict)
                or visual.get('kind') not in {'flow', 'comparison'}
                or not isinstance(visual.get('title'), str)
                or not visual['title'].strip()
                or not isinstance(items, list)
                or len(items) < 2
                or any(
                    not isinstance(item, dict)
                    or not isinstance(item.get('label'), str)
                    or not item['label'].strip()
                    or not isinstance(item.get('content'), str)
                    or not item['content'].strip()
                    for item in items
                )
            ):
                raise ValueError(f"Node {node['id']} has an invalid visual.")

        question = node.get('question')
        if (
            not isinstance(question, dict)
            or not isinstance(question.get('prompt'), str)
            or not question['prompt'].strip()
        ):
            raise ValueError(f"Node {node['id']} needs a question prompt.")

        answer_type = question.get('answerType', 'choice')
        if answer_type == 'numeric':
            if not isinstance(question.get('numericAnswer'), (str, int, float)):
                raise ValueError(f"Node {node['id']} needs a numericAnswer.")
            if 'choices' in question:
                raise ValueError(f"Node {node['id']} numeric questions cannot define choice options.")
            choice_ids = ['correct', 'incorrect']
            try:
                _numeric_outcome_id(question, str(question['numericAnswer']))
                _numeric_outcome_id(question, str(question.get('numericAnswer', '')))
                tolerance = Decimal(str(question.get('numericTolerance', '0.000000001')))
                if tolerance < 0:
                    raise ValueError('Numeric tolerance cannot be negative.')
            except (InvalidOperation, TypeError):
                raise ValueError(f"Node {node['id']} has an invalid numeric answer rule.")
        elif answer_type == 'choice':
            choices = question.get('choices')
            if not isinstance(choices, list) or not choices:
                raise ValueError(f"Node {node['id']} needs at least one question choice.")
            choice_ids = [choice.get('id') for choice in choices if isinstance(choice, dict)]
            if (
                len(choice_ids) != len(choices)
                or any(not isinstance(choice_id, str) or not choice_id for choice_id in choice_ids)
                or len(set(choice_ids)) != len(choice_ids)
                or any(not isinstance(choice.get('text'), str) or not choice['text'].strip() for choice in choices)
            ):
                raise ValueError(f"Node {node['id']} has invalid or duplicate choice ids.")
        else:
            raise ValueError(f"Node {node['id']} has an unsupported answer type.")

        outcomes = node.get('outcomes')
        if not isinstance(outcomes, dict) or set(outcomes) != set(choice_ids):
            raise ValueError(f"Node {node['id']} must define one outcome per choice.")
        for choice_id, outcome in outcomes.items():
            if not isinstance(outcome, dict):
                raise ValueError(f"Outcome {choice_id} in node {node['id']} must be an object.")
            if not isinstance(outcome.get('feedback'), str) or not outcome['feedback'].strip():
                raise ValueError(f"Outcome {choice_id} in node {node['id']} needs feedback.")
            if outcome.get('conceptStatus') not in {'understood', 'needs_review'}:
                raise ValueError(f"Outcome {choice_id} in node {node['id']} has an invalid conceptStatus.")
            if 'nextNodeId' not in outcome:
                raise ValueError(f"Outcome {choice_id} in node {node['id']} needs nextNodeId.")
            next_node_id = outcome.get('nextNodeId')
            if next_node_id is not None and next_node_id not in node_ids:
                raise ValueError(f"Outcome {choice_id} in node {node['id']} points to an unknown node.")
            misconception_id = outcome.get('misconceptionId')
            if misconception_id:
                if not isinstance(misconception_id, str):
                    raise ValueError(f"Outcome {choice_id} in node {node['id']} has an invalid misconceptionId.")
                misconception_ids.add(misconception_id)

    return flow


def replay_session_state(flow, responses, pending_choice_id=''):
    """Derive the only valid position and learner state from authored answers."""
    nodes = {node['id']: node for node in flow['nodes']}
    current_node_id = flow['startNodeId']
    concept_states = {}
    misconceptions = []
    completed = False

    for index, response in enumerate(responses):
        if completed or response.get('nodeId') != current_node_id:
            raise ValueError('Recorded answers do not follow the lesson path.')

        node = nodes[current_node_id]
        choice_id = response.get('choiceId')
        question = node['question']
        if question.get('answerType') == 'numeric':
            expected_choice_id = _numeric_outcome_id(question, response.get('answer'))
            if choice_id != expected_choice_id:
                raise ValueError('A recorded numeric answer does not match its outcome.')
        elif 'answer' in response:
            raise ValueError('A choice response cannot contain a numeric answer.')
        outcome = node['outcomes'].get(choice_id)
        if not outcome:
            raise ValueError('A recorded answer does not match this lesson step.')
        if response.get('misconceptionId') != outcome.get('misconceptionId'):
            raise ValueError('A recorded misconception does not match the selected answer.')

        concept_states[node['conceptId']] = outcome['conceptStatus']
        misconception_id = outcome.get('misconceptionId')
        if misconception_id and misconception_id not in misconceptions:
            misconceptions.append(misconception_id)

        is_last_response = index == len(responses) - 1
        if is_last_response and pending_choice_id:
            if pending_choice_id != choice_id:
                raise ValueError('Pending feedback does not match the current lesson step.')
            current_node_id = node['id']
        else:
            next_node_id = outcome['nextNodeId']
            if next_node_id is None:
                completed = True
                current_node_id = node['id']
            else:
                current_node_id = next_node_id

    if pending_choice_id and not responses:
        raise ValueError('An answer must be recorded before feedback is pending.')

    return {
        'current_node_id': current_node_id,
        'responses': responses,
        'concept_states': concept_states,
        'misconceptions': misconceptions,
        'pending_choice_id': pending_choice_id,
        'is_completed': completed and not pending_choice_id,
    }


def validate_session_state(flow, values):
    """Ensure saved progress can be reached by following authored answers."""
    derived = replay_session_state(flow, values['responses'], values['pending_choice_id'])
    if values['current_node_id'] != derived['current_node_id']:
        raise ValueError('The current lesson step does not match the recorded answers.')
    if values['concept_states'] != derived['concept_states']:
        raise ValueError('Concept status does not match the recorded answers.')
    if values['misconceptions'] != derived['misconceptions']:
        raise ValueError('Misconceptions do not match the recorded answers.')
    if values['is_completed'] != derived['is_completed']:
        raise ValueError('Completion status does not match the recorded answers.')

    return values
