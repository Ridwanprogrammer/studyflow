import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../stores/authStore'
import { Menu, Search, Sparkles, Bell, ChevronRight, LogOut, User } from '../ui/Icons'
import { Tooltip } from '../ui/Tooltip'
import { useState, useRef, useEffect, useMemo } from 'react'

function pageMeta(pathname) {
  if (pathname === '/') {
    return { title: 'Welcome Back!', subtitle: 'FUGUS · 200 Level · Second Semester' }
  }
  if (pathname === '/courses') {
    return { title: 'Enrolled Courses', subtitle: 'B.Sc Computer Science · Course Catalog & Notes' }
  }
  if (pathname.startsWith('/courses/')) {
    return { title: 'Course Workspace', subtitle: 'Read interactive notes, revise concepts, and practice problems.' }
  }
  if (pathname === '/glossary') {
    return { title: 'Global Glossary', subtitle: 'Every key concept and formula across all courses in one place.' }
  }
  if (pathname === '/chat') {
    return { title: 'AI Tutor Studio', subtitle: 'Ask questions, request exam quizzes, and get step-by-step guidance.' }
  }
  if (pathname === '/calendar') {
    return { title: 'Semester Calendar', subtitle: 'Key dates, assessments & deadlines' }
  }
  return { title: 'StudyFlow', subtitle: 'Your adaptive university learning workspace.' }
}

// Shared semester events - single source of truth
function getSemesterEvents() {
  return [
    { date: new Date(2026, 7, 16), title: 'Resumption Date', type: 'milestone' },
    { date: new Date(2026, 7, 17), title: 'Registration Begins', type: 'milestone' },
    { date: new Date(2026, 7, 29), title: 'Registration Ends', type: 'milestone' },
    { date: new Date(2026, 7, 31), title: 'Lectures Begin', type: 'milestone' },
    { date: new Date(2026, 11, 7), title: 'CA Results Submission Starts', type: 'test' },
    { date: new Date(2026, 11, 11), title: 'CA Results Submission Ends', type: 'test' },
    { date: new Date(2026, 11, 12), title: 'Lectures End', type: 'milestone' },
    { date: new Date(2026, 11, 14), title: 'Examinations Begin', type: 'exam' },
    { date: new Date(2027, 0, 9), title: 'Examinations End', type: 'exam' },
    { date: new Date(2027, 0, 11), title: 'First Semester Break Begins', type: 'holiday' },
    { date: new Date(2027, 0, 24), title: 'First Semester Break Ends', type: 'holiday' },
  ]
}

function getUpcomingEvents() {
  const now = new Date()
  const events = getSemesterEvents()
  return events
    .filter(e => e.date > now)
    .sort((a, b) => a.date - b.date)
    .slice(0, 5)
}

function getEventColors(type) {
  switch (type) {
    case 'exam': return { bg: 'bg-red-500', text: 'text-white', dot: 'bg-red-400', label: 'Exam' }
    case 'test': return { bg: 'bg-amber-500', text: 'text-white', dot: 'bg-amber-400', label: 'Test' }
    case 'milestone': return { bg: 'bg-cyan-500', text: 'text-white', dot: 'bg-cyan-400', label: 'Milestone' }
    case 'holiday': return { bg: 'bg-slate-500', text: 'text-white', dot: 'bg-slate-400', label: 'Holiday' }
    default: return { bg: 'bg-slate-500', text: 'text-white', dot: 'bg-slate-400', label: 'Event' }
  }
}

// Notification content component to avoid parser issues with ternary
function NotificationContent({ upcomingEvents, onClose }) {
  if (upcomingEvents.length === 0) {
    return <p className="text-slate-400 text-center py-4">No upcoming events</p>
  }
  return (
    <>
      {upcomingEvents.map((event) => {
        const colors = getEventColors(event.type)
        const diff = event.date - new Date()
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
        return (
          <button
            key={event.title}
            className="w-full p-3 flex items-center gap-3 text-left hover:bg-white/5 transition-colors rounded-xl"
            onClick={onClose}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colors.bg} ${colors.text} flex-shrink-0`}>
              <span className="text-lg">{days}d</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-white">{event.title}</p>
              <p className="text-xs text-slate-400">
                {event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                &bull; in {days} day{days !== 1 ? 's' : ''}
              </p>
            </div>
            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${colors.bg} ${colors.text}`}>
              {colors.label}
            </span>
          </button>
        )
      })}
    </>
  )
}

