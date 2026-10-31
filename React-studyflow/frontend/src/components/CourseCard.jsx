import { useNavigate } from 'react-router-dom'
import { BookOpen, Sparkles, ArrowRight } from '../components/ui/Icons'

const disciplineColors = {
  'Computer Science': '#8b5cf6',
  'Mathematics': '#06b6d4',
  'Entrepreneurship': '#ec4899',
  'Practicum': '#f59e0b',
  'Physics': '#a855f7',
  'Chemistry': '#10b981',
}

export function CourseCard({ course, index = 0 }) {
  const navigate = useNavigate()
  const topicCount = course.topic_count || course.topics?.length || 0
  const discColor = disciplineColors[course.discipline?.name] || '#06b6d4'
  const courseIdentifier = course.code || course.id

  const handleCardClick = () => {
    navigate(`/courses/${courseIdentifier}`)
  }

  const handleAskAIClick = (e) => {
    e.stopPropagation()
    navigate(`/chat?prompt=${encodeURIComponent(`I am studying ${course.code}: ${course.title}. Can you explain the key concepts and quiz me?`)}`)
  }

  return (
    <div
      onClick={handleCardClick}
      className="relative p-5 sm:p-6 rounded-2xl bg-slate-900/75 border border-white/10 hover:border-cyan-500/40 backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 flex flex-col justify-between group cursor-pointer overflow-hidden"
      role="article"
      aria-label={`${course.code}: ${course.title}`}
    >
      {/* Top Discipline Accent Bar */}
      <div
        className="absolute top-0 left-6 right-6 h-0.5 rounded-b-full transition-all duration-300 group-hover:left-4 group-hover:right-4 group-hover:h-1"
        style={{ backgroundColor: discColor }}
      />

      <div className="space-y-3">
        {/* Top Header: Code & Discipline Pill */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <h3 className="font-extrabold text-xl text-white group-hover:text-cyan-300 transition-colors tracking-tight">
            {course.code}
          </h3>
          {course.discipline && (
            <span
              className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border"
              style={{
                backgroundColor: `${discColor}15`,
                color: discColor,
                borderColor: `${discColor}30`,
              }}
            >
              {course.discipline.name}
            </span>
          )}
        </div>

        {/* Title & Description */}
        <div className="space-y-1">
          <h4 className="font-bold text-sm text-slate-100 group-hover:text-white transition-colors leading-snug">
            {course.title}
          </h4>
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {course.description || 'Master key principles, structured reading notes, and guided university exam exercises.'}
          </p>
        </div>

        {/* Quick Topic Preview (if topics available) */}
        {Array.isArray(course.topics) && course.topics.length > 0 && (
          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/5 space-y-1.5 my-2">
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              Key Topics
            </div>
            {course.topics.slice(0, 3).map((t) => (
              <div
                key={t.id || t.topic_id}
                onClick={(e) => {
                  e.stopPropagation()
                  navigate(`/courses/${courseIdentifier}/topics/${t.topic_id || t.id}`)
                }}
                className="flex items-center justify-between text-xs text-slate-300 hover:text-cyan-300 py-1 px-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <span className="truncate max-w-[220px]">{t.title}</span>
                <span className="text-cyan-400 text-xs font-bold">→</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="flex items-center justify-between pt-4 mt-3 border-t border-white/5 text-xs">
        <span className="flex items-center gap-1.5 text-slate-400 font-medium">
          <BookOpen size={14} className="text-cyan-400" />
          <span>{topicCount} topics</span>
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAskAIClick}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-all cursor-pointer"
            title={`Launch AI Tutor for ${course.code}`}
          >
            <Sparkles size={12} className="text-cyan-400" />
            <span>Ask AI</span>
          </button>

          <span className="inline-flex items-center gap-1 font-semibold text-slate-400 group-hover:text-cyan-400 transition-colors">
            <span>Explore</span>
            <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </div>
  )
}
export default CourseCard