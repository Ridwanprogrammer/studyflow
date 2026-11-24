import { useQuery } from '@tanstack/react-query'
import { api, unwrapList } from '../lib/api'
import { NavLink } from 'react-router-dom'
import { ChevronRight } from '../components/ui/Icons'
import { useState, useEffect, useRef } from 'react'

export function Dashboard() {
  const [lastVisited, setLastVisited] = useState(null)
  const [showCalendarPopover, setShowCalendarPopover] = useState(false)
  const popoverRef = useRef(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('sf_last_visited_topic')
      if (stored) {
        setLastVisited(JSON.parse(stored))
      }
    } catch {
      // Ignore
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setShowCalendarPopover(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const response = await api.get('/courses/')
      return unwrapList(response.data)
    },
  })

  if (isLoading) {
    return (
      <div className="sf-dashboard-grid animate-pulse">
        <div className="sf-primary-column">
          <div className="h-[250px] rounded-[24px] bg-slate-900/60 border border-white/5" />
          <div className="mt-6 space-y-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-24 rounded-xl bg-slate-900/50 border border-white/5" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  const totalTopics = courses.reduce((sum, c) => sum + (c.topic_count || c.topics?.length || 0), 0)

  // Calendar data for popover
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()
  const today = now.getDate()
  const firstDay = new Date(currentYear, currentMonth, 1).getDay()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  const keyDates = {
    15: { label: 'CA1 Start', type: 'exam' },
    22: { label: 'CA1 End', type: 'exam' },
    28: { label: 'Midterm', type: 'exam' },
  }

  return (
    <>
      {/* Calendar Popover */}
      {showCalendarPopover && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowCalendarPopover(false)}
        >
          <div
            ref={popoverRef}
            className="fixed top-20 right-4 z-50 w-72 bg-slate-950/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-4 animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sf-calendar-card">
              <div className="sf-calendar-header">
                <h3 className="sf-cal-month-title">{monthNames[currentMonth]} {currentYear}</h3>
              </div>
              <div className="sf-cal-grid">
                {dayNames.map((d, i) => (
                  <div key={d} className="text-[10px] font-bold text-slate-400 uppercase py-1">{d}</div>
                ))}
                {[...Array(firstDay)].map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {[...Array(daysInMonth)].map((_, i) => {
                  const day = i + 1
                  const isToday = day === today
                  const keyDate = keyDates[day]
                  return (
                    <button
                      key={day}
                      className={`py-2 rounded-lg text-sm font-medium transition-all ${
                        isToday
                          ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-slate-950 font-black shadow-md shadow-cyan-500/30'
                          : keyDate
                          ? 'text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {day}
                    </button>
                  )
                })}
              </div>
              <div className="sf-cal-footer mt-3 pt-3 border-t border-white/5">
                <NavLink
                  to="/calendar"
                  className="sf-view-all-link text-sm gap-1"
                  onClick={() => setShowCalendarPopover(false)}
                >
                  <span>Full Calendar</span>
                  <ChevronRight size={14} />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="sf-dashboard-grid">
        <div className="sf-primary-column">
          {/* ─── Hero Banner Card ───────────────────────────────────────── */}
          <section className="sf-dashboard-intro" aria-labelledby="dashboard-title">
            <div className="sf-dashboard-intro-copy">
              <p className="sf-eyebrow">Federal University, Gusau · 200 Level</p>
              <h2 id="dashboard-title">Make room for progress.</h2>
              <p>
                Choose a course to continue, explore interactive notes, or ask
                your AI tutor to work through a tricky problem with you.
              </p>
              {/* Resume Learning Quick Banner - compact */}
              {lastVisited && (
                <div className="sf-resume-banner flex items-center gap-2 p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-200 text-xs sm:text-sm shadow-inner" style={{ margin: '1rem 0' }}>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse flex-shrink-0" />
                  <span className="font-medium text-white truncate max-w-[300px]">
                    {lastVisited.topicTitle}
                  </span>
                  <span className="text-slate-500 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-white/5">
                    {lastVisited.courseCode}
                  </span>
                  <NavLink
                    to={`/courses/${lastVisited.courseCode}/topics/${lastVisited.topicId}`}
                    className="ml-auto flex-shrink-0 text-xs font-bold text-cyan-300 hover:text-white transition-colors whitespace-nowrap"
                  >
                    Continue
                  </NavLink>
                </div>
              )}
              <a className="sf-intro-link" href="/chat">
                Start an AI study session <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className="sf-dashboard-stats" aria-label="Study library overview">
              <div className="sf-dashboard-stat">
                <strong className="text-2xl font-black text-cyan-400">{courses.length}</strong>
                <span>Enrolled Courses</span>
              </div>
              <div className="sf-dashboard-stat">
                <strong className="text-2xl font-black text-blue-400">{totalTopics}</strong>
                <span>Interactive Topics</span>
              </div>
            </div>
          </section>

          {/* ─── Courses Hub Showcase (Vanilla Style) ────────────────────── */}
          <section className="sf-all-courses-wrap">
            <div className="sf-section-header">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold tracking-widest uppercase mb-2 sf-eyebrow">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span>ACADEMIC CURRICULUM</span>
                </span>
                <h2 className="sf-section-title">Enrolled Courses ({courses.length})</h2>
              </div>
              <NavLink
                to="/courses"
                className="sf-view-all-link"
              >
                <span>View all</span>
                <ChevronRight size={14} />
              </NavLink>
            </div>

            {/* Quick enrolled courses preview pills - ALL 6 courses like vanilla */}
            <div className="sf-dashboard-course-list">
              {courses.length > 0 ? (
                courses.map((course) => (
                  <NavLink
                    key={course.id}
                    to={`/courses/${course.code}`}
                    className="sf-dashboard-course-link"
                  >
                    <span className="font-black" style={{ color: course.discipline?.color || '#06b6d4' }}>
                      {course.code}
                    </span>
                    <span className="sf-dashboard-course-discipline">{course.discipline?.name || 'Course'}</span>
                  </NavLink>
                ))
              ) : (
                <div className="sf-dashboard-courses-empty">
                  No enrolled courses yet. <NavLink to="/courses">Browse catalog</NavLink>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
export default Dashboard