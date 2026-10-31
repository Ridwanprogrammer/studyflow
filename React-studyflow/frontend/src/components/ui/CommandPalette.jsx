import { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api, unwrapList } from '../../lib/api'
import { Search, BookOpen, Sparkles, Bot, ArrowRight, X } from './Icons'

export function CommandPalette({ isOpen, onClose }) {
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Fetch courses and glossary for search
  const { data: courses = [] } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const response = await api.get('/courses/')
      return unwrapList(response.data)
    },
    staleTime: 5 * 60 * 1000,
  })

  const { data: glossaryTerms = [] } = useQuery({
    queryKey: ['glossary-all'],
    queryFn: async () => {
      const response = await api.get('/glossary/?page_size=100')
      return unwrapList(response.data)
    },
    staleTime: 5 * 60 * 1000,
  })

  // Extract all topics from courses
  const allTopics = useMemo(() => {
    const list = []
    courses.forEach((c) => {
      if (Array.isArray(c.topics)) {
        c.topics.forEach((t) => {
          list.push({
            ...t,
            courseCode: c.code,
            courseTitle: c.title,
            courseId: c.code,
          })
        })
      }
    })
    return list
  }, [courses])

  // Filter items based on query
  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) {
      // Default suggested items
      return [
        ...courses.slice(0, 3).map((c) => ({
          type: 'course',
          id: c.code,
          title: `${c.code}: ${c.title}`,
          subtitle: `${c.topics?.length || 0} topics · ${c.discipline?.name || 'General'}`,
          url: `/courses/${c.code}`,
          icon: BookOpen,
        })),
        {
          type: 'action',
          id: 'ask-ai-general',
          title: 'Start AI Study Session',
          subtitle: 'Ask your adaptive FUGUS AI study copilot',
          url: '/chat',
          icon: Bot,
        },
      ]
    }

    const matches = []

    // 1. Matches in courses
    courses.forEach((c) => {
      if (
        c.code.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        (c.description && c.description.toLowerCase().includes(q))
      ) {
        matches.push({
          type: 'course',
          id: `course-${c.code}`,
          title: `${c.code}: ${c.title}`,
          subtitle: c.description || 'Course overview & syllabus',
          url: `/courses/${c.code}`,
          icon: BookOpen,
        })
      }
    })

    // 2. Matches in topics
    allTopics.forEach((t) => {
      if (
        t.title.toLowerCase().includes(q) ||
        t.courseCode.toLowerCase().includes(q)
      ) {
        matches.push({
          type: 'topic',
          id: `topic-${t.topic_id || t.id}`,
          title: t.title,
          subtitle: `${t.courseCode} · ${t.estimated_read_time || 5} min read`,
          url: `/courses/${t.courseCode}/topics/${t.topic_id || t.id}`,
          icon: BookOpen,
        })
      }
    })

    // 3. Matches in glossary
    glossaryTerms.forEach((g) => {
      if (
        g.term.toLowerCase().includes(q) ||
        (g.short_definition && g.short_definition.toLowerCase().includes(q))
      ) {
        matches.push({
          type: 'glossary',
          id: `glossary-${g.slug || g.id}`,
          title: g.term,
          subtitle: g.short_definition || 'Glossary definition',
          url: `/glossary?term=${encodeURIComponent(g.slug || g.term)}`,
          icon: Sparkles,
        })
      }
    })

    // 4. Always offer "Ask AI" for whatever is typed
    matches.push({
      type: 'action',
      id: 'ask-ai-query',
      title: `Ask AI Tutor about "${query}"`,
      subtitle: 'Get an interactive step-by-step breakdown with worked examples',
      url: `/chat?prompt=${encodeURIComponent(`Explain ${query} with university exam examples and step-by-step concepts`)}`,
      icon: Bot,
    })

    return matches.slice(0, 10)
  }, [query, courses, allTopics, glossaryTerms])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, results.length))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + results.length) % Math.max(1, results.length))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const selected = results[selectedIndex]
      if (selected) {
        navigate(selected.url)
        onClose()
      }
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-500 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-md transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Quick Command and Search"
    >
      <div className="w-full max-w-2xl bg-slate-900 border border-white/10 rounded-2xl shadow-2xl shadow-cyan-500/10 overflow-hidden flex flex-col max-h-[80vh] animate-scale-in">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-slate-950/40">
          <Search size={20} className="text-cyan-400 flex-shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent text-white placeholder-slate-400 text-base outline-none focus:ring-0 border-0"
            placeholder="Search courses, topics, glossary terms, or ask AI..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            onKeyDown={handleKeyDown}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-white p-1 rounded-md"
              aria-label="Clear query"
            >
              <X size={16} />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs font-semibold text-slate-400 bg-white/5 border border-white/10 rounded-md">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 space-y-1 divide-y divide-white/5 flex-1">
          {results.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">
              No matching courses, topics, or terms found.
            </div>
          ) : (
            results.map((item, idx) => {
              const IconComp = item.icon
              const isSelected = idx === selectedIndex
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    navigate(item.url)
                    onClose()
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-500/15 to-blue-500/15 border border-cyan-400/30 text-white'
                      : 'text-slate-300 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        item.type === 'action'
                          ? 'bg-cyan-500/20 text-cyan-400'
                          : item.type === 'glossary'
                          ? 'bg-purple-500/20 text-purple-300'
                          : 'bg-blue-500/20 text-blue-300'
                      }`}
                    >
                      <IconComp size={18} aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-sm text-white truncate">
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-400 truncate">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pl-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        item.type === 'action'
                          ? 'bg-cyan-500/20 text-cyan-300'
                          : item.type === 'glossary'
                          ? 'bg-purple-500/20 text-purple-300'
                          : item.type === 'topic'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-blue-500/20 text-blue-300'
                      }`}
                    >
                      {item.type}
                    </span>
                    <ArrowRight size={14} className={isSelected ? 'text-cyan-400' : 'text-slate-500'} />
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-white/10 bg-slate-950/60 text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10 font-mono text-[10px]">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10 font-mono text-[10px]">↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10 font-mono text-[10px]">↵</kbd>
              Open
            </span>
          </div>
          <span>StudyFlow Quick Search</span>
        </div>
      </div>
    </div>
  )
}
