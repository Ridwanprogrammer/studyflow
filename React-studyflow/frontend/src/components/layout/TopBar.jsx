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
  if (pathname === '/calendar') {
    return { title: 'Semester Calendar', subtitle: 'Key dates, assessments & deadlines' }
  }
  return { title: 'StudyFlow', subtitle: 'Your adaptive university learning workspace.' }
}

export function TopBar({ onMenuClick, onSearchClick, pathname }) {
  const { user } = useAuth()
  const meta = pageMeta(pathname)
  const initials = (user?.full_name || user?.username || 'Student').charAt(0).toUpperCase()

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

        {/* Notification Bell */}
        <Tooltip content="Notifications" position="bottom">
          <button
            type="button"
            className="top-action-btn relative"
            id="notification-btn"
            title="Notifications"
            aria-label="Open notifications"
          >
            <Bell size={18} />
            <span className="absolute -top-[1px] -right-[2px] w-4 h-4 rounded-full bg-red-500 text-[9px] font-bold flex items-center justify-center border border-slate-950">
              3
            </span>
          </button>
        </Tooltip>

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
        <Tooltip content={`${user?.full_name || user?.username || 'Student'} · FUGUS 200L`} position="bottom">
          <div className="sf-user-avatar">
            {initials}
          </div>
        </Tooltip>
      </div>
    </header>
  )
}

export default TopBar