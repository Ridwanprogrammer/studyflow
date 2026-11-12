import { useParams, NavLink, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useState, useEffect, useRef } from 'react'
import { api, unwrapList } from '../lib/api'
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
  const [showOutline, setShowOutline] = useState(() => window.matchMedia('(min-width: 1024px)').matches)
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

  const { data: glossaryTerms = [] } = useQuery({
    queryKey: ['glossary-all'],
    queryFn: async () => {
      const response = await api.get('/glossary/?page_size=200')
      return unwrapList(response.data)
    },
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
    .flatMap((line, lineIndex) => {
      const match = line.match(/^(#{2,3})\s+(.+)$/)
      if (!match) return []
      const text = match[2]
        .replace(/\[\[.*?\|(.+?)\]\]/g, '$1')
        .replace(/\[\[(.+?)\]\]/g, '$1')
        .trim()
      return [{
        level: match[1].length,
        text,
        anchor: `topic-section-${lineIndex}`,
      }]
    })

  return (
    <>
      <div className="sf-reading-progress" aria-hidden="true">
        <div
          className="sf-reading-progress__fill"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className={`sf-study-workspace ${showOutline ? 'outline-open' : 'outline-closed'}`}>
        <div className="sf-study-toolbar">
          <NavLink
            to={`/courses/${courseId}`}
            className="sf-study-back"
          >
            <ChevronLeft size={18} />
            <span>Back to {course?.code || 'Course'}</span>
          </NavLink>

          <div className="sf-study-toolbar__actions">
            {headings.length > 0 && (
              <button
                type="button"
                onClick={() => setShowOutline((open) => !open)}
                className="sf-study-tool sf-study-outline-toggle"
                aria-expanded={showOutline}
                aria-controls="topic-outline"
              >
                <BookOpen size={15} />
                <span>Outline</span>
              </button>
            )}
            <span className="sf-study-read-time">
              <Clock size={14} />
              <span>{topic.estimated_read_time || 5} min read</span>
            </span>

            <div className="sf-study-font-controls" aria-label="Note text size">
              <button
                type="button"
                onClick={() => setFontSize((prev) => Math.max(13, prev - 2))}
                className="sf-study-tool"
                title="Decrease font size"
                aria-label="Decrease note text size"
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => setFontSize((prev) => Math.min(24, prev + 2))}
                className="sf-study-tool"
                title="Increase font size"
                aria-label="Increase note text size"
              >
                A+
              </button>
            </div>

            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
              className="sf-study-tool"
              title="Quick Search (Ctrl + K)"
            >
              <Search size={14} />
              <span className="hidden sm:inline">Search</span>
            </button>

            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="sf-study-tool sf-study-tool--primary"
            >
              <Bot size={15} />
              <span>Ask AI Tutor</span>
            </button>

            <NavLink
              to={`/glossary?originTopic=${encodeURIComponent(topic.title)}&originCourse=${encodeURIComponent(courseId)}&originTopicId=${encodeURIComponent(topicId)}`}
              className="sf-study-tool"
            >
              <Sparkles size={14} />
              <span className="hidden sm:inline">Glossary</span>
            </NavLink>

            <button
              type="button"
              onClick={handleExportPdf}
              className="sf-study-tool"
              title="Print or save as PDF"
            >
              <Download size={14} />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>

        <div className="sf-study-layout">
          {showOutline && (
            <button
              type="button"
              className="sf-topic-outline-backdrop"
              aria-label="Close topic outline"
              onClick={() => setShowOutline(false)}
            />
          )}

          {headings.length > 0 && (
            <aside id="topic-outline" className="sf-topic-outline" aria-label="Topic outline">
              <div className="sf-topic-outline__header">
                <span>In this lesson</span>
                <button
                  type="button"
                  className="sf-topic-outline__close"
                  onClick={() => setShowOutline(false)}
                  aria-label="Hide topic outline"
                >
                  <X size={16} />
                </button>
              </div>
              <nav className="sf-topic-outline__nav" aria-label="Lesson sections">
                {headings.map((heading, index) => (
                  <a
                    key={`${heading.anchor}-${index}`}
                    href={`#${heading.anchor}`}
                    className={`sf-topic-outline__link level-${heading.level}`}
                    onClick={() => setShowOutline(false)}
                  >
                    {heading.text}
                  </a>
                ))}
              </nav>
              <div className="sf-topic-outline__footer">
                <span>{headings.length} sections</span>
                <span>Read at your pace</span>
              </div>
            </aside>
          )}

          <article className="sf-topic-reader">
            <header className="sf-topic-reader__header">
              <div className="sf-topic-reader__meta">
                <span>{course?.code}</span>
                <span>{course?.title}</span>
              </div>
              <h1>{topic.title}</h1>
              <p>{topic.estimated_read_time || 5} minute read</p>
            </header>

            {topic.learning_guide && typeof topic.learning_guide === 'object' && Object.keys(topic.learning_guide).length > 0 && (
              <section className="sf-study-guide" aria-label="Study guide">
                <div className="sf-study-guide__title">
                  <Sparkle size={16} />
                  <span>A way into this topic</span>
                </div>
                {topic.learning_guide.why && <p><strong>Why it matters</strong>{topic.learning_guide.why}</p>}
                {topic.learning_guide.mentalModel && <p><strong>Think of it this way</strong>{topic.learning_guide.mentalModel}</p>}
                {topic.learning_guide.plainExplanation && <p><strong>In plain language</strong>{topic.learning_guide.plainExplanation}</p>}
                {topic.learning_guide.check && (
                  <p className="sf-study-guide__check">
                    <strong>Quick check</strong>{topic.learning_guide.check}
                  </p>
                )}
              </section>
            )}

            <div
              ref={contentRef}
              className="sf-topic-markdown"
              style={{ fontSize: `${fontSize}px` }}
            >
              <MarkdownRenderer
                content={topic.notes}
                glossaryTerms={glossaryTerms}
                glossaryContext={{
                  originTopic: topic.title,
                  originCourse: courseId,
                  originTopicId: topicId,
                }}
              />
            </div>

            <footer className="sf-topic-reader__footer">
              <NavLink to={`/courses/${courseId}`}>
                <ChevronLeft size={16} />
                <span>Back to course topics</span>
              </NavLink>
              <button
                type="button"
                onClick={() => handleSendAssistant(`Give me 3 practice test questions on ${topic.title}`)}
              >
                <Bot size={16} />
                <span>Practice this topic</span>
              </button>
            </footer>
          </article>
        </div>
      </div>

      <div className="sf-study-floating-actions print:hidden">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="sf-study-floating-ai"
          aria-label="Ask the AI tutor"
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
