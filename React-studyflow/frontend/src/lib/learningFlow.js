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
  const isNumericOutcome = node.question?.answerType === 'numeric'
    && ['correct', 'incorrect'].includes(choiceId)
  const isChoiceOutcome = node.question?.answerType !== 'numeric'
    && node.question?.choices?.some((choice) => choice.id === choiceId)
  if ((!isNumericOutcome && !isChoiceOutcome) || !outcome) {
    throw new Error(`Unknown answer "${choiceId}" for lesson step "${nodeId}"`)
  }
  return outcome
}

function getNumericOutcomeId(question, rawAnswer) {
  const value = Number(rawAnswer)
  const answerText = String(rawAnswer).trim()
  if (
    !/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(answerText)
    || !Number.isFinite(value)
    || answerText.length > 64
  ) {
    throw new Error('Enter a valid number before continuing.')
  }

  const expected = Number(question.numericAnswer)
  const tolerance = Number(question.numericTolerance ?? 1e-9)
  const difference = Math.abs(value - expected)
  return difference <= tolerance * Math.max(1, Math.abs(expected)) ? 'correct' : 'incorrect'
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

export function submitAnswer(flow, session, response) {
  const node = getFlowNode(flow, session.current_node_id)
  if (node.question?.answerType !== 'numeric') {
    return submitChoice(flow, session, response.choiceId)
  }

  const answer = String(response.answer ?? '').trim()
  const choiceId = getNumericOutcomeId(node.question, answer)
  const nextSession = submitChoice(flow, session, choiceId)
  nextSession.responses[nextSession.responses.length - 1].answer = answer
  return nextSession
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
