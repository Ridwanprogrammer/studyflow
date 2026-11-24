import { useParams, NavLink } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { 
  ChevronLeft, Sparkles, BookOpen, Clock, 
  CheckCircle2, ArrowRight 
} from '../components/ui/Icons'

export function CourseDetail() {
  const { courseId } = useParams()

  const { data: course, isLoading, error } = useQuery({
    queryKey: ['course', courseId],
    queryFn: async () => {
      const response = await api.get(`/courses/${courseId}/`)
      return response.data
    },
    enabled: !!courseId,
  })

  const topics = course?.topics || []

  if (isLoading) {
    return (
      <div className="sf-course-detail-loading max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 animate-pulse">
        <div className="h-64 rounded-3xl bg-slate-900/60 border border-white/5" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={`skeleton-topic-${i}`} className="h-20 rounded-2xl bg-slate-900/50 border border-white/5" />
          ))}
        </div>
      </div>
    )
  }

  if (error || !course) {
    return (
      <div className="sf-course-detail-error max-w-md mx-auto p-12 text-center rounded-3xl bg-slate-900/80 border border-white/10 mt-12 space-y-4 shadow-xl">
        <h2 className="text-xl font-bold text-white">Course not found</h2>
        <p className="text-slate-400 text-sm">The course you are looking for does not exist or has been removed.</p>
        <NavLink
          to="/courses"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-sm shadow-md shadow-cyan-500/20"
        >
          <ChevronLeft size={16} aria-hidden="true" />
          <span>Back to Courses</span>
        </NavLink>
      </div>
    )
  }

  const totalTopics = topics.length

  return (
    <div className="sf-course-detail-page max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Course Header Hero Card */}
      <header className="sf-course-detail-hero relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl shadow-2xl space-y-6">
        <div className="sf-course-detail-page__accent" />

        <div className="flex items-center justify-between gap-4">
          <NavLink 
            to="/courses" 
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronLeft size={16} aria-hidden="true" />
            <span>All Courses</span>
          </NavLink>

          {course.discipline && (
            <span className="sf-course-detail-page__discipline">
              <span />
              {course.discipline.name}
            </span>
          )}
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {course.code}: {course.title}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            {course.description || 'Master key principles, structured reading notes, KaTeX formulas, and guided university exam exercises.'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <NavLink 
            to={`/chat?prompt=${encodeURIComponent(`I want to study ${course.code}: ${course.title}. What are the foundational concepts I should begin with?`)}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
          >
            <Sparkles size={15} aria-hidden="true" />
            <span>Launch AI Tutor for {course.code}</span>
          </NavLink>
          
          <NavLink 
            to={`/glossary?discipline=${encodeURIComponent(course.discipline?.slug || '')}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            <BookOpen size={15} aria-hidden="true" />
            <span>View Related Glossary</span>
          </NavLink>
        </div>
      </header>

      {/* Curriculum Topics List */}
      <section className="sf-course-topic-section space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">Curriculum Topics</h2>
            <p className="text-xs text-slate-400">Structured lessons with step-by-step illustrations</p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
            {totalTopics} Interactive Topics
          </span>
        </div>

        <div className="space-y-2.5">
          {topics.map((topic, index) => {
            const isCompleted = topic.user_progress?.is_completed
            return (
              <NavLink
                key={topic.id}
                to={`/courses/${course.code}/topics/${topic.topic_id || topic.id}`}
                className="sf-course-topic-card p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-cyan-400/40 hover:bg-slate-900/90 flex items-center justify-between gap-4 transition-all group shadow-sm hover:shadow-cyan-500/5 cursor-pointer"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className={`sf-course-topic-index w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 transition-colors ${
                      isCompleted
                        ? 'is-complete bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-white/5 text-slate-300 group-hover:bg-cyan-500/20 group-hover:text-cyan-300'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 size={16} /> : <span>{index + 1}</span>}
                  </div>
                  <div className="min-w-0">
                    <h3 className="sf-course-topic-title font-bold text-white text-sm sm:text-base group-hover:text-cyan-300 transition-colors truncate">
                      {topic.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{topic.estimated_read_time || 5} min read</span>
                      </span>
                      {topic.learning_guide?.mentalModel && (
                        <span className="hidden sm:inline-block text-cyan-400/80">
                          · Mental model included
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 text-slate-400 group-hover:text-cyan-400 transition-colors">
                  <span className="text-xs font-semibold hidden sm:inline">Start reading</span>
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </NavLink>
            )
          })}
        </div>

        {topics.length === 0 && (
          <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-white/10 text-slate-400 space-y-2">
            <BookOpen size={40} className="mx-auto text-slate-600 mb-2" />
            <h3 className="font-bold text-white">No topics yet</h3>
            <p className="text-xs">Curriculum topics will appear here once loaded.</p>
          </div>
        )}
      </section>

      {/* Course Metadata Box */}
      <section className="sf-course-metadata p-6 rounded-3xl bg-slate-900/50 border border-white/10 space-y-3">
        <h3 className="font-bold text-white text-sm">Course Metadata</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="sf-course-metadata-item p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
            <span className="text-slate-400 block font-medium">Level</span>
            <span className="text-white font-bold">{course.level || '200L'}</span>
          </div>
          <div className="sf-course-metadata-item p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
            <span className="text-slate-400 block font-medium">Semester</span>
            <span className="text-white font-bold">{course.semester || '2nd Semester'}</span>
          </div>
          <div className="sf-course-metadata-item p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
            <span className="text-slate-400 block font-medium">Credit Units</span>
            <span className="text-white font-bold">{course.credits || 3} Units</span>
          </div>
          <div className="sf-course-metadata-item p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
            <span className="text-slate-400 block font-medium">Institution</span>
            <span className="text-white font-bold">FUGUS</span>
          </div>
        </div>
      </section>
    </div>
  )
}
export default CourseDetail
