import { NavLink } from 'react-router-dom'
import { useAuth } from '../../stores/authStore'
import { Menu, Search, Sparkles, Bell, ChevronRight } from '../ui/Icons'
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
  return { title: 'StudyFlow', subtitle: 'Your adaptive university learning workspace.' }
}

// Calculate next test/exam countdown
function getNextAssessment() {
  const now = new Date()
  const currentYear = now.getFullYear()
  
  // Real 1st‑semester assessment dates (2026‑2027)
  const assessments = [
    { date: new Date(currentYear, 7, 16), label: 'Semester Starts', type: 'milestone' },
    { date: new Date(currentYear, 11, 7), label: 'CA Test 2', type: 'test' },
    { date: new Date(currentYear, 11, 14), label: 'Final Exams Start', type: 'exam' },
    { date: new Date(currentYear + 1, 0, 9), label: 'Final Exams Continue', type: 'exam' },
    { date: new Date(currentYear + 1, 0, 11), label: 'First Semester Break', type: 'holiday' },
  ]
  
  // Find next upcoming assessment
  const upcoming = assessments
    .filter(a => a.date > now)
    .sort((a, b) => a.date - b.date)[0]
  
  if (!upcoming) return null
  
  const diffTime = upcoming.date - now
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  return {
    days: diffDays,
    label: upcoming.label,
    type: upcoming.type,
    date: upcoming.date
  }
}

export function TopBar({ onMenuClick, onSearchClick, pathname }) {
  const { user } = useAuth()
  const meta = pageMeta(pathname)
  const initials = (user?.full_name || user?.username || 'Student').charAt(0).toUpperCase()
  const [showNotifications, setShowNotifications] = useState(false)
  const notificationRef = useRef(null)
  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setShowNotifications(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  const handleSearch = () => {
    if (onSearchClick) {
      onSearchClick()
    } else {
      window.dispatchEvent(new CustomEvent('open-command-palette'))
    }
  }
  
  // Get next assessment countdown
  const nextAssessment = useMemo(() => getNextAssessment(), [])
  
  // Notification items
  const notifications = useMemo(() => {
    const items = []
    if (nextAssessment) {
      items.push({
        id: 'next-assessment',
        title: nextAssessment.label,
        message: `${nextAssessment.days} day${nextAssessment.days !== 1 ? 's' : ''} until ${nextAssessment.type === 'exam' ? 'exam' : nextAssessment.type}`,
        type: nextAssessment.type,
        date: nextAssessment.date,
        urgent: nextAssessment.days <= 7
      })
    }
    // Add more notifications as needed
    items.push(
      { id: 'ca-reminder', title: 'Continuous Assessment', message: 'Submit CA1 by Friday', type: 'test', urgent: true },
      { id: 'new-material', title: 'New Study Material', message: 'CSC 203: Architecture notes updated', type: 'info', urgent: false },
      { id: 'ai-tip', title: 'AI Tutor Tip', message: 'Use "Explain Simply" for quick concept breakdowns', type: 'info', urgent: false }
    )
    return items
  }, [nextAssessment])
  
  const unreadCount = notifications.filter(n => n.urgent).length
  
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
      
      {/* Right: Actions */}
      <div className="sf-header-actions">
        {/* Quick Search Button */}
        <Tooltip content="Quick Search (Ctrl+K)" position="bottom">
          <button
            type="button"
            onClick={handleSearch}
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
        
        {/* Notification Bell with Countdown */}
        <div className="relative">
          <Tooltip content={`Notifications${unreadCount > 0 ? ` (${unreadCount})` : ''}`} position="bottom">
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className={`top-action-btn relative ${showNotifications ? 'text-cyan-400' : 'text-slate-400'}`}
              id="notification-btn"
              title="Notifications"
              aria-label="Open notifications"
              aria-expanded={showNotifications}
              aria-haspopup="dialog"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-[1px] -right-[2px] w-4 h-4 rounded-full bg-red-500 text-[9px] font-bold flex items-center justify-center border border-slate-950">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
          </Tooltip>
        </div>
        
        {/* Notification Popover */}
        {showNotifications && (
          <div
            className="fixed top-16 right-0 z-50 w-80 bg-slate-950/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-0 animate-fadeIn"
            ref={notificationRef}
            role="dialog"
            aria-label="Notifications"
          >
            <div className="p-3 border-b border-white/10 flex items-center justify-between">
              <h3 className="font-bold text-white">Notifications</h3>
              <button onClick={() => setShowNotifications(false)} className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/5"><ChevronRight size={16} className="rotate-90" /></button>
            </div>
            <div className="max-h-[400px] overflow-y-auto">
              {notifications.map((notif) => (
                <button
                  key={notif.id}
                  className={`w-full p-3 flex items-start gap-3 text-left hover:bg-white/5 transition-colors ${notif.urgent ? 'bg-red-500/10 border-b border-red-500/20' : ''}`}
                >
                  <div className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${notif.type === 'exam' ? 'bg-red-500' : notif.type === 'test' ? 'bg-amber-500' : notif.type === 'milestone' ? 'bg-cyan-500' : 'bg-slate-500'}`} />
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium text-white ${notif.urgent ? 'text-red-300' : ''}`}>{notif.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{notif.message}</p>
                    {notif.date && <p className="text-[10px] text-slate-500 mt-1">Due: {notif.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>}
                  </div>
                  {notif.urgent && <span className="text-[10px] font-bold text-red-400 px-1.5 py-0.5 rounded bg-red-500/20">URGENT</span>}
                </button>
              ))}
            </div>
            <div className="p-3 border-t border-white/10">
              <NavLink to="/calendar" className="sf-view-all-link text-sm gap-1 justify-center" onClick={() => setShowNotifications(false)}>
                <span>View Calendar</span>
                <ChevronRight size={14} />
              </NavLink>
            </div>
          </div>
        )}
      </div>
      
      {/* Ask AI Tutor Button (Hidden on /chat) */}
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
      <Tooltip content={`${user?.full_name || user?.username || 'Student'} · FUGUS 200L`} position="bottom">
        <div className="sf-user-avatar">
          {initials}
        </div>
      </Tooltip>
    </header>
  )
}

export default TopBar