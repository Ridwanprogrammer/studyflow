import { useState, useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Calendar, AlertCircle, BookOpen, GraduationCap, MapPin } from '../components/ui/Icons'
import { useAuth } from '../stores/authStore'

export function CalendarPage() {
  const { user } = useAuth()
  const [currentDate, setCurrentDate] = useState(new Date())

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

  // Real 1st-semester dates (2026-2027) - from FUGUS academic calendar
  const semesterEvents = useMemo(() => {
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
  }, [currentDate])

  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()
  const today = new Date()
  const firstDay = new Date(currentYear, currentMonth, 1).getDay()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  const getEventsForDay = (day) => {
    const date = new Date(currentYear, currentMonth, day)
    return semesterEvents.filter(
      (e) => e.date.getDate() === day && e.date.getMonth() === currentMonth && e.date.getFullYear() === currentYear
    )
  }

  const isToday = (day) => day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()

  const prevMonth = () => setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  const nextMonth = () => setCurrentDate(new Date(currentYear, currentMonth + 1, 1))

  // Color mapping for event types
  const getEventColors = (type) => {
    switch (type) {
      case 'exam': return { bg: 'bg-red-500', text: 'text-white', border: 'border-red-500', dot: 'bg-red-400', light: 'bg-red-500/10', ring: 'ring-red-500/20' }
      case 'test': return { bg: 'bg-amber-500', text: 'text-white', border: 'border-amber-500', dot: 'bg-amber-400', light: 'bg-amber-500/10', ring: 'ring-amber-500/20' }
      case 'milestone': return { bg: 'bg-cyan-500', text: 'text-white', border: 'border-cyan-500', dot: 'bg-cyan-400', light: 'bg-cyan-500/10', ring: 'ring-cyan-500/20' }
      case 'holiday': return { bg: 'bg-slate-500', text: 'text-white', border: 'border-slate-500', dot: 'bg-slate-400', light: 'bg-slate-500/10', ring: 'ring-slate-500/20' }
      default: return { bg: 'bg-slate-500', text: 'text-white', border: 'border-slate-500', dot: 'bg-slate-400', light: 'bg-slate-500/10', ring: 'ring-slate-500/20' }
    }
  }

  // Get the most important event type for a day (exam > test > milestone > holiday)
  const getPrimaryEventType = (events) => {
    if (!events.length) return null
    const priority = { exam: 4, test: 3, milestone: 2, holiday: 1 }
    return events.reduce((a, b) => priority[b.type] > priority[a.type] ? b : a).type
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* ─── Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold tracking-widest uppercase mb-2">
            <Calendar size={13} />
            <span>SEMESTER CALENDAR</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Academic Timeline</h1>
          <p className="text-slate-400 mt-1">FUGUS 200L · 1st Semester · Key dates, assessments & deadlines</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setCurrentDate(new Date())} className="px-4 py-2 rounded-xl bg-white text-slate-200 text-sm font-medium transition-all hidden sm:flex items-center gap-2">
            <Calendar size={16} />
            <span>Today</span>
          </button>
        </div>
      </div>

      {/* ─── Month Calendar ─── */}
      <div className="bg-slate-950/50 border border-white/5 rounded-2xl overflow-hidden">
        {/* Month Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/5 bg-slate-900/50">
          <button onClick={prevMonth} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors" aria-label="Previous month">
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-white">{monthNames[currentMonth]} {currentYear}</h2>
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              {semesterEvents.filter((e) => e.date.getMonth() === currentMonth && e.date.getFullYear() === currentYear).length} events
            </span>
          </div>
          <button onClick={nextMonth} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors" aria-label="Next month">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 border-b border-white/5 bg-slate-900/50">
          {dayNames.map((d) => <div key={d} className="text-[10px] font-bold text-slate-400 uppercase py-3 px-2 text-center">{d}</div>)}
        </div>

        {/* Calendar Grid - Improved with better event visualization */}
        <div className="grid grid-cols-7 gap-0.5 p-2 min-h-[600px]">
          {/* Empty cells before 1st */}
          {[...Array(firstDay)].map((_, i) => <div key={`empty-${i}`} className="aspect-square bg-slate-900/30" />)}

          {/* Days - Improved with colored backgrounds and dots for events */}
          {[...Array(daysInMonth)].map((_, i) => {
            const day = i + 1
            const events = getEventsForDay(day)
            const isTodayDay = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()
            const primaryType = getPrimaryEventType(events)
            const colors = primaryType ? getEventColors(primaryType) : null
            const hasEvents = events.length > 0
            
            // Build day cell classes
            const dayClasses = [
              'aspect-square',
              'min-h-[120px]',
              'rounded-xl',
              'bg-white/[0.02]',
              'border',
              'border-white/5',
              'hover:border-white/10',
              'transition-all',
              'flex',
              'flex-col',
              'relative',
              'overflow-hidden'
            ]
            
            if (isTodayDay) {
              dayClasses.push('ring-2', 'ring-cyan-500/50', 'bg-cyan-500/10')
            }
            if (hasEvents && colors) {
              dayClasses.push(colors.light, colors.ring)
            }
            
            return (
              <button
                key={day}
                className={dayClasses.join(' ')}
                title={hasEvents ? events.map(e => e.title).join(', ') : ''}
              >
                {/* Day number */}
                <span className="absolute top-1.5 left-1.5 text-sm font-medium">
                  {isTodayDay ? <span className="text-cyan-400">{day}</span> : <span className="text-slate-300">{day}</span>}
                </span>
                
                {/* Event indicators - colored dots at top right */}
                {hasEvents && (
                  <div className="absolute top-1.5 right-1.5 flex gap-0.5 flex-wrap justify-end">
                    {events.slice(0, 4).map((event) => {
                      const c = getEventColors(event.type)
                      return (
                        <span
                          key={event.title}
                          className={`w-1.5 h-1.5 rounded-full ${c.dot} ring-1 ring-slate-950`}
                          title={event.title}
                        />
                      )
                    })}
                    {events.length > 4 && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white/30 ring-1 ring-slate-950" title={`+${events.length - 4} more`} />
                    )}
                  </div>
                )}
                
                {/* Event labels at bottom */}
                {hasEvents && (
                  <div className="flex-1 mt-auto px-1.5 pb-1.5 overflow-hidden space-y-0.5">
                    {events.slice(0, 2).map((event) => {
                      const c = getEventColors(event.type)
                      return (
                        <div
                          key={event.title}
                          className={`h-5 rounded px-1.5 text-[10px] font-medium flex items-center gap-1 ${c.bg} ${c.border} ${c.text} truncate`}
                          title={event.title}
                        >
                          <span className="flex-shrink-0">{event.title}</span>
                        </div>
                      )
                    })}
                    {events.length > 2 && (
                      <div className="h-5 rounded bg-white/10 text-[10px] font-medium text-center text-slate-400 flex items-center justify-center">
                        +{events.length - 2} more
                      </div>
                    )}
                  </div>
                )}
              </button>
            )
          })}

          {/* Empty cells after last */}
          {[...Array((7 - ((firstDay + daysInMonth) % 7)) % 7)].map((_, i) => <div key={`empty-end-${i}`} className="aspect-square bg-slate-900/30" />)}
        </div>
      </div>

      {/* ─── Upcoming Events List ─── */}
      <div className="bg-slate-950/50 border border-white/5 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-white/5 bg-slate-900/50 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Upcoming Events</h2>
          <NavLink to="/calendar" className="text-xs text-cyan-400 hover:text-cyan-300">View All</NavLink>
        </div>
        <div className="p-4 space-y-3">
          {semesterEvents
            .filter(e => e.date >= new Date())
            .sort((a, b) => a.date - b.date)
            .slice(0, 6)
            .map((event) => {
              const colors = getEventColors(event.type)
              return (
                <div key={event.title} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colors.bg} ${colors.text} flex-shrink-0`}>
                    <Calendar size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white">{event.title}</p>
                    <p className="text-xs text-slate-400">{event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${colors.bg} ${colors.text}`}>
                    {event.type}
                  </span>
                </div>
              )
            })}
        </div>
      </div>

      {/* ─── Legend ─── */}
      <div className="flex flex-wrap gap-4 p-4 rounded-xl bg-slate-950/50 border border-white/5">
        <span className="text-sm font-medium text-slate-300 self-center">Legend:</span>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Exams', ...getEventColors('exam') },
            { label: 'Assessments', ...getEventColors('test') },
            { label: 'Milestones', ...getEventColors('milestone') },
            { label: 'Holidays', ...getEventColors('holiday') },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5 text-sm text-slate-300">
              <span className={`w-3 h-3 rounded ${item.dot}`} />
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CalendarPage