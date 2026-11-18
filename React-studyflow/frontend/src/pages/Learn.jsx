import { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { MarkdownRenderer } from '../components/MarkdownRenderer'
import { TopicPageLink } from '../components/TopicPageLink'
import { ChevronLeft, BookOpen, CheckCircle2, Loader2, RefreshCw } from '../components/ui/Icons'
import { continueAfterFeedback, getFlowNode, submitAnswer } from '../lib/learningFlow'

function sessionPayload(session) {
  return {
    current_node_id: session.current_node_id,
    responses: session.responses,
    concept_states: session.concept_states,
    misconceptions: session.misconceptions,
    pending_choice_id: session.pending_choice_id,
    is_completed: session.is_completed,
  }
}

export function Learn() {
  const { courseId, topicId } = useParams()
  const queryClient = useQueryClient()
  const [selectedChoice, setSelectedChoice] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const sessionKey = ['learning-session', topicId]
  const sessionUrl = `/courses/learning-sessions/topic/${topicId}/`

  const {
    data: topic,
    isLoading: isTopicLoading,
    error: topicError,
  } = useQuery({
    queryKey: ['topic', courseId, topicId],
    queryFn: async () => {
      const response = await api.get(`/courses/topics/${topicId}/`)
      return response.data
    },
    enabled: Boolean(courseId && topicId),
  })

  const flow = topic?.learning_guide?.sessionFlow
  const {
    data: session,
    isLoading: isSessionLoading,
    error: sessionError,
    refetch: refetchSession,
  } = useQuery({
    queryKey: sessionKey,
    queryFn: async () => {
      const response = await api.get(sessionUrl)
      return response.data
    },
    enabled: Boolean(flow),
  })

  const persistSession = async (nextSession) => {
    setIsSaving(true)
    setSaveError('')
    try {
      const response = await api.put(sessionUrl, sessionPayload(nextSession))
      queryClient.setQueryData(sessionKey, response.data)
      setSelectedChoice('')
    } catch {
      setSaveError('Your answer could not be saved. Check your connection and try again.')
    } finally {
      setIsSaving(false)
    }
  }

  if (isTopicLoading) {
    return <div className="sf-learn-state" role="status">Loading this lesson…</div>
  }

  if (topicError || !topic) {
    return (
      <div className="sf-learn-state sf-learn-state--error" role="alert">
        <h1>Lesson unavailable</h1>
        <p>We could not load this topic. Return to the course and try again.</p>
        <NavLink to={`/courses/${courseId}`} className="sf-learn-back">
          <ChevronLeft size={16} /> Back to course
        </NavLink>
      </div>
    )
  }

  const course = topic.course

  return (
    <div className="sf-learn-page">
      <header className="sf-learn-header">
        <NavLink to={`/courses/${courseId}`} className="sf-learn-back">
          <ChevronLeft size={16} />
          <span>{course?.code || 'Course'}</span>
        </NavLink>
        <h1>{topic.title}</h1>
        <p>A guided session that responds to your answers.</p>
        {flow && (
          <TopicPageLink
            courseId={courseId}
            topicId={topicId}
            page="learn"
            className="sf-learn-secondary-button"
          />
        )}
      </header>

      {!flow ? (
        <section className="sf-learn-state">
          <h2>This guided session is not ready yet</h2>
          <p>For now, use the structured notes for this topic. The MTH201 guided sessions are being added first.</p>
          <NavLink to={`/courses/${courseId}/topics/${topicId}/notes`} className="sf-learn-primary-link">
            <BookOpen size={16} /> Open Notes
          </NavLink>
        </section>
      ) : isSessionLoading ? (
        <div className="sf-learn-state" role="status">
          <Loader2 className="animate-spin" size={20} /> Restoring your session…
        </div>
      ) : sessionError || !session ? (
        <div className="sf-learn-state sf-learn-state--error" role="alert">
          <h2>Your session could not be restored</h2>
          <p>We could not load your saved position. Your existing answers have not been replaced.</p>
          <button type="button" className="sf-learn-secondary-button" onClick={() => refetchSession()}>
            Try again
          </button>
        </div>
      ) : (
        <LearningConversation
          flow={flow}
          session={session}
          isSaving={isSaving}
          selectedChoice={selectedChoice}
          setSelectedChoice={setSelectedChoice}
          saveError={saveError}
          onSubmit={(response) => persistSession(submitAnswer(flow, session, response))}
          onContinue={() => persistSession(continueAfterFeedback(flow, session))}
          onRestart={() => persistSession({
            current_node_id: flow.startNodeId,
            responses: [],
            concept_states: {},
            misconceptions: [],
            pending_choice_id: '',
            is_completed: false,
          })}
        />
      )}
    </div>
  )
}

function LearningConversation({
  flow,
  session,
  isSaving,
  selectedChoice,
  setSelectedChoice,
  saveError,
  onSubmit,
  onContinue,
  onRestart,
}) {
  const node = getFlowNode(flow, session.current_node_id)
  const activeChoice = node.question.choices?.find((choice) => choice.id === session.pending_choice_id)
  const outcome = session.pending_choice_id ? node.outcomes[session.pending_choice_id] : null
  const activeResponse = session.pending_choice_id
    ? session.responses[session.responses.length - 1]
    : null

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!selectedChoice || isSaving) return
    onSubmit(node.question.answerType === 'numeric'
      ? { answer: selectedChoice }
      : { choiceId: selectedChoice })
  }

  return (
    <section className="sf-learn-session" aria-label="Guided learning session">
      <div className="sf-learn-thread" aria-live="polite">
        <article className="sf-learn-turn sf-learn-turn--tutor">
          <span className="sf-learn-turn__speaker">StudyFlow lesson</span>
          <h2>{session.is_completed ? 'You have finished this session' : node.title}</h2>
          {session.is_completed ? (
            <p>You worked through the key ideas in this guided session. You can revisit the notes or run through the lesson again.</p>
          ) : (
            <>
              <MarkdownRenderer content={node.explanation} className="sf-learn-markdown" />
              {node.sections?.length > 0 && (
                <div className="sf-learn-sections">
                  {node.sections.map((section, index) => (
                    <section
                      className={`sf-learn-section sf-learn-section--${section.kind}`}
                      key={`${section.kind}-${index}`}
                    >
                      <h3>{section.title}</h3>
                      <MarkdownRenderer content={section.content} className="sf-learn-markdown" />
                    </section>
                  ))}
                </div>
              )}
              {node.visual && <LearningVisual visual={node.visual} />}
              <div className="sf-learn-example">
                <span>{node.exampleTitle || 'Let’s work through an example'}</span>
                <MarkdownRenderer content={node.example} className="sf-learn-markdown" />
              </div>
            </>
          )}
        </article>

        {!session.is_completed && (
          <article className="sf-learn-turn sf-learn-turn--tutor sf-learn-question">
            <span className="sf-learn-turn__speaker">Your turn</span>
            <div className="sf-learn-question__prompt" role="heading" aria-level="3">
              <MarkdownRenderer content={node.question.prompt} className="sf-learn-markdown" />
            </div>
            {session.pending_choice_id && activeChoice && (
              <div className="sf-learn-turn sf-learn-turn--learner">
                <span className="sf-learn-turn__speaker">You</span>
                <p>{activeChoice.text}</p>
              </div>
            )}
            {session.pending_choice_id && !activeChoice && activeResponse && (
              <div className="sf-learn-turn sf-learn-turn--learner">
                <span className="sf-learn-turn__speaker">You</span>
                <p>{activeResponse.answer}</p>
              </div>
            )}

            {outcome ? (
              <div className={`sf-learn-feedback ${outcome.conceptStatus === 'understood' ? 'is-correct' : 'needs-review'}`}>
                <MarkdownRenderer content={outcome.feedback} className="sf-learn-markdown" />
                {outcome.remediation && (
                  <div className="sf-learn-remediation">
                    <span>Let’s rebuild the idea</span>
                    <MarkdownRenderer content={outcome.remediation} className="sf-learn-markdown" />
                  </div>
                )}
                {outcome.conceptStatus === 'needs_review' && (
                  <p className="sf-learn-feedback__hint">Take another look, then try the question again.</p>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="sf-learn-answer-form">
                <fieldset disabled={isSaving}>
                  {node.question.answerType === 'numeric' ? (
                    <>
                      <legend className="sr-only">Enter a numerical answer</legend>
                      <label className="sf-learn-numeric">
                        <span>Your answer</span>
                        <input
                          type="number"
                          inputMode="decimal"
                          step="any"
                          value={selectedChoice}
                          onChange={(event) => setSelectedChoice(event.target.value)}
                          aria-label="Your numerical answer"
                        />
                      </label>
                    </>
                  ) : (
                    <>
                      <legend className="sr-only">Choose the reasoning that best answers the question</legend>
                      {node.question.choices.map((choice) => (
                        <label className="sf-learn-choice" key={choice.id}>
                          <input
                            type="radio"
                            name={`answer-${node.id}`}
                            value={choice.id}
                            checked={selectedChoice === choice.id}
                            onChange={() => setSelectedChoice(choice.id)}
                          />
                          <span><MarkdownRenderer content={choice.text} className="sf-learn-markdown" /></span>
                        </label>
                      ))}
                    </>
                  )}
                </fieldset>
                <button type="submit" className="sf-learn-primary-link" disabled={!selectedChoice || isSaving}>
                  {isSaving ? 'Saving…' : node.question.answerType === 'numeric' ? 'Check my answer' : 'Check my reasoning'}
                </button>
              </form>
            )}
          </article>
        )}

        {saveError && <p className="sf-learn-error" role="alert">{saveError}</p>}

        {outcome && (
          <button type="button" className="sf-learn-primary-link" onClick={onContinue} disabled={isSaving}>
            {isSaving
              ? 'Saving…'
              : outcome.nextNodeId === node.id
                ? 'Try again'
                : session.is_completed
                  ? 'Review this lesson'
                  : outcome.nextNodeId === null
                    ? 'Finish session'
                    : 'Continue'}
          </button>
        )}

        {session.is_completed && (
          <button type="button" className="sf-learn-secondary-button" onClick={onRestart} disabled={isSaving}>
            <RefreshCw size={15} /> Start again
          </button>
        )}

        {session.is_completed && (
          <p className="sf-learn-complete">
            <CheckCircle2 size={17} /> Session complete
          </p>
        )}
      </div>
    </section>
  )
}

function LearningVisual({ visual }) {
  return (
    <figure className={`sf-learn-visual sf-learn-visual--${visual.kind}`}>
      <figcaption>{visual.title}</figcaption>
      <div className="sf-learn-visual__items">
        {visual.items.map((item, index) => (
          <div className="sf-learn-visual__item" key={`${item.label}-${index}`}>
            <span>{item.label}</span>
            <MarkdownRenderer content={item.content} className="sf-learn-markdown" />
          </div>
        ))}
      </div>
    </figure>
  )
}

export default Learn
