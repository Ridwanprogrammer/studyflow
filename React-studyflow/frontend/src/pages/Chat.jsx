import { useState, useEffect, useRef, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams, NavLink } from 'react-router-dom'
import { useAuth } from '../stores/authStore'
import { api, unwrapList } from '../lib/api'
import { MarkdownRenderer } from '../components/MarkdownRenderer'
import { 
  Plus, Bot, Sparkles, Sparkle, ChevronLeft, ChevronRight, 
  MessageSquare, Copy, Loader2, X, BookOpen, Brain, 
  ArrowRight, Download, Send, Search, Paperclip, ChevronDown, Check,
  FileQuestion, Zap, Globe, User, Menu, Trash2, MoreHorizontal
} from '../components/ui/Icons'

// Course emoji mapping
const courseEmojis = {
  'ALL': '🌐',
  'COS201': '💻',
  'CSC203': '🖥️',
  'CSC215': '⚡',
  'MTH201': '📐',
  'ENT211': '💼',
  'CSC299': '🏭',
}

const courseDisplayNames = {
  'COS201': 'Programming',
  'CSC203': 'Architecture',
  'CSC215': 'Digital Logic',
  'MTH201': 'Calculus II',
  'ENT211': 'Entrepreneurship',
  'CSC299': 'SIWES',
}

const PRESET_SUGGESTIONS = [
  {
    title: 'Exam Practice Questions',
    subtitle: '5 guided university problems with worked solutions',
    icon: FileQuestion,
    iconBg: 'icon-exam',
    prompt: 'Give me 5 FUGUS 200L exam practice questions for this course with worked solutions.',
  },
  {
    title: 'First-Principles Breakdown',
    subtitle: 'Intuitive analogies, core theorems & simple explanations',
    icon: Brain,
    iconBg: 'icon-concept',
    prompt: 'Explain the most important concepts for this subject step-by-step from first principles using relatable analogies.',
  },
  {
    title: 'Nigerian Case Studies',
    subtitle: 'Real-world applications in Paystack, telecoms & industry',
    icon: Globe,
    iconBg: 'icon-nigeria',
    prompt: 'Give me a Nigerian real-world case study applying this topic in fintech (Paystack/Flutterwave), power, or engineering.',
  },
  {
    title: 'High-Yield Revision Guide',
    subtitle: 'Formula cheat-sheet & common exam traps to avoid',
    icon: Zap,
    iconBg: 'icon-revision',
    prompt: 'Create a high-yield revision summary sheet with key formulas, laws, and common exam traps.',
  },
]

const QUICK_CHIPS = [
  { label: '5 Exam Questions', prompt: 'Generate 5 exam practice questions for this subject with worked solutions.' },
  { label: 'Explain Simply', prompt: 'Explain this concept step-by-step like I am in 100 level.' },
  { label: 'Flashcards', prompt: 'Create 5 question-and-answer flashcard pairs for quick revision.' },
  { label: 'Formula Sheet', prompt: 'List all key mathematical formulas and definitions for this topic.' },
  { label: 'Local Example', prompt: 'Give me a Nigerian real-world application of this concept.' },
]

