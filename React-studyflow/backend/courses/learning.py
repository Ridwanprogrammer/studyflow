def validate_session_flow(flow):
    """Validate the authored graph before it is imported or used for a session."""
    if not isinstance(flow, dict) or flow.get('version') != 1:
        raise ValueError('Learning flow must declare version 1.')

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
        question = node.get('question')
        choices = question.get('choices') if isinstance(question, dict) else None
        if (
            not isinstance(question, dict)
            or not isinstance(question.get('prompt'), str)
            or not question['prompt'].strip()
            or not isinstance(choices, list)
            or not choices
        ):
            raise ValueError(f"Node {node['id']} needs at least one question choice.")

        choice_ids = [choice.get('id') for choice in choices if isinstance(choice, dict)]
        if (
            len(choice_ids) != len(choices)
            or any(not isinstance(choice_id, str) or not choice_id for choice_id in choice_ids)
            or len(set(choice_ids)) != len(choice_ids)
            or any(not isinstance(choice.get('text'), str) or not choice['text'].strip() for choice in choices)
        ):
            raise ValueError(f"Node {node['id']} has invalid or duplicate choice ids.")

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


def validate_session_state(flow, values):
    """Ensure saved progress can be reached by following authored answers."""
    nodes = {node['id']: node for node in flow['nodes']}
    current_node_id = flow['startNodeId']
    concept_states = {}
    misconceptions = []
    completed = False
    pending_choice_id = values['pending_choice_id']

    for index, response in enumerate(values['responses']):
        if completed or response.get('nodeId') != current_node_id:
            raise ValueError('Recorded answers do not follow the lesson path.')

        node = nodes[current_node_id]
        choice_id = response.get('choiceId')
        outcome = node['outcomes'].get(choice_id)
        if not outcome:
            raise ValueError('A recorded answer does not match this lesson step.')
        if response.get('misconceptionId') != outcome.get('misconceptionId'):
            raise ValueError('A recorded misconception does not match the selected answer.')

        concept_states[node['conceptId']] = outcome['conceptStatus']
        misconception_id = outcome.get('misconceptionId')
        if misconception_id and misconception_id not in misconceptions:
            misconceptions.append(misconception_id)

        is_last_response = index == len(values['responses']) - 1
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

    if pending_choice_id and not values['responses']:
        raise ValueError('An answer must be recorded before feedback is pending.')

    if values['current_node_id'] != current_node_id:
        raise ValueError('The current lesson step does not match the recorded answers.')
    if values['concept_states'] != concept_states:
        raise ValueError('Concept status does not match the recorded answers.')
    if values['misconceptions'] != misconceptions:
        raise ValueError('Misconceptions do not match the recorded answers.')
    if values['is_completed'] != (completed and not pending_choice_id):
        raise ValueError('Completion status does not match the recorded answers.')

    return values