export function TopBar({ onMenuClick, onSearchClick, pathname }) {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const meta = pageMeta(pathname)
  const initials = (user?.full_name || user?.username || 'Student').charAt(0).toUpperCase()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const notificationRef = useRef(null)
  const profileMenuRef = useRef(null)

  // Get upcoming events for notifications
  const upcomingEvents = useMemo(() => getUpcomingEvents(), [])
  const urgentCount = upcomingEvents.filter(e => {
    const diff = e.date - new Date()
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
    return days <= 14
  }).length

  const handleCloseNotifications = () => setShowNotifications(false)
  const handleLogout = async () => {
    await logout()
    setShowProfileMenu(false)
    navigate('/login')
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setShowNotifications(false)
      }

      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setShowProfileMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="sf-top-header">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3.5 min-w-0">
        <button
          type="button"
          className="top-sidebar-btn p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 lg:hidden transition-colors cursor-pointer"
          onClick={onMenuClick}
          aria-label="Toggle navigation drawer"
        >
          <Menu size={20} />
        </button>

        <div className="min-w-0">
          <h1 className="sf-greeting-title">{meta.title}</h1>
          <p className="sf-greeting-subtitle hidden sm:block">{meta.subtitle}</p>
        </div>
      </div>

      {/* Right: Actions - CONSISTENT across all pages */}
      <div className="sf-header-actions">
        {/* Quick Search Button */}
        <Tooltip content="Quick Search (Ctrl+K)" position="bottom">
          <button
            type="button"
            className="sf-search-cmd-btn sf-cmd-trigger"
            id="global-search-btn"
            title="Quick Search (Ctrl + K)"
            aria-label="Quick Search"
          >
            <Search size={15} className="text-cyan-400" />
            <span className="hidden md:inline text-slate-400 text-xs">Search notes & terms...</span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-bold text-slate-400 bg-white/5 border border-white/10 rounded-md">
              Ctrl+K
            </kbd>
          </button>
        </Tooltip>

        {/* Notification Bell with Upcoming Events */}
        <div className="relative">
          <Tooltip content={`Notifications${upcomingEvents.length > 0 ? ` (${upcomingEvents.length})` : ''}`} position="bottom">
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className={`top-action-btn relative ${showNotifications ? 'text-cyan-400' : 'text-slate-400'}`}
              id="notification-btn"
              title="Notifications"
              aria-label="Open notifications"
              aria-expanded={showNotifications}
            >
              <Bell size={18} />
              {(upcomingEvents.length > 0 || urgentCount > 0) && (
                <span className="absolute -top-[1px] -right-[2px] w-4 h-4 rounded-full bg-red-500 text-[9px] font-bold flex items-center justify-center border border-slate-950">
                  {upcomingEvents.length > 9 ? '9+' : upcomingEvents.length}
                </span>
              )}
            </button>
          </Tooltip>

          {/* Notification Popover with Upcoming Events */}
          {showNotifications && (
            <div
              className="fixed top-16 right-0 z-50 w-80 bg-slate-950/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-0 animate-fadeIn"
              ref={notificationRef}
              role="dialog"
              aria-label="Notifications"
            >
              <div className="p-3 border-b border-white/10 flex items-center justify-between">
                <h3 className="font-bold text-white">Upcoming Events</h3>
                <button onClick={handleCloseNotifications} className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/5"><ChevronRight size={16} className="rotate-90" /></button>
              </div>
              <div className="max-h-[400px] overflow-y-auto p-2">
                <NotificationContent upcomingEvents={upcomingEvents} onClose={handleCloseNotifications} />
              </div>
              <div className="p-3 border-t border-white/10">
                <NavLink to="/calendar" className="sf-view-all-link text-sm gap-1 justify-center" onClick={handleCloseNotifications}>
                  <span>View Full Calendar</span>
                  <ChevronRight size={14} />
                </NavLink>
              </div>
            </div>
          )}
        </div>

        {/* Ask AI Tutor Button - visible on ALL pages except chat */}
        {pathname !== '/chat' && (
          <NavLink
            to="/chat"
            className="sf-header-ai-btn"
            title="Open AI Tutor Chat"
          >
            <span className="sf-sparkle">✦</span>
            <span>Ask AI Tutor</span>
          </NavLink>
        )}

        {/* User Profile Avatar */}
        <div className="relative" ref={profileMenuRef}>
          <Tooltip content={`${user?.full_name || user?.username || 'Student'} · FUGUS 200L`} position="bottom">
            <button
              type="button"
              onClick={() => setShowProfileMenu((value) => !value)}
              className="sf-user-avatar cursor-pointer hover:scale-[1.02] transition-transform"
              aria-label="Open account menu"
              aria-expanded={showProfileMenu}
            >
              {initials}
            </button>
          </Tooltip>

          {showProfileMenu && (
            <div className="absolute right-0 top-full mt-3 w-56 rounded-2xl border border-white/10 bg-slate-950/95 p-2 shadow-2xl backdrop-blur-xl z-50">
              <div className="px-3 py-2 border-b border-white/10 mb-2">
                <p className="text-sm font-semibold text-white">{user?.full_name || user?.username || 'Student'}</p>
                <p className="text-xs text-slate-400">{user?.email || 'student@studyflow.app'}</p>
              </div>

              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-200 hover:bg-white/5 transition-colors"
              >
                <User size={16} className="text-cyan-400" />
                View profile
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-rose-300 hover:bg-rose-500/10 transition-colors"
              >
                <LogOut size={16} />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default TopBar