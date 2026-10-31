import { useState, useMemo, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { api, unwrapList } from '../lib/api'
import { MarkdownRenderer } from '../components/MarkdownRenderer'
import { 
  Sparkles, Search, X, ChevronLeft, Copy, Globe,
  BookOpen, CheckCircle, AlertTriangle, Info, HelpCircle,
  Star, Bot, ArrowRight, ChevronRight, Volume2, Share2
} from '../components/ui/Icons'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export function Glossary() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDiscipline, setSelectedDiscipline] = useState('all')
  const [selectedLetter, setSelectedLetter] = useState('')
  const [sortOrder, setSortOrder] = useState('az')
  const [selectedTerm, setSelectedTerm] = useState(null)
  const [mobileView, setMobileView] = useState('list')
  const [copiedLatex, setCopiedLatex] = useState(false)
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('sf_bookmarked_terms') || '[]')
    } catch {
      return []
    }
  })
  const [playingTermId, setPlayingTermId] = useState(null)

  // Check URL params for direct term lookup or return to topic
  const originTopic = searchParams.get('originTopic')
  const originCourse = searchParams.get('originCourse')
  const directTermSlug = searchParams.get('term')

  const { data: terms = [], isLoading: termsLoading } = useQuery({
    queryKey: ['glossary-all'],
    queryFn: async () => {
      const response = await api.get('/glossary/?page_size=200')
      return unwrapList(response.data)
    },
  })

  const { data: disciplines = [] } = useQuery({
    queryKey: ['glossary-disciplines'],
    queryFn: async () => {
      const response = await api.get('/courses/disciplines/')
      return unwrapList(response.data)
    },
  })

  // Select term from URL param or default to first term
  useEffect(() => {
    if (terms.length > 0 && !selectedTerm) {
      if (directTermSlug) {
        const found = terms.find(
          (t) =>
            t.slug === directTermSlug ||
            t.term.toLowerCase() === directTermSlug.toLowerCase()
        )
        if (found) {
          setSelectedTerm(found)
          return
        }
      }
      setSelectedTerm(terms[0])
    }
  }, [terms, directTermSlug, selectedTerm])

  const toggleBookmark = (termId) => {
    setBookmarkedIds((prev) => {
      const next = prev.includes(termId)
        ? prev.filter((id) => id !== termId)
        : [...prev, termId]
      localStorage.setItem('sf_bookmarked_terms', JSON.stringify(next))
      return next
    })
  }

  // Filter & sort terms
  const filteredTerms = useMemo(() => {
    return terms
      .filter((term) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase()
          const matchesTerm = term.term.toLowerCase().includes(q)
          const matchesShort = term.short_definition?.toLowerCase().includes(q)
          const matchesFull = term.full_definition?.toLowerCase().includes(q)
          if (!matchesTerm && !matchesShort && !matchesFull) return false
        }

        // Discipline or Bookmarks
        if (selectedDiscipline === 'starred') {
          if (!bookmarkedIds.includes(term.id)) return false
        } else if (selectedDiscipline !== 'all') {
          const termDisc = (term.discipline?.slug || term.discipline?.name || term.discipline || '').toLowerCase()
          if (termDisc !== selectedDiscipline.toLowerCase()) return false
        }

        // Letter filter
        if (selectedLetter) {
          if (!term.term.toUpperCase().startsWith(selectedLetter)) return false
        }

        return true
      })
      .sort((a, b) => {
        if (sortOrder === 'az') return a.term.localeCompare(b.term)
        if (sortOrder === 'za') return b.term.localeCompare(a.term)
        if (sortOrder === 'discipline') {
          const discA = a.discipline?.name || a.discipline || ''
          const discB = b.discipline?.name || b.discipline || ''
          return discA.localeCompare(discB) || a.term.localeCompare(b.term)
        }
        return 0
      })
  }, [terms, searchQuery, selectedDiscipline, selectedLetter, sortOrder, bookmarkedIds])

  // Count by discipline
  const disciplineCounts = useMemo(() => {
    const counts = { all: terms.length, starred: bookmarkedIds.length }
    terms.forEach((t) => {
      const disc = (t.discipline?.slug || t.discipline?.name || t.discipline || '').toLowerCase()
      if (disc) {
        counts[disc] = (counts[disc] || 0) + 1
      }
    })
    return counts
  }, [terms, bookmarkedIds])

  const handleCopyLatex = (latex) => {
    if (!latex) return
    navigator.clipboard.writeText(latex)
    setCopiedLatex(true)
    setTimeout(() => setCopiedLatex(false), 2000)
  }

  const handleAskAI = (term) => {
    const prompt = `Explain the university concept "${term.term}" in detail with real-world analogies, Nigerian context examples, and exam problems.`
    navigate(`/chat?prompt=${encodeURIComponent(prompt)}`)
  }

  const handlePlayDefinition = (term) => {
    if (playingTermId === term.id) {
      setPlayingTermId(null)
      return
    }
    setPlayingTermId(term.id)
    const utterance = new SpeechSynthesisUtterance(`${term.term}. ${term.short_definition || term.full_definition}`)
    utterance.rate = 0.9
    utterance.onend = () => setPlayingTermId(null)
    speechSynthesis.speak(utterance)
  }

  const handleCopyLink = (term) => {
    const url = `${window.location.origin}/glossary?term=${term.slug || term.term.toLowerCase()}`
    navigator.clipboard.writeText(url)
  }

  if (termsLoading) {
    return (
      <div className="sf-glossary-controls-card animate-pulse">
        <div className="h-12 bg-white/5 rounded-xl mb-4" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[600px]">
          <div className="lg:col-span-4 glass-panel rounded-2xl animate-pulse" />
          <div className="lg:col-span-8 glass-panel rounded-2xl animate-pulse" />
        </div>
      </div>
    )
  }

  return (
    <div className="glossary-page">
      {/* Origin Return Banner (if user navigated from a topic) */}
      {originTopic && (
        <div className="sf-origin-return-bar">
          <div className="sf-origin-info">
            <span className="sf-origin-dot" aria-hidden="true"></span>
            <span>Origin: <strong id="sf-origin-topic-name">{originTopic}</strong></span>
          </div>
          <button 
            id="sf-return-to-topic-btn" 
            className="sf-return-topic-btn secondary-return"
            title="Return to origin lesson (Esc)"
            onClick={() => navigate(originCourse ? `/courses/${originCourse}` : -1)}
          >
            <ChevronLeft size={15} />
            <span>Return to topic</span>
            <kbd className="sf-key-hint">Esc</kbd>
          </button>
        </div>
      )}

      {/* Glossary Workspace Layout */}
      <div className="sf-glossary-workspace">
        {/* Search & Filter Control Panel */}
        <div className="sf-glossary-controls-card">
          {/* Search row */}
          <div className="sf-glossary-search-row">
            <div className="sf-search-input-wrap">
              <svg className="sf-search-icon" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                id="sf-glossary-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search concepts (e.g. domain, derivative, velocity, recursion, molarity)..."
                aria-label="Search glossary terms"
                autocomplete="off"
              />
              <kbd className="sf-search-shortcut-hint" id="sf-search-hint" title="Press / to focus">/</kbd>
              {searchQuery && (
                <button 
                  id="sf-glossary-clear-search" 
                  className="sf-clear-btn"
                  onClick={() => setSearchQuery('')}
                  title="Clear search (Esc)" 
                  aria-label="Clear search"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Filter Pills (Disciplines + Starred) - matching vanilla design */}
          <div className="sf-glossary-filter-toolbar">
            <div className="sf-discipline-pills" id="sf-discipline-pills" role="tablist" aria-label="Discipline filter">
              <button
                onClick={() => { setSelectedDiscipline('all'); setSelectedLetter('') }}
                className={`sf-pill ${selectedDiscipline === 'all' ? 'active' : ''}`}
                role="tab"
                aria-selected={selectedDiscipline === 'all'}
              >
                <span className="sf-pill-dot dot-all"></span>
                <span>All Disciplines</span>
                <span className="sf-pill-count" id="count-all">{disciplineCounts.all || terms.length}</span>
              </button>
              {disciplines.map((d) => {
                const slug = (d.slug || d.name || '').toLowerCase()
                const count = disciplineCounts[slug] || 0
                return (
                  <button
                    key={d.id}
                    onClick={() => { setSelectedDiscipline(slug); setSelectedLetter('') }}
                    className={`sf-pill ${selectedDiscipline === slug ? 'active' : ''}`}
                    role="tab"
                    aria-selected={selectedDiscipline === slug}
                  >
                    <span className={`sf-pill-dot dot-${slug}`}></span>
                    <span>{d.name}</span>
                    <span className="sf-pill-count" id={`count-${slug}`}>{count}</span>
                  </button>
                )
              })}
              <button
                onClick={() => { setSelectedDiscipline('starred'); setSelectedLetter('') }}
                className={`sf-pill sf-pill-starred ${selectedDiscipline === 'starred' ? 'active' : ''}`}
                role="tab"
                aria-selected={selectedDiscipline === 'starred'}
                title="View your bookmarked terms"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span>Bookmarks</span>
                <span className="sf-pill-count" id="count-starred">{bookmarkedIds.length}</span>
              </button>
            </div>

            {/* Quick Sort Dropdown */}
            <div className="sf-glossary-sort-wrap">
              <label htmlFor="sf-sort-select" className="sf-sort-label">Sort:</label>
              <select
                id="sf-sort-select"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="sf-sort-select"
                aria-label="Sort terms"
              >
                <option value="az">A → Z</option>
                <option value="za">Z → A</option>
                <option value="discipline">By Discipline</option>
              </select>
            </div>
          </div>

          {/* Alphabetical A-Z Scrubber Bar - matching vanilla */}
          <div className="sf-az-scrubber-bar" id="sf-az-scrubber" aria-label="Alphabetical jump bar">
            <button
              onClick={() => setSelectedLetter('')}
              className={`sf-az-btn ${!selectedLetter ? 'active' : ''}`}
            >
              All
            </button>
            {ALPHABET.map((letter) => {
              const hasTerms = terms.some((t) => t.term.toUpperCase().startsWith(letter))
              const isActive = selectedLetter === letter
              return (
                <button
                  key={letter}
                  disabled={!hasTerms}
                  onClick={() => setSelectedLetter(isActive ? '' : letter)}
                  className={`sf-az-btn ${isActive ? 'active' : ''} ${!hasTerms ? 'disabled' : ''}`}
                >
                  {letter}
                </button>
              )
            })}
          </div>
        </div>

        {/* Master-Detail Split Grid */}
        <div 
          className={`sf-glossary-grid ${mobileView === 'detail' ? 'sf-mobile-view-detail' : ''}`}
          id="sf-glossary-grid"
        >
          {/* Left Column: Term List */}
          <div className="sf-glossary-list-panel" id="sf-glossary-list-panel">
            <div className="sf-list-header">
              <div className="sf-list-stats">
                <span className="sf-stats-indicator" aria-hidden="true"></span>
                <span id="sf-terms-count">Showing {filteredTerms.length} terms</span>
              </div>
              <div className="sf-list-keyboard-hint">
                <kbd>↑</kbd><kbd>↓</kbd> navigate
              </div>
            </div>
            <div className="sf-terms-scroll-list" id="sf-terms-list" role="listbox" aria-label="Glossary term list">
              {filteredTerms.length === 0 ? (
                <div className="sf-no-terms">
                  <Globe size={40} className="sf-no-terms-icon" />
                  <h4>No concepts found</h4>
                  <p>Try adjusting your search query or discipline filter.</p>
                  <button 
                    className="sf-clear-filters-btn"
                    onClick={() => { setSearchQuery(''); setSelectedDiscipline('all'); setSelectedLetter('') }}
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                filteredTerms.map((term) => {
                  const isSelected = selectedTerm?.id === term.id
                  const isStarred = bookmarkedIds.includes(term.id)
                  const discName = term.discipline?.name || term.discipline || ''
                  const discSlug = (discName || '').toLowerCase()
                  return (
                    <div
                      key={term.id}
                      onClick={() => {
                        setSelectedTerm(term)
                        setMobileView('detail')
                      }}
                      className={`sf-term-card ${isSelected ? 'selected' : ''}`}
                      data-discipline={discName}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <div className="sf-term-card-header">
                        <div className="sf-term-card-name">{term.term}</div>
                        <div className="sf-term-card-badges">
                          {discName && (
                            <span className={`sf-term-disc-tag disc-${discSlug}`}>{discName}</span>
                          )}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleBookmark(term.id)
                            }}
                            className={`sf-card-star-btn ${isStarred ? 'starred' : ''}`}
                            aria-label={isStarred ? 'Remove bookmark' : 'Bookmark term'}
                          >
                            <Star size={14} className={isStarred ? 'fill-current' : ''} />
                          </button>
                        </div>
                      </div>
                      {term.short_definition && (
                        <p className="sf-term-card-sub">{term.short_definition}</p>
                      )}
                      <div className="sf-term-card-footer">
                        <span className="sf-term-card-category">{term.category || 'General'}</span>
                        <span className="sf-term-card-arrow">
                          <ChevronRight size={16} />
                        </span>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>

          {/* Right Column: Detailed View - matching vanilla design */}
          <div className="sf-glossary-detail-panel" id="sf-term-detail-panel">
            {/* Mobile Back to List Button (visible on mobile viewport) */}
            <div className="sf-mobile-back-bar" id="sf-mobile-back-bar">
              <button type="button" id="sf-mobile-back-btn" className="sf-mobile-back-btn" onClick={() => setMobileView('list')}>
                <ChevronLeft size={16} />
                <span>Back to terms list</span>
              </button>
            </div>

            {/* Empty state placeholder */}
            {!selectedTerm && (
              <div className="sf-detail-placeholder" id="sf-detail-empty">
                <div className="sf-empty-icon-wrap">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477 4.5 1.253" />
                  </svg>
                </div>
                <h3>Select a term to view definition</h3>
                <p>Click any concept on the left, use arrow keys, or search to inspect formal mathematical statements, worked examples, and related topics.</p>
              </div>
            )}

            {/* Term Detail Content */}
            {selectedTerm && (
              <div className="sf-detail-content" id="sf-detail-body">
                {/* Breadcrumbs & Navigation Trail - matching vanilla */}
                <div className="sf-detail-breadcrumbs" id="sf-detail-breadcrumbs">
                  <span className="sf-crumb-root">Glossary</span>
                  <span className="sf-crumb-sep">/</span>
                  <span className="sf-crumb-disc">{selectedTerm.discipline?.name || selectedTerm.discipline || 'General'}</span>
                  <span className="sf-crumb-sep">/</span>
                  <span className="sf-crumb-cat">{selectedTerm.category || 'General'}</span>
                </div>

                {/* Header block */}
                <div className="sf-detail-header">
                  <div className="sf-detail-header-left">
                    <div className="sf-detail-tags">
                      {selectedTerm.discipline && (
                        <span className={`sf-discipline-badge disc-${(selectedTerm.discipline?.name || '').toLowerCase()}`}>
                          {selectedTerm.discipline?.name || selectedTerm.discipline}
                        </span>
                      )}
                      {selectedTerm.category && (
                        <span className="sf-category-tag">{selectedTerm.category}</span>
                      )}
                    </div>
                    <h2 className="sf-detail-title" id="sf-detail-title">{selectedTerm.term}</h2>
                  </div>

                  {/* Action Toolbar - matching vanilla */}
                  <div className="sf-detail-toolbar">
                    {/* Bookmark/Star button */}
                    <button
                      type="button"
                      id="sf-bookmark-term-btn"
                      className={`sf-tool-btn ${bookmarkedIds.includes(selectedTerm.id) ? 'starred' : ''}`}
                      title="Bookmark this term for exam review"
                      aria-label="Bookmark term"
                      onClick={() => toggleBookmark(selectedTerm.id)}
                    >
                      <svg className="sf-star-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span id="sf-bookmark-btn-label">{bookmarkedIds.includes(selectedTerm.id) ? 'Unstar' : 'Star'}</span>
                    </button>

                    {/* Text-to-Speech Listen Button */}
                    <button
                      type="button"
                      id="sf-pronounce-term-btn"
                      className={`sf-tool-btn ${playingTermId === selectedTerm.id ? 'playing' : ''}`}
                      title="Listen to definition"
                      aria-label="Listen to definition"
                      onClick={() => handlePlayDefinition(selectedTerm)}
                    >
                      <svg className="sf-audio-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M11 5L6 9H2v6h4l5 4V5z" />
                      </svg>
                      <span id="sf-audio-btn-label">{playingTermId === selectedTerm.id ? 'Stop' : 'Listen'}</span>
                    </button>

                    {/* Copy definition */}
                    <button
                      type="button"
                      id="sf-copy-term-btn"
                      className="sf-tool-btn"
                      title="Copy definition to clipboard"
                      aria-label="Copy definition"
                      onClick={() => {
                        const text = `${selectedTerm.term}: ${selectedTerm.short_definition || selectedTerm.full_definition}`
                        navigator.clipboard.writeText(text)
                      }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                      </svg>
                      <span>Copy</span>
                    </button>

                    {/* Share / Copy Link */}
                    <button
                      type="button"
                      id="sf-share-term-btn"
                      className="sf-tool-btn"
                      title="Copy link to this term"
                      aria-label="Copy link"
                      onClick={() => handleCopyLink(selectedTerm)}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      <span>Share</span>
                    </button>

                    {/* Ask AI Tutor */}
                    <button
                      type="button"
                      id="sf-ai-explain-term-btn"
                      className="sf-tool-btn sf-tool-ai"
                      title="Ask AI Tutor to break down this term"
                      onClick={() => handleAskAI(selectedTerm)}
                    >
                      <span className="sf-sparkle">✦</span>
                      <span>Ask AI</span>
                    </button>
                  </div>
                </div>

                {/* Brief Summary */}
                <div className="sf-detail-section sf-short-def-box">
                  <div className="sf-section-label">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Brief Summary</span>
                  </div>
                  <p id="sf-detail-short-def">{selectedTerm.short_definition || 'No summary available.'}</p>
                  {selectedTerm.prerequisites && (
                    <p className="sf-prerequisites-note mt-2 text-xs text-slate-500">
                      <strong>Prerequisites:</strong> {selectedTerm.prerequisites}
                    </p>
                  )}
                </div>

                {/* Full Explanation */}
                <div className="sf-detail-section sf-explanation-section">
                  <div className="sf-section-label">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                    <span>In-Depth Explanation</span>
                  </div>
                  <div id="sf-detail-full-def" className="sf-markdown-body">
                    <MarkdownRenderer content={selectedTerm.full_definition || selectedTerm.short_definition || ''} />
                  </div>
                </div>

                {/* Formal Definition (KaTeX with copy formula button) - matching vanilla */}
                {selectedTerm.latex_formula && (
                  <div className="sf-detail-section sf-formal-box" id="sf-formal-wrapper">
                    <div className="sf-formal-header">
                      <div className="sf-section-label">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <span>Formal Mathematical Statement</span>
                      </div>
                      <button
                        type="button"
                        id="sf-copy-latex-btn"
                        className="sf-copy-latex-btn"
                        title="Copy raw LaTeX formula"
                        onClick={() => handleCopyLatex(selectedTerm.latex_formula)}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                        </svg>
                        <span>{copiedLatex ? 'Copied!' : 'Copy LaTeX'}</span>
                      </button>
                    </div>
                    <div id="sf-detail-formal" className="sf-math-display-box">
                      {selectedTerm.latex_formula && (
                        <span data-katex>{selectedTerm.latex_formula}</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Worked Examples - matching vanilla */}
                {selectedTerm.worked_examples && selectedTerm.worked_examples.length > 0 && (
                  <div className="sf-detail-section" id="sf-examples-wrapper">
                    <div className="sf-section-label">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Worked Examples</span>
                    </div>
                    <ul id="sf-detail-examples" className="sf-examples-list">
                      {selectedTerm.worked_examples.map((ex, i) => (
                        <li key={`${i}-${ex}`}>{ex}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Related Terms - matching vanilla */}
                {selectedTerm.related_terms && selectedTerm.related_terms.length > 0 && (
                  <div className="sf-detail-section">
                    <div className="sf-related-header">
                      <div className="sf-section-label">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        <span>Related Terminology</span>
                      </div>
                      <div className="sf-term-nav-trail" id="sf-term-nav-trail">
                        <button 
                          type="button" 
                          id="sf-prev-term-btn" 
                          className="sf-crumb-nav-btn" 
                          title="Go back to previously viewed term" 
                          disabled
                        >
                          ← Back
                        </button>
                      </div>
                    </div>
                    <div id="sf-detail-related" className="sf-related-chips">
                      {selectedTerm.related_terms.map((relatedTerm) => (
                        <button
                          key={relatedTerm}
                          className="sf-related-chip"
                          onClick={() => {
                            const found = terms.find(t => t.term.toLowerCase() === relatedTerm.toLowerCase())
                            if (found) {
                              setSelectedTerm(found)
                              setMobileView('detail')
                            }
                          }}
                        >
                          <span>{relatedTerm}</span>
                          <ChevronRight size={16} className="sf-chip-arrow" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Return to topic action footer */}
                {originTopic && (
                  <div className="sf-detail-footer-action" id="sf-detail-return-footer">
                    <button className="sf-return-topic-btn secondary-return" id="sf-return-footer-btn" onClick={() => navigate(originCourse ? `/courses/${originCourse}` : -1)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                      <span>Return to topic</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Glossary