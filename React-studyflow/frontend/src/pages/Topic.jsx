import { useParams, NavLink, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useState, useEffect, useRef } from 'react'
import { api } from '../lib/api'
import { MarkdownRenderer } from '../components/MarkdownRenderer'
import { 
  ChevronLeft, Clock, Search, Bot, Sparkles, 
  Sparkle, BookOpen, X, ArrowRight, Download, Send, Loader2,
  Brain, Globe
} from '../components/ui/Icons'

export function Topic() {
  const { courseId, topicId } = useParams()
  const navigate = useNavigate()
  const [fontSize, setFontSize] = useState(16)
  const [showOutline, setShowOutline] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [assistantInput, setAssistantInput] = useState('')
  const [assistantMessages, setAssistantMessages] = useState([])
  const [isAssistantLoading, setIsAssistantLoading] = useState(false)
  const [chatSessionId, setChatSessionId] = useState(null)
  
  const contentRef = useRef(null)
  const chatBottomRef = useRef(null)

  const { data: topic, isLoading, error } = useQuery({
    queryKey: ['topic', courseId, topicId],
    queryFn: async () => {
      const response = await api.get(`/courses/topics/${topicId}/`)
      return response.data
    },
    enabled: !!courseId && !!topicId,
  })

  const { data: course } = useQuery({
    queryKey: ['course', courseId],
    queryFn: async () => {
      const response = await api.get(`/courses/${courseId}/`)
      return response.data
    },
    enabled: !!courseId,
  })

  // Track window scroll progress for reading bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100
        setReadingProgress(Math.min(100, Math.max(0, progress)))
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-scroll assistant messages
  useEffect(() => {
    if (sidebarOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [assistantMessages, sidebarOpen])

  // Initial welcome message in assistant
  useEffect(() => {
    if (topic && assistantMessages.length === 0) {
      setAssistantMessages([
        {
          role: 'assistant',
          content: `Hello! I'm your StudyFlow AI guide for **${topic.title}**.\n\nAsk me anything about these notes, request practice problems, or click any prompt below!`,
        },
      ])
    }
  }, [topic, assistantMessages.length])

  // Save last visited topic to localStorage for Resume Learning banner
  useEffect(() => {
    if (course && topic) {
      localStorage.setItem(
        'sf_last_visited_topic',
        JSON.stringify({
          courseCode: course.code,
          courseTitle: course.title,
          topicId: topic.topic_id || topic.id,
          topicTitle: topic.title,
          timestamp: Date.now(),
        })
      )
    }
  }, [course, topic])

  const handleExportPdf = () => {
    window.print()
  }

  const handleSendAssistant = async (textToSend) => {
    const content = (textToSend || assistantInput).trim()
    if (!content || isAssistantLoading) return

    setAssistantInput('')
    setAssistantMessages((prev) => [...prev, { role: 'user', content }])
    setIsAssistantLoading(true)

    try {
      let sessionId = chatSessionId
      if (!sessionId) {
        const sessionRes = await api.post('/chat/sessions/', {
          title: `${course?.code || 'Study'}: ${topic?.title || 'Notes'}`,
          course_id: course?.id,
          topic_id: topic?.id,
        })
        sessionId = sessionRes.data.id
        setChatSessionId(sessionId)
      }

      const res = await api.post(`/chat/sessions/${sessionId}/messages/`, {
        content,
      })
      const reply = res.data?.assistant_message?.content || 'Here is what you should know about this topic.'
      setAssistantMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setAssistantMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I had trouble reaching the AI assistant. Please try again or open the full Chat Studio.',
        },
      ])
    } finally {
      setIsAssistantLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6 animate-pulse">
        <div className="glass-panel h-20 rounded-2xl" />
        <div className="glass-panel h-[600px] rounded-2xl" />
      </div>
    )
  }

  if (error || !topic) {
    return (
      <div className="max-w-md mx-auto p-12 text-center glass-panel rounded-2xl border border-white/10 mt-12 space-y-4">
        <Bot size={48} className="mx-auto text-slate-500 opacity-50" />
        <h2 className="text-xl font-bold text-white">Topic not found</h2>
        <p className="text-slate-400 text-sm">The topic you're looking for doesn't exist.</p>
        <NavLink to={`/courses/${courseId}`} className="btn-primary inline-flex items-center gap-2">
          <ChevronLeft size={16} />
          <span>Back to Course</span>
        </NavLink>
      </div>
    )
  }

  // Extract outline headings (#, ##, ###)
  const headings = (topic.notes || '')
    .split('\n')
    .filter((line) => line.startsWith('#'))
    .map((line) => {
      const match = line.match(/^(#{1,3})\s+(.+)$/)
      if (!match) return null
      return {
        level: match[1].length,
        text: match[2].trim(),
        anchor: match[2].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      }
    })
    .filter(Boolean)

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-500 bg-slate-900/60">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-lime-400 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Topic Action Bar */}
        <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-wrap items-center justify-between gap-4">
          <NavLink
            to={`/courses/${courseId}`}
            className="flex items-center gap-2 text-slate-300 hover:text-white font-medium text-sm transition-colors"
          >
            <ChevronLeft size={18} />
            <span>Back to {course?.code || 'Course'}</span>
          </NavLink>

          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="flex items-center gap-1.5 text-xs text-slate-400 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/10">
              <Clock size={14} />
              <span>{topic.estimated_read_time || 5} min read</span>
            </span>

            {/* Font Size Scaling */}
            <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-0.5">
              <button
                type="button"
                onClick={() => setFontSize((prev) => Math.max(13, prev - 2))}
                className="px-2 py-1 text-xs font-bold text-slate-300 hover:text-white transition-colors"
                title="Decrease font size"
              >
                A-
              </button>
              <div className="w-[1px] h-3 bg-white/10" />
              <button
                type="button"
                onClick={() => setFontSize((prev) => Math.min(24, prev + 2))}
                className="px-2 py-1 text-xs font-bold text-slate-300 hover:text-white transition-colors"
                title="Increase font size"
              >
                A+
              </button>
            </div>

            {/* Quick Search */}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
              className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-white/5 border border-white/10 px-2.5 py-1.5 rounded-lg transition-colors"
              title="Quick Search (Ctrl + K)"
            >
              <Search size={14} />
              <span className="hidden sm:inline">Search</span>
            </button>

            {/* Ask Assistant Drawer Toggle */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-1.5 text-xs font-semibold text-cyan-300 bg-cyan-500/15 border border-cyan-500/30 px-3 py-1.5 rounded-lg hover:bg-cyan-500/25 transition-all shadow-sm shadow-cyan-500/20"
            >
              <Bot size={15} />
              <span>Ask AI Tutor</span>
            </button>

            {/* Glossary Link with Origin tracking */}
            <NavLink
              to={`/glossary?originTopic=${encodeURIComponent(topic.title)}&originCourse=${encodeURIComponent(courseId)}`}
              className="flex items-center gap-1.5 text-xs text-purple-300 bg-purple-500/15 border border-purple-500/30 px-2.5 py-1.5 rounded-lg hover:bg-purple-500/25 transition-colors"
            >
              <Sparkles size={14} />
              <span className="hidden sm:inline">Glossary</span>
            </NavLink>

            {/* Export PDF */}
            <button
              onClick={handleExportPdf}
              className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-white/5 border border-white/10 px-2.5 py-1.5 rounded-lg transition-colors"
              title="Print or save as PDF"
            >
              <Download size={14} />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>

        {/* Section Outline Chips (if outline enabled or headings exist) */}
        {headings.length > 0 && (
          <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider">
              <span>Topic Outline</span>
              <button
                onClick={() => setShowOutline(!showOutline)}
                className="text-cyan-400 hover:underline"
              >
                {showOutline ? 'Hide Outline' : 'Show Outline'}
              </button>
            </div>
            {showOutline && (
              <div className="flex flex-wrap gap-2 pt-1">
                {headings.map((h) => (
                  <a
                    key={h.anchor}
                    href={`#${h.anchor}`}
                    className="text-xs px-2.5 py-1 rounded-lg bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-300 border border-white/10 text-slate-300 transition-colors"
                  >
                    {h.text}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Main Notes Card */}
        <article className="glass-panel p-6 sm:p-10 rounded-2xl border border-white/10 space-y-6 print:bg-white print:text-black">
          <header className="border-b border-white/10 pb-6 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              {course?.code} · {course?.title}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {topic.title}
            </h1>
          </header>

          {/* Learning Guide Box (Mental models, why it matters) */}
          {topic.learning_guide && typeof topic.learning_guide === 'object' && Object.keys(topic.learning_guide).length > 0 && (
            <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/40 to-blue-950/40 border border-cyan-500/30 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <Sparkle size={16} />
                <span>Study Guide & Mental Model</span>
              </div>
              {topic.learning_guide.why && (
                <div className="text-xs sm:text-sm text-slate-200">
                  <strong className="text-cyan-300">Why this matters: </strong>
                  {topic.learning_guide.why}
                </div>
              )}
              {topic.learning_guide.mentalModel && (
                <div className="text-xs sm:text-sm text-slate-200">
                  <strong className="text-cyan-300">Mental Model: </strong>
                  {topic.learning_guide.mentalModel}
                </div>
              )}
              {topic.learning_guide.plainExplanation && (
                <div className="text-xs sm:text-sm text-slate-200">
                  <strong className="text-cyan-300">In plain English: </strong>
                  {topic.learning_guide.plainExplanation}
                </div>
              )}
              {topic.learning_guide.check && (
                <div className="text-xs sm:text-sm text-lime-300 bg-lime-500/10 p-3 rounded-xl border border-lime-500/20">
                  <strong>Self Check: </strong>
                  {topic.learning_guide.check}
                </div>
              )}
            </div>
          )}

          {/* Notes Content with Fluid KaTeX Math & Typography */}
          <div
            ref={contentRef}
            className="prose prose-invert max-w-none text-slate-200 leading-relaxed space-y-4"
            style={{ fontSize: `${fontSize}px` }}
          >
            <MarkdownRenderer content={topic.notes} />
          </div>
        </article>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-4">
          <NavLink
            to={`/courses/${courseId}`}
            className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft size={16} />
            <span>Return to Course Topics</span>
          </NavLink>

          <button
            onClick={() => handleSendAssistant(`Give me 3 practice test questions on ${topic.title}`)}
            className="flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:underline"
          >
            <Bot size={16} />
            <span>Practice with AI Tutor →</span>
          </button>
        </div>
      </div>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-300 print:hidden">
        {headings.length > 0 && (
          <button
            onClick={() => setShowOutline(!showOutline)}
            className="w-12 h-12 rounded-full glass-panel border border-white/20 text-slate-300 hover:text-white flex items-center justify-center shadow-lg hover:shadow-cyan-500/20 transition-all"
            title="Toggle Outline"
          >
            <BookOpen size={20} />
          </button>
        )}
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-2xl hover:scale-105 transition-all"
        >
          <Bot size={20} />
          <span className="hidden sm:inline">Ask AI</span>
        </button>
      </div>

      {/* Slide-out AI Tutor Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-500 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
          <aside className="w-full max-w-md bg-slate-950 border-l border-white/10 h-full flex flex-col shadow-2xl animate-slide-left">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-slate-900/60">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">StudyFlow AI Guide</h3>
                  <p className="text-[11px] text-slate-400 truncate max-w-[200px]">{topic.title}</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-md"
                aria-label="Close assistant"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
              {assistantMessages.map((msg, i) => (
                <div
                  key={`${msg.role}-${i}-${msg.content.slice(0, 20)}`}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-br-none'
                        : 'bg-slate-900 border border-white/10 text-slate-200 rounded-bl-none'
                    }`}
                  >
                    <MarkdownRenderer content={msg.content} />
                  </div>
                </div>
              ))}
              {isAssistantLoading && (
                <div className="flex items-center gap-2 text-cyan-400 text-xs p-2">
                  <Loader2 size={16} className="animate-spin" />
                  <span>Thinking...</span>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Quick Prompts Bar */}
            <div className="p-2 border-t border-white/10 bg-slate-950 flex gap-2 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => handleSendAssistant('Explain this topic step by step with an easy analogy')}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs whitespace-nowrap rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 cursor-pointer"
              >
                <BookOpen size={12} className="text-cyan-400" />
                <span>Explain simply</span>
              </button>
              <button
                type="button"
                onClick={() => handleSendAssistant('Give me a 3-question active recall quiz on this topic')}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs whitespace-nowrap rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 cursor-pointer"
              >
                <Brain size={12} className="text-lime-400" />
                <span>Quiz me</span>
              </button>
              <button
                type="button"
                onClick={() => handleSendAssistant('Give me a Nigerian real-world case study for this concept')}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs whitespace-nowrap rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 cursor-pointer"
              >
                <Globe size={12} className="text-emerald-400" />
                <span>Local example</span>
              </button>
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendAssistant()
              }}
              className="p-3 border-t border-white/10 bg-slate-900/40 flex items-center gap-2"
            >
              <input
                type="text"
                value={assistantInput}
                onChange={(e) => setAssistantInput(e.target.value)}
                placeholder="Ask about this topic..."
                disabled={isAssistantLoading}
                className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-white placeholder-slate-400 text-sm focus:border-cyan-400 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!assistantInput.trim() || isAssistantLoading}
                className="w-9 h-9 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:hover:bg-cyan-500 text-slate-950 flex items-center justify-center font-bold transition-all"
              >
                <ArrowRight size={16} />
              </button>
            </form>
          </aside>
        </div>
      )}
    </>
  )
}

export default Topic
