export function getFlowNode(flow, nodeId) {
  const node = flow?.nodes?.find((candidate) => candidate.id === nodeId)
  if (!node) {
    throw new Error(`Unknown lesson step: ${nodeId}`)
  }
  return node
}

export function getChoiceOutcome(flow, nodeId, choiceId) {
  const node = getFlowNode(flow, nodeId)
  const outcome = node.outcomes?.[choiceId]
  if (!node.question?.choices?.some((choice) => choice.id === choiceId) || !outcome) {
    throw new Error(`Unknown answer "${choiceId}" for lesson step "${nodeId}"`)
  }
  return outcome
}

export function submitChoice(flow, session, choiceId) {
  const node = getFlowNode(flow, session.current_node_id)
  const outcome = getChoiceOutcome(flow, node.id, choiceId)
  const response = {
    nodeId: node.id,
    choiceId,
    ...(outcome.misconceptionId ? { misconceptionId: outcome.misconceptionId } : {}),
  }

  return {
    ...session,
    responses: [...session.responses, response],
    concept_states: {
      ...session.concept_states,
      [node.conceptId]: outcome.conceptStatus,
    },
    misconceptions: outcome.misconceptionId
      ? [...new Set([...session.misconceptions, outcome.misconceptionId])]
      : session.misconceptions,
    pending_choice_id: choiceId,
    is_completed: false,
  }
}

export function continueAfterFeedback(flow, session) {
  if (!session.pending_choice_id) {
    throw new Error('Choose an answer before continuing.')
  }

  const node = getFlowNode(flow, session.current_node_id)
  const outcome = getChoiceOutcome(flow, node.id, session.pending_choice_id)
  const isCompleted = outcome.nextNodeId === null

  return {
    ...session,
    current_node_id: isCompleted ? node.id : outcome.nextNodeId,
    pending_choice_id: '',
    is_completed: isCompleted,
  }
}
