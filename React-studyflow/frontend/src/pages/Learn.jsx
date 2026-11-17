import { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { MarkdownRenderer } from '../components/MarkdownRenderer'
import { TopicModeNav } from '../components/TopicModeNav'
import { ChevronLeft, BookOpen, CheckCircle2, Loader2, RotateCcw } from '../components/ui/Icons'
import { continueAfterFeedback, getFlowNode, submitChoice } from '../lib/learningFlow'

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
      <TopicModeNav courseId={courseId} topicId={topicId} mode="learn" />
      <header className="sf-learn-header">
        <NavLink to={`/courses/${courseId}`} className="sf-learn-back">
          <ChevronLeft size={16} />
          <span>{course?.code || 'Course'}</span>
        </NavLink>
        <h1>{topic.title}</h1>
        <p>A guided session that responds to your answers. Your progress is saved as you go.</p>
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
          onSubmit={(choiceId) => persistSession(submitChoice(flow, session, choiceId))}
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
  const currentIndex = flow.nodes.findIndex((item) => item.id === node.id)
  const activeChoice = node.question.choices.find((choice) => choice.id === session.pending_choice_id)
  const outcome = activeChoice ? node.outcomes[activeChoice.id] : null
  const understoodCount = Object.values(session.concept_states).filter((value) => value === 'understood').length
  const progressValue = session.is_completed
    ? 100
    : Math.round((Math.max(0, currentIndex) / flow.nodes.length) * 100)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!selectedChoice || isSaving) return
    onSubmit(selectedChoice)
  }

  return (
    <section className="sf-learn-session" aria-label="Guided learning session">
      <div className="sf-learn-progress">
        <div className="sf-learn-progress__labels">
          <span>Step {Math.max(0, currentIndex) + 1} of {flow.nodes.length}</span>
          <span>{understoodCount} concept{understoodCount === 1 ? '' : 's'} understood</span>
        </div>
        <div
          className="sf-learn-progress__track"
          role="progressbar"
          aria-label="Lesson progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progressValue}
        >
          <span style={{ width: `${progressValue}%` }} />
        </div>
      </div>

      <div className="sf-learn-thread" aria-live="polite">
        <article className="sf-learn-turn sf-learn-turn--tutor">
          <span className="sf-learn-turn__speaker">StudyFlow lesson</span>
          <h2>{session.is_completed ? 'You have finished this session' : node.title}</h2>
          {session.is_completed ? (
            <p>You worked through the key ideas in this guided session. You can revisit the notes or run through the lesson again.</p>
          ) : (
            <>
              <MarkdownRenderer content={node.explanation} className="sf-learn-markdown" />
              <div className="sf-learn-example">
                <span>Let’s see it in an example</span>
                <MarkdownRenderer content={node.example} className="sf-learn-markdown" />
              </div>
            </>
          )}
        </article>

        {!session.is_completed && (
          <article className="sf-learn-turn sf-learn-turn--tutor sf-learn-question">
            <span className="sf-learn-turn__speaker">Your turn</span>
            <h3>{node.question.prompt}</h3>
            {session.pending_choice_id && activeChoice && (
              <div className="sf-learn-turn sf-learn-turn--learner">
                <span className="sf-learn-turn__speaker">You</span>
                <p>{activeChoice.text}</p>
              </div>
            )}

            {outcome ? (
              <div className={`sf-learn-feedback ${outcome.conceptStatus === 'understood' ? 'is-correct' : 'needs-review'}`}>
                <MarkdownRenderer content={outcome.feedback} className="sf-learn-markdown" />
                {outcome.conceptStatus === 'needs_review' && (
                  <p className="sf-learn-feedback__hint">Take another look, then try the question again.</p>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="sf-learn-answer-form">
                <fieldset disabled={isSaving}>
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
                </fieldset>
                <button type="submit" className="sf-learn-primary-link" disabled={!selectedChoice || isSaving}>
                  {isSaving ? 'Saving…' : 'Check my reasoning'}
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
            <RotateCcw size={15} /> Start again
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

export default Learn