export function Chat() {
  const [searchParams] = useSearchParams()
  const { user } = useAuth()
  const [sessions, setSessions] = useState([])
  const [currentSessionId, setCurrentSessionId] = useState(null)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedCourseCode, setSelectedCourseCode] = useState('ALL')
  const [selectedTopicId, setSelectedTopicId] = useState('ALL')
  const [contextMenuOpen, setContextMenuOpen] = useState(false)
  const [attachments, setAttachments] = useState([])
  const [copiedIndex, setCopiedIndex] = useState(null)
  const [sendButtonState, setSendButtonState] = useState('send') // 'send' | 'stop'
  
  // Context menu for delete session
  const [contextMenuSessionId, setContextMenuSessionId] = useState(null)
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 })

  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)
  const contextMenuRef = useRef(null)
  const inputCapsuleRef = useRef(null)

  // Fetch courses list for context switching
  const { data: courses = [] } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const response = await api.get('/courses/')
      return unwrapList(response.data)
    },
    staleTime: 5 * 60 * 1000,
  })

  // Selected course object
  const currentCourse = useMemo(() => {
    if (selectedCourseCode === 'ALL') return null
    return courses.find((c) => c.code === selectedCourseCode) || null
  }, [courses, selectedCourseCode])

  // Topics for selected course
  const courseTopics = currentCourse?.topics || []

  // Load chat sessions from backend
  useEffect(() => {
    async function loadSessions() {
      try {
        const response = await api.get('/chat/sessions/')
        const list = unwrapList(response.data)
        setSessions(list)
        if (list.length > 0 && !currentSessionId) {
          setCurrentSessionId(list[0].id)
        }
      } catch (err) {
        console.error('Failed to load sessions:', err)
      }
    }
    loadSessions()
  }, [])

  // Handle URL prompt query parameter
  const initialPromptProcessed = useRef(false)
  useEffect(() => {
    const urlPrompt = searchParams.get('prompt')
    if (urlPrompt && !initialPromptProcessed.current) {
      initialPromptProcessed.current = true
      setInput(urlPrompt)
    }
  }, [searchParams])

  // Current session object and messages
  const currentSession = sessions.find((s) => s.id === currentSessionId)
  const messages = currentSession?.messages || []

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length, isLoading])

  // Close context menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(e.target)) {
        setContextMenuOpen(false)
      }
      // Close session context menu
      if (contextMenuSessionId) {
        setContextMenuSessionId(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [contextMenuSessionId])

  // Create a new chat session
  const handleNewChat = async () => {
    try {
      const title = selectedCourseCode !== 'ALL'
        ? `${selectedCourseCode} — New Chat`
        : 'New Chat'

      const payload = {
        title,
        course_id: currentCourse?.id || null,
        topic_id: selectedTopicId !== 'ALL' ? selectedTopicId : null,
      }

      const response = await api.post('/chat/sessions/', payload)
      const newSession = { ...response.data, messages: [] }
      setSessions((prev) => [newSession, ...prev])
      setCurrentSessionId(newSession.id)
      if (window.innerWidth < 900) setSidebarOpen(false)
    } catch (error) {
      console.error('Failed to create new session:', error)
    }
  }

  // Delete a chat session
  const handleDeleteSession = async (sessionId) => {
    if (!window.confirm('Delete this conversation? This cannot be undone.')) return
    
    try {
      await api.delete(`/chat/sessions/${sessionId}/`)
      setSessions((prev) => prev.filter((s) => s.id !== sessionId))
      if (currentSessionId === sessionId) {
        const remaining = sessions.filter((s) => s.id !== sessionId)
        setCurrentSessionId(remaining.length > 0 ? remaining[0].id : null)
      }
      setContextMenuSessionId(null)
    } catch (error) {
      console.error('Failed to delete session:', error)
      alert('Failed to delete session. Please try again.')
    }
  }

  // Open context menu for session
  const openSessionContextMenu = (e, sessionId) => {
    e.preventDefault()
    e.stopPropagation()
    setContextMenuSessionId(sessionId)
    setContextMenuPosition({ x: e.clientX, y: e.clientY })
  }

  // Handle file uploads (image / text)
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return

    files.forEach((file) => {
      const isImage = file.type.startsWith('image/')
      const reader = new FileReader()

      if (isImage) {
        reader.onload = (event) => {
          setAttachments((prev) => [
            ...prev,
            {
              kind: 'image',
              name: file.name,
              size: file.size,
              dataUrl: event.target.result,
            },
          ])
        }
      } else {
        reader.onload = (event) => {
          setAttachments((prev) => [
            ...prev,
            {
              kind: 'text',
              name: file.name,
              size: file.size,
              text: event.target.result,
            },
          ])
        }
      }
      reader.readAsDataURL(file)
    })

    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  // Send message
  const handleSend = async (messageText) => {
    const content = (typeof messageText === 'string' ? messageText : input).trim()
    if ((!content && attachments.length === 0) || isLoading) return

    let activeSessionId = currentSessionId
    if (!activeSessionId) {
      try {
        const title = content.slice(0, 40) || 'New Chat'
        const sessionRes = await api.post('/chat/sessions/', {
          title,
          course_id: currentCourse?.id || null,
          topic_id: selectedTopicId !== 'ALL' ? selectedTopicId : null,
        })
        activeSessionId = sessionRes.data.id
        const newSession = { ...sessionRes.data, messages: [] }
        setSessions((prev) => [newSession, ...prev])
        setCurrentSessionId(activeSessionId)
        if (window.innerWidth < 900) setSidebarOpen(false)
      } catch (err) {
        console.error('Failed to create session:', err)
        return
      }
    }

    const currentAttachments = [...attachments]
    const userMsg = {
      role: 'user',
      content,
      attachments: currentAttachments,
      created_at: new Date().toISOString(),
    }

    // Optimistically update session
    setSessions((prev) =>
      prev.map((s) =>
        s.id === activeSessionId
          ? { ...s, messages: [...(s.messages || []), userMsg] }
          : s
      )
    )

    setInput('')
    setAttachments([])
    setIsLoading(true)
    setSendButtonState('stop')

    try {
      const response = await api.post(`/chat/sessions/${activeSessionId}/messages/`, {
        content,
        attachments: currentAttachments,
      })

      const assistantMsg = {
        role: 'assistant',
        content: response.data.assistant_message.content,
        model_used: response.data.assistant_message.model_used,
        created_at: new Date().toISOString(),
      }

      setSessions((prev) =>
        prev.map((s) =>
          s.id === activeSessionId
            ? { ...s, messages: [...(s.messages || []), assistantMsg] }
            : s
        )
      )
    } catch (error) {
      console.error('Failed to get response:', error)
      const errorMsg = {
        role: 'assistant',
        content: '**Could not reach the AI Tutor.** Please check your connection or try another prompt.',
        created_at: new Date().toISOString(),
      }
      setSessions((prev) =>
        prev.map((s) =>
          s.id === activeSessionId
            ? { ...s, messages: [...(s.messages || []), errorMsg] }
            : s
        )
      )
    } finally {
      setIsLoading(false)
      setSendButtonState('send')
    }
  }

  // Export current chat to Markdown (moved from topbar)
  const handleExportMarkdown = () => {
    if (!messages.length) return
    let md = `# StudyFlow AI Tutor Session\n**Course:** ${selectedCourseCode}\n**Date:** ${new Date().toLocaleDateString()}\n\n---\n\n`
    messages.forEach((m) => {
      md += `### ${m.role === 'user' ? 'Student' : 'AI Tutor'}\n${m.content}\n\n`
    })
    const blob = new Blob([md], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `studyflow-chat-${Date.now()}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleCopyMessage = (text, idx) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(idx)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  // Get context display text
  const getContextDisplay = () => {
    if (selectedCourseCode === 'ALL') {
      return { title: 'StudyFlow AI', subtitle: '(General)' }
    }
    const courseName = courseDisplayNames[selectedCourseCode] || selectedCourseCode
    if (selectedTopicId !== 'ALL') {
      const topic = courseTopics.find((t) => (t.topic_id || t.id) === selectedTopicId)
      return { title: selectedCourseCode, subtitle: topic?.title || 'Topic' }
    }
    return { title: selectedCourseCode, subtitle: courseName }
  }

  const contextDisplay = getContextDisplay()

  // Compute chat title for the header
  const chatTitle = currentSession?.title || 
    (messages.length > 0 ? messages.find(m => m.role === 'user')?.content?.slice(0, 40) || '' : '') || 'New Chat'

  return (
    <div className="sf-app-body chat-page-body">
      <div className="sf-dashboard-layout">
        {/* ─── Left Collapsible Sidebar ───────────────────────────────────── */}
        <aside
          className={`sf-sidebar ${sidebarOpen ? 'mobile-open' : ''}`}
          id="gpt-sidebar"
          aria-label="Chat history and settings"
        >
          {/* Brand Logo */}
          <a className="chat-brand" href="/" onClick={() => setSidebarOpen(false)}>
            <img src="/icons/logo.png" alt="StudyFlow Logo" className="sf-brand-logo" />
            <span><strong>Study</strong><span>Flow</span></span>
          </a>

          {/* Sidebar Header: New Chat + Close */}
          <div className="sidebar-header">
            <button
              onClick={handleNewChat}
              className="sidebar-new-chat-btn"
              title="Start a fresh conversation"
              aria-label="New chat"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span>New chat</span>
            </button>
            <button
              onClick={() => setSidebarOpen(false)}
              className="sidebar-toggle-btn"
              title="Close sidebar"
              aria-label="Close chat history"
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="9" y1="3" x2="9" y2="21" />
              </svg>
            </button>
          </div>

          {/* Recent Chats Section */}
          <div className="sidebar-conversations-section">
            <div className="sidebar-section-title">Recent Chats</div>
            <div className="conversations-list" id="conversations-list">
              {sessions.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-500">
                  No previous conversations.
                </div>
              ) : (
                sessions.map((sess) => {
                  const isActive = sess.id === currentSessionId
                  const isContextMenuOpen = contextMenuSessionId === sess.id
                  return (
                    <div
                      key={sess.id}
                      onClick={() => {
                        setCurrentSessionId(sess.id)
                        if (window.innerWidth < 1024) setSidebarOpen(false)
                      }}
                      onContextMenu={(e) => openSessionContextMenu(e, sess.id)}
                      className={`conversation-item ${isActive ? 'active' : ''} ${isContextMenuOpen ? 'context-open' : ''}`}
                    >
                      <MessageSquare size={14} className={isActive ? 'text-cyan-400' : 'text-slate-500'} />
                      <span className="truncate flex-1 max-w-0">{sess.title || 'Conversation'}</span>
                      <button
                        onClick={(e) => openSessionContextMenu(e, sess.id)}
                        className="session-menu-btn"
                        aria-label="Session options"
                      >
                        <MoreHorizontal size={14} />
                      </button>
                    </div>
                  )
                })
              )}
            </div>
          </div>

          {/* Course Focus Switcher in Sidebar */}
          <div className="sidebar-courses-section">
            <div className="sidebar-section-title">Course Quick Filter</div>
            <div className="sidebar-course-pills" id="sidebar-course-pills">
              {['ALL', 'COS201', 'CSC203', 'CSC215', 'MTH201', 'ENT211', 'CSC299'].map((code) => (
                <button
                  key={code}
                  onClick={() => { setSelectedCourseCode(code); setSelectedTopicId('ALL'); }}
                  className={`sidebar-course-chip ${selectedCourseCode === code ? 'active' : ''}`}
                  data-course={code}
                >
                  {courseEmojis[code]} {code === 'ALL' ? 'All Courses' : courseDisplayNames[code] || code}
                </button>
              ))}
            </div>
          </div>

          {/* Sidebar User Info */}
          <div className="sidebar-user-row">
            <div className="sidebar-avatar">
              {user?.full_name?.charAt(0).toUpperCase() || user?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{user?.full_name || user?.username || 'Student'}</div>
              <div className="sidebar-user-school">Federal University, Gusau</div>
            </div>
          </div>

          {/* Session Context Menu (Delete) */}
          {contextMenuSessionId && (
            <div
              className="session-context-menu"
              style={{ left: contextMenuPosition.x, top: contextMenuPosition.y }}
              ref={contextMenuRef}
            >
              <button
                onClick={() => handleDeleteSession(contextMenuSessionId)}
                className="context-menu-item text-red-400"
              >
                <Trash2 size={14} />
                <span>Delete</span>
              </button>
            </div>
          )}
        </aside>

        {/* ─── Main Chat Stage ────────────────────────────────────────────────── */}
        <main className="gpt-main-stage" id="main-content">
          {/* StudyFlow chat header */}
          <header className="gpt-top-bar">
            <div className="top-bar-left">
              <button
                onClick={() => setSidebarOpen((prev) => !prev)}
                className="top-sidebar-btn"
                id="sidebar-open-btn"
                title="Open sidebar"
                aria-label="Open chat history"
                aria-controls="gpt-sidebar"
                aria-expanded={sidebarOpen}
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="9" y1="3" x2="9" y2="21" />
                </svg>
              </button>

              {/* Prominent Back to Dashboard Button */}
              <NavLink
                to="/"
                className="back-to-dashboard-btn"
                title="Back to Dashboard"
                aria-label="Back to main app"
              >
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                <span>Dashboard</span>
              </NavLink>

              {/* Context Dropdown Pill */}
              <div className="context-pill-dropdown" id="context-pill-dropdown" ref={contextMenuRef}>
                <button
                  onClick={() => setContextMenuOpen((prev) => !prev)}
                  className="model-select-pill"
                  id="model-pill-btn"
                  title="Choose course and topic focus"
                  aria-haspopup="true"
                  aria-expanded={contextMenuOpen}
                  aria-controls="context-menu"
                >
                  <span className="pill-sparkle">✦</span>
                  <span className="pill-title">{contextDisplay.title}</span>
                  <span className="pill-subtitle">({contextDisplay.subtitle})</span>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Context Switcher Dropdown Menu */}
                <div className={`context-menu ${contextMenuOpen ? '' : 'hidden'}`} id="context-menu">
                  <div className="context-menu-header">Select Subject Focus</div>
                  <div className="context-menu-group">
                    <label htmlFor="modal-course-select">Course</label>
                    <select
                      id="modal-course-select"
                      value={selectedCourseCode}
                      onChange={(e) => {
                        setSelectedCourseCode(e.target.value)
                        setSelectedTopicId('ALL')
                      }}
                      className="context-dropdown-select"
                    >
                      <option value="ALL">🌐 General Assistant (All Courses)</option>
                      {courses.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.code}: {c.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  {selectedCourseCode !== 'ALL' && courseTopics.length > 0 && (
                    <div className="context-menu-group">
                      <label htmlFor="modal-topic-select">Topic</label>
                      <select
                        id="modal-topic-select"
                        value={selectedTopicId}
                        onChange={(e) => setSelectedTopicId(e.target.value)}
                        className="context-dropdown-select"
                        disabled={courseTopics.length === 0}
                      >
                        <option value="ALL">📚 Entire Course Workspace</option>
                        {courseTopics.map((t) => (
                          <option key={t.topic_id || t.id} value={t.topic_id || t.id}>
                            {t.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <button onClick={() => setContextMenuOpen(false)} className="context-menu-done">Done</button>
                </div>
              </div>

              {/* Chat Title Display - modern AI app style */}
              <div className="chat-title-display">
                <span className="chat-title-text">{chatTitle}</span>
              </div>
            </div>

            <div className="top-bar-right">
              {/* Quick Search Button - ONLY button in topbar right now */}
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
                className="sf-search-cmd-btn sf-cmd-trigger"
                id="global-search-btn"
                title="Quick Search (Ctrl + K)"
                aria-label="Quick Search"
              >
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Search</span>
                <kbd>Ctrl+K</kbd>
              </button>
            </div>
          </header>

          {/* Messages Container */}
          <div className="gpt-messages-container" id="messages-container">
            <div className="gpt-messages-inner" id="messages-inner">
              {messages.length === 0 ? (
                /* Empty State Hero & Suggestion Cards */
                <div className="gemini-empty-state" id="gemini-empty-state">
                  <div className="gemini-hero-greeting">
                    <h1 className="gemini-gradient-text">
                      What are you studying today?
                    </h1>
                    <p className="gemini-sub-greeting" id="hero-sub-greeting">
                      Where should we start your FUGUS study session today?
                    </p>
                  </div>

                  {/* Empty State Quick Subject Selector - matching vanilla */}
                  <div className="sf-hero-subject-chips" id="hero-subject-chips">
                    {['ALL', 'MTH201', 'CSC203', 'CSC215', 'COS201', 'ENT211'].map((code) => (
                      <button
                        key={code}
                        type="button"
                        className={`sf-hero-chip ${selectedCourseCode === code ? 'active' : ''}`}
                        data-course={code}
                        onClick={() => { setSelectedCourseCode(code); setSelectedTopicId('ALL'); }}
                      >
                        {courseEmojis[code]} {code === 'ALL' ? 'All Subjects' : courseDisplayNames[code] || code}
                      </button>
                    ))}
                  </div>

                  {/* Suggested study prompts */}
                  <div className="gemini-suggestions-grid" id="suggestions-grid">
                    {PRESET_SUGGESTIONS.map((suggestion, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="gemini-suggestion-card"
                        onClick={() => handleSend(suggestion.prompt)}
                        disabled={isLoading}
                      >
                        <div className="card-icon-circle icon-exam" aria-hidden="true">
                          <suggestion.icon size={22} className={suggestion.iconBg} />
                        </div>
                        <div className="card-prompt-text">
                          {suggestion.title}<span>{suggestion.subtitle}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Quick Chips Row */}
                  <div className="gemini-quick-chips" role="list" aria-label="Quick actions">
                    {QUICK_CHIPS.map((chip, idx) => (
                      <button
                        key={idx}
                        className="gemini-chip"
                        onClick={() => handleSend(chip.prompt)}
                        disabled={isLoading}
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Message List */
                <div className="gpt-message-list">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`gpt-message ${msg.role === 'user' ? 'gpt-user-message' : 'gpt-assistant-message'}`}
                    >
                      <div className="gpt-bubble">
                        <MarkdownRenderer content={msg.content} />
                      </div>
                      <div className="gpt-meta">
                        {msg.role === 'user' ? 'You' : 'AI Tutor'}
                        <span className="gpt-timestamp">
                          {new Date(msg.created_at).toLocaleTimeString([], { hour: 'numeric', minute: '2' })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Input Composer */}
          <div className="gpt-input-dock">
            <div className="gpt-input-capsule-wrapper">
              {/* Quick Prompt Pills Bar */}
              <div className="sf-quick-prompt-chips" id="sf-quick-prompt-chips">
                <button
                  type="button"
                  className="sf-quick-chip"
                  onClick={() => handleSend('Generate 5 exam practice questions for this subject.')}
                  disabled={isLoading}
                >
                  <span>📝 5 Exam Questions</span>
                </button>
                <button
                  type="button"
                  className="sf-quick-chip"
                  onClick={() => handleSend('Explain this concept step-by-step from first principles.')}
                  disabled={isLoading}
                >
                  <span>🧠 Explain Simply</span>
                </button>
                <button
                  type="button"
                  className="sf-quick-chip"
                  onClick={() => handleSend('Create 5 question-answer flashcard pairs for quick revision.')}
                  disabled={isLoading}
                >
                  <span>⚡ Flashcards</span>
                </button>
                <button
                  type="button"
                  className="sf-quick-chip"
                  onClick={() => handleSend('List all key mathematical formulas and definitions for this topic.')}
                  disabled={isLoading}
                >
                  <span>📐 Formula Sheet</span>
                </button>
                <button
                  type="button"
                  className="sf-quick-chip"
                  onClick={() => handleSend('Give me a Nigerian real-world application of this concept.')}
                  disabled={isLoading}
                >
                  <span>🇳🇬 Local Example</span>
                </button>
              </div>

              <div className="gpt-input-capsule" id="input-capsule">
                {/* Quick tool prompt button */}
                <button
                  className="capsule-tool-btn"
                  id="capsule-tool-btn"
                  title="Quick actions & file upload"
                  aria-label="Quick actions"
                  aria-expanded="false"
                  aria-controls="quick-tools-menu"
                >
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <input
                  type="file"
                  id="chat-file-input"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*,.pdf,.txt,.md,.json"
                  style={{ display: 'none' }}
                  disabled={isLoading}
                />

                <textarea
                  ref={inputCapsuleRef}
                  id="gpt-chat-textarea"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSend()
                    }
                  }}
                  placeholder={isLoading ? 'AI Tutor is thinking...' : 'Ask a question, paste notes, or work through an exam problem...'}
                  rows={1}
                  className="gpt-textarea"
                  disabled={isLoading}
                  aria-label="Chat input"
                />

                {/* Morphing Circular Send / Stop Button */}
                <button
                  type="button"
                  onClick={() => {
                    if (sendButtonState === 'send') handleSend()
                    else {
                      setIsLoading(false)
                      setSendButtonState('send')
                    }
                  }}
                  className={`gpt-send-btn ${sendButtonState === 'stop' ? 'stop' : ''}`}
                  disabled={(!input.trim() && attachments.length === 0) || isLoading}
                  aria-label={sendButtonState === 'stop' ? 'Stop generating' : 'Send message'}
                >
                  {sendButtonState === 'stop' ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                  ) : (
                    <Send size={20} />
                  )}
                </button>
              </div>

              <div className={`attachment-tray ${attachments.length > 0 ? '' : 'hidden'}`} id="attachment-tray">
                {attachments.map((att, idx) => (
                  <div key={idx} className="gpt-attachment-chip">
                    <span>{att.name}</span>
                    <button
                      type="button"
                      onClick={() => setAttachments((prev) => prev.filter((_, i) => i !== idx))}
                      className="gpt-attachment-remove"
                      aria-label="Remove attachment"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <div className={`quick-tools-menu ${contextMenuOpen ? '' : 'hidden'}`} id="quick-tools-menu">
                <button
                  type="button"
                  className="quick-tool-item"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Attach image or note file
                </button>
                <button
                  type="button"
                  className="quick-tool-item"
                  onClick={() => handleSend('Explain this topic with a simple example, then give me a short practice task.')}
                >
                  Explain + practice
                </button>
                <button
                  type="button"
                  className="quick-tool-item"
                  onClick={() => handleSend('Quiz me with 5 exam-style questions. Hide the answers until after the questions.')}
                >
                  Quiz me
                </button>
                <button
                  type="button"
                  className="quick-tool-item"
                  onClick={() => handleSend('Turn this into concise flashcards with question and answer pairs.')}
                >
                  Make flashcards
                </button>
                <button
                  type="button"
                  className="quick-tool-item"
                  onClick={() => handleSend('Summarize the key points and list common exam traps.')}
                >
                  Summarize
                </button>
              </div>

              <div className="gpt-disclaimer">
                StudyFlow AI tutor for Federal University, Gusau (FUGUS) ·
                Verify important exam formulas against course syllabi.
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Chat;