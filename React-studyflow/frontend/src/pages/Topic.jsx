import { useParams, NavLink } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useState, useEffect, useRef } from 'react'
import { api, unwrapList } from '../lib/api'
import { MarkdownRenderer } from '../components/MarkdownRenderer'
import { TopicModeNav } from '../components/TopicModeNav'
import { ChevronLeft, Clock, Search, Bot, Sparkles, Sparkle, BookOpen, X, Download } from '../components/ui/Icons'

export function Topic() {
  const { courseId, topicId } = useParams()
  const [fontSize, setFontSize] = useState(16)
  const [showOutline, setShowOutline] = useState(() => window.matchMedia('(min-width: 1024px)').matches)
  const [readingProgress, setReadingProgress] = useState(0)
  
  const contentRef = useRef(null)

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
      <TopicModeNav courseId={courseId} topicId={topicId} mode="notes" />
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
              <NavLink to={`/courses/${courseId}/topics/${topicId}/learn`}>
                <BookOpen size={16} />
                <span>Continue Learn session</span>
              </NavLink>
            </footer>
          </article>
        </div>
      </div>

    </>
  )
}

export default Topic
