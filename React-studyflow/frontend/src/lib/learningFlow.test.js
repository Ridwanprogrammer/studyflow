import assert from 'node:assert/strict'
import test from 'node:test'
import { continueAfterFeedback, getChoiceOutcome, submitChoice } from './learningFlow.js'

const flow = {
  nodes: [
    {
      id: 'first',
      conceptId: 'concept-a',
      question: { choices: [{ id: 'right' }, { id: 'wrong' }] },
      outcomes: {
        right: { conceptStatus: 'understood', nextNodeId: 'last' },
        wrong: {
          conceptStatus: 'needs_review',
          misconceptionId: 'misread-rule',
          nextNodeId: 'first',
        },
      },
    },
    {
      id: 'last',
      conceptId: 'concept-b',
      question: { choices: [{ id: 'finish' }] },
      outcomes: {
        finish: { conceptStatus: 'understood', nextNodeId: null },
      },
    },
  ],
}

const initialSession = {
  current_node_id: 'first',
  responses: [],
  concept_states: {},
  misconceptions: [],
  pending_choice_id: '',
  is_completed: false,
}

test('records a misconception and retries the same step after feedback', () => {
  const submitted = submitChoice(flow, initialSession, 'wrong')
  assert.equal(submitted.concept_states['concept-a'], 'needs_review')
  assert.deepEqual(submitted.misconceptions, ['misread-rule'])

  const retry = continueAfterFeedback(flow, submitted)
  assert.equal(retry.current_node_id, 'first')
  assert.equal(retry.pending_choice_id, '')
  assert.equal(retry.is_completed, false)
})

test('advances after a correct answer and completes only after the final answer', () => {
  const firstAnswer = submitChoice(flow, initialSession, 'right')
  const secondStep = continueAfterFeedback(flow, firstAnswer)
  assert.equal(secondStep.current_node_id, 'last')

  const finalAnswer = submitChoice(flow, secondStep, 'finish')
  const completed = continueAfterFeedback(flow, finalAnswer)
  assert.equal(completed.current_node_id, 'last')
  assert.equal(completed.is_completed, true)
})

test('rejects unknown answer ids instead of advancing with invalid state', () => {
  assert.throws(() => getChoiceOutcome(flow, 'first', 'unknown'), /Unknown answer/)
})
