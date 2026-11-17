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
        if not isinstance(node.get('conceptId'), str) or not node['conceptId']:
            raise ValueError(f"Node {node['id']} needs a conceptId.")
        question = node.get('question')
        choices = question.get('choices') if isinstance(question, dict) else None
        if not isinstance(choices, list) or not choices:
            raise ValueError(f"Node {node['id']} needs at least one question choice.")

        choice_ids = [choice.get('id') for choice in choices if isinstance(choice, dict)]
        if (
            len(choice_ids) != len(choices)
            or any(not isinstance(choice_id, str) or not choice_id for choice_id in choice_ids)
            or len(set(choice_ids)) != len(choice_ids)
        ):
            raise ValueError(f"Node {node['id']} has invalid or duplicate choice ids.")

        outcomes = node.get('outcomes')
        if not isinstance(outcomes, dict) or set(outcomes) != set(choice_ids):
            raise ValueError(f"Node {node['id']} must define one outcome per choice.")
        for choice_id, outcome in outcomes.items():
            if not isinstance(outcome, dict):
                raise ValueError(f"Outcome {choice_id} in node {node['id']} must be an object.")
            if outcome.get('conceptStatus') not in {'understood', 'needs_review'}:
                raise ValueError(f"Outcome {choice_id} in node {node['id']} has an invalid conceptStatus.")
            next_node_id = outcome.get('nextNodeId')
            if next_node_id is not None and next_node_id not in node_ids:
                raise ValueError(f"Outcome {choice_id} in node {node['id']} points to an unknown node.")
            misconception_id = outcome.get('misconceptionId')
            if misconception_id:
                if not isinstance(misconception_id, str):
                    raise ValueError(f"Outcome {choice_id} in node {node['id']} has an invalid misconceptionId.")
                misconception_ids.add(misconception_id)

    return flow
