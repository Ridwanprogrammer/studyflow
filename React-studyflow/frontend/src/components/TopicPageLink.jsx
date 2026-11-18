import { NavLink } from 'react-router-dom'

export function TopicPageLink({ courseId, topicId, page, className }) {
  const isLearnPage = page === 'learn'
  const destination = isLearnPage ? 'notes' : 'learn'
  const label = isLearnPage ? 'Open notes' : 'Open Learn session'

  return (
    <NavLink
      to={`/courses/${courseId}/topics/${topicId}/${destination}`}
      className={className}
    >
      {label}
    </NavLink>
  )
}
