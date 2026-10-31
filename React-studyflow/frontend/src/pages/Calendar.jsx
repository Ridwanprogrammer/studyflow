import { useState, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from '../components/ui/Icons';
import { useAuth } from '../stores/authStore';

export function CalendarPage() {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

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
    ];
  }, [currentDate]);

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const today = new Date();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const getEventsForDay = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    return semesterEvents.filter(
      (e) => e.date.getDate() === day && e.date.getMonth() === currentMonth && e.date.getFullYear() === currentYear
    );
  };

  const isToday = (day) => day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();

  const prevMonth = () => setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentYear, currentMonth + 1, 1));

  // Day cell style object - no / characters
  function makeDayStyle(type) {
    const bg = {};
    const border = {};
    const color = {};
    if (type === 'exam') {
      bg.backgroundColor = 'rgba(239,68,68,0.1)';
      border.borderColor = 'rgba(239,68,68,0.3)';
      color.color = 'rgb(239,68,68)';
    } else if (type === 'test') {
      bg.backgroundColor = 'rgba(251,191,36,0.1)';
      border.borderColor = 'rgba(251,191,36,0.3)';
      color.color = 'rgb(251,191,36)';
    } else if (type === 'milestone') {
      bg.backgroundColor = 'rgba(6,182,212,0.1)';
      border.borderColor = 'rgba(6,182,212,0.3)';
      color.color = 'rgb(6,182,212)';
    } else {
      bg.backgroundColor = 'rgba(17,24,39,0.1)';
      border.borderColor = 'rgba(17,24,39,0.3)';
      color.color = 'rgb(100,116,139)';
    }
    return { bg, border, color };
  }

  // Build day cell className string - NO template literals with ${}
  function dayCellClass(isTodayDay, type) {
    const s = makeDayStyle(type);
    const parts = [
      'min-h-[120px]',
      'flex',
      'flex-col',
      'items-start',
      'gap-2',
      'rounded-lg',
      'p-2',
      'text-sm',
    ];
    // Add inline style as a plain string without template literals
    const styleStr = `
      background:${s.bg.backgroundColor};
      border:${s.border.borderColor} solid;
      color:${s.color.color};
    `;
    // We'll add the style as a style prop instead of className
    // For className, just return the base classes
    const result = parts.join(' ');
    // Return an object with className and style
    return { className: result, style: s };
  }

  // Event chip class
  function eventChipClass(type) {
    const base = ['h-4', 'w-4', 'rounded-full', 'flex', 'items-center', 'justify-center', 'text-[10px]', 'font-medium'];
    if (type === 'exam') base.push('bg-red-500', 'text-white');
    if (type === 'test') base.push('bg-amber-500', 'text-white');
    if (type === 'milestone') base.push('bg-cyan-500', 'text-white');
    if (type === 'holiday') base.push('bg-slate-500', 'text-white');
    return base.join(' ');
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* ─── Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold tracking-widest uppercase mb-2">
            <ChevronLeft size={13} /> SEMESTER CALENDAR</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Academic Timeline</h1>
          <p className="text-slate-400 mt-1">FUGUS 200L · 2nd Semester · Key dates, assessments & deadlines</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setCurrentDate(new Date())} className="px-4 py-2 rounded-xl bg-white text-slate-200 text-sm font-medium transition-all hidden sm:flex items-center gap-2">
            <ChevronLeft size={16} /> Today</button>
        </div>
      </div>

      {/* ─── Month Calendar - matching removed sidebar design ─── */}
      <div className="bg-slate-950 border border-slate-300 rounded-2xl overflow-hidden">
        {/* Month Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-300 bg-slate-900 text-white">
          <button onClick={prevMonth} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white transition-colors" aria-label="Previous month">
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-white">{monthNames[currentMonth]} {currentYear}</h2>
            <span className="px-3 py-1 rounded text-cyan-400 text-xs font-bold uppercase tracking-wider">
              {semesterEvents.filter((e) => e.date.getMonth() === currentMonth && e.date.getFullYear() === currentYear).length} events
            </span>
          </div>
          <button onClick={nextMonth} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white transition-colors" aria-label="Next month">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 border-b border-slate-300 bg-slate-900 text-[10px] font-bold text-slate-400 uppercase py-2 px-1 text-center">
          {dayNames.map((d) => <div key={d}>{d}</div>)}
        </div>

        {/* Calendar Grid - matching sidebar calendar design */}
        <div className="grid grid-cols-7 gap-1 p-1 min-h-[600px]">
          {/* Empty cells before 1st */}
          {[...Array(firstDay)].map((_, i) => (
            <div key={`empty-${i}`} className="min-h-[120px] bg-slate-900/50" />
          ))}

          {/* Days - matching sidebar calendar design */}
          {[...Array(daysInMonth)].map((_, i) => {
            const day = i + 1;
            const events = getEventsForDay(day);
            const isTodayDay = isToday(day);
            const firstEventType = events.length > 0 ? events[0].type : null;
            const dc = dayCellClass(isTodayDay, firstEventType);
            return (
              <button key={day} className={dc.className} style={dc.style}>
                <span className="absolute top-1 left-1 text-xs font-medium">
                  {isTodayDay ? 'text-cyan-400' : 'rgb(100,116,139)'} {day}</span>
                {events.length > 0 && (
                  <div className={eventChipClass(events[0].type)}>
                    {events.slice(0, 3).map((event) => (
                      <div key={event.title} className="flex items-center gap-1">
                        {event.type === 'exam' && <ChevronLeft size={8} />}
                        {event.type === 'test' && 'Test'}
                        {event.type === 'milestone' && 'Milestone'}
                        {event.type === 'holiday' && 'Holiday'}
                        <span>{event.title}</span>
                      </div>
                    ))}

                    {events.length > 3 && (
                      <div className="text-[10px] font-medium text-slate-400 flex items-center justify-center">+{events.length - 3} more</div>
                    )}
                  </div>
                )}
              </button>
            );
          })}

          {/* Empty cells after last */}
          {[...Array((7 - ((firstDay + daysInMonth) % 7)) % 7)].map((_, i) => (
            <div key={`empty-end-${i}`} className="min-h-[120px] bg-slate-900/50" />
          ))}
        </div>
      </div>

      {/* ─── Legend - matching sidebar design ─── */}
      <div className="flex flex-wrap gap-2 p-2 rounded-xl bg-slate-950/50 border border-slate-300">
        <span className="text-sm font-medium text-slate-300">Legend:</span>
        <div className="flex flex-wrap gap-1">
          {[
            { label: 'Exams', color: 'bg-red-500' },
            { label: 'Assessments', color: 'bg-amber-500' },
            { label: 'Milestones', color: 'bg-cyan-500' },
            { label: 'Holidays', color: 'bg-slate-500' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1">
              <span className={`w-2 h-2 rounded ${item.color}`} />
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CalendarPage;