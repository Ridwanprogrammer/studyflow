import { NavLink } from 'react-router-dom'

export function TopicModeNav({ courseId, topicId, mode }) {
  return (
    <nav className="sf-topic-mode-nav" aria-label="Topic experience">
      <NavLink
        to={`/courses/${courseId}/topics/${topicId}/learn`}
        className={mode === 'learn' ? 'is-active' : ''}
        aria-current={mode === 'learn' ? 'page' : undefined}
      >
        Learn
      </NavLink>
      <NavLink
        to={`/courses/${courseId}/topics/${topicId}/notes`}
        className={mode === 'notes' ? 'is-active' : ''}
        aria-current={mode === 'notes' ? 'page' : undefined}
      >
        Notes
      </NavLink>
    </nav>
  )
}
