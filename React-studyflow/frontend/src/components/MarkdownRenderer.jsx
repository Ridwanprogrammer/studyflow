import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import { createPortal } from 'react-dom'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { Copy, Check } from './ui/Icons'
import 'katex/dist/katex.min.css'

function normalizeWikiText(content = '', glossaryTerms = []) {
  const termsBySlug = new Map(glossaryTerms.map((term) => [term.slug, term]))

  function parseText(text, createLinks) {
  let result = ''
  let index = 0

  while (index < text.length) {
    if (text.slice(index, index + 2) !== '[[') {
      result += text[index]
      index += 1
      continue
    }

    let depth = 1
    let cursor = index + 2
    let separator = -1

    while (cursor < text.length && depth > 0) {
      if (text.slice(cursor, cursor + 2) === '[[') {
        depth += 1
        cursor += 2
      } else if (text.slice(cursor, cursor + 2) === ']]') {
        depth -= 1
        cursor += 2
      } else {
        if (depth === 1 && text[cursor] === '|' && separator === -1) {
          separator = cursor
        }
        cursor += 1
      }
    }

    if (depth !== 0) {
      result += text[index]
      index += 1
      continue
    }

    const labelStart = separator === -1 ? index + 2 : separator + 1
    const rawLabel = text.slice(labelStart, cursor - 2)
    const rawTarget = text.slice(index + 2, separator === -1 ? cursor - 2 : separator)
    const target = parseText(rawTarget, false).trim().toLowerCase().replace(/\s+/g, '-')
    const term = termsBySlug.get(target)
    const label = separator === -1
      ? term?.term || parseText(rawLabel, false).replace(/-/g, ' ')
      : parseText(rawLabel, false)

    if (createLinks && term && target !== 'this') {
      result += `[${label.replace(/([\\[\]])/g, '\\$1')}](/__glossary_term__/${encodeURIComponent(term.slug)})`
    } else {
      result += label
    }

    index = cursor
  }

  return result
  }

  return parseText(content, true)
}

function getCodeText(node) {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(getCodeText).join('')
  return getCodeText(node?.props?.children)
}

function GlossaryTermPopover({ term, children, glossaryContext }) {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState(null)
  const triggerRef = useRef(null)
  const popoverRef = useRef(null)

  const updatePosition = () => {
    const trigger = triggerRef.current
    if (!trigger) return

    const bounds = trigger.getBoundingClientRect()
    const width = Math.min(340, window.innerWidth - 32)
    const popoverHeight = popoverRef.current?.offsetHeight || 180
    const left = Math.max(
      16,
      Math.min(bounds.left + bounds.width / 2 - width / 2, window.innerWidth - width - 16),
    )
    let top = bounds.bottom + 8
    if (top + popoverHeight > window.innerHeight - 8) {
      top = bounds.top - popoverHeight - 8
    }

    setPosition({ top: Math.max(8, top), left, width })
  }

  useEffect(() => {
    if (!isOpen) return undefined

    const handlePointerDown = (event) => {
      if (
        !triggerRef.current?.contains(event.target) &&
        !popoverRef.current?.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }
    const handleViewportChange = () => updatePosition()

    updatePosition()
    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleViewportChange)
    window.addEventListener('scroll', handleViewportChange, true)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleViewportChange)
      window.removeEventListener('scroll', handleViewportChange, true)
    }
  }, [isOpen])

  const glossaryParams = new URLSearchParams({ term: term.slug })
  if (glossaryContext?.originTopic) {
    glossaryParams.set('originTopic', glossaryContext.originTopic)
  }
  if (glossaryContext?.originCourse) {
    glossaryParams.set('originCourse', glossaryContext.originCourse)
  }
  if (glossaryContext?.originTopicId) {
    glossaryParams.set('originTopicId', glossaryContext.originTopicId)
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="sf-glossary-term-trigger"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        {children}
      </button>
      {isOpen && createPortal(
        <div
          ref={popoverRef}
          className="sf-glossary-term-popover"
          role="dialog"
          aria-label={`${term.term} quick definition`}
          style={{
            top: position?.top ?? 8,
            left: position?.left ?? 16,
            width: position?.width ?? 'min(340px, calc(100vw - 32px))',
          }}
        >
          <div className="sf-glossary-term-popover-header">
            <span className="sf-glossary-term-discipline">
              {term.discipline?.name || term.discipline || 'Glossary'}
            </span>
            <button
              type="button"
              className="sf-glossary-term-close"
              aria-label={`Close ${term.term} definition`}
              onClick={() => {
                setIsOpen(false)
                triggerRef.current?.focus()
              }}
            >
              ×
            </button>
          </div>
          <h3 className="sf-glossary-term-title">{term.term}</h3>
          <span className="sf-glossary-term-label">Brief definition</span>
          <p className="sf-glossary-term-definition">
            {term.short_definition || term.full_definition || 'No definition is available yet.'}
          </p>
          <div className="sf-glossary-term-actions">
            <Link
              to={`/glossary?${glossaryParams.toString()}`}
              className="sf-glossary-term-more"
              onClick={() => setIsOpen(false)}
            >
              See more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}

function CodeBlock({ children }) {
  const [copied, setCopied] = useState(false)
  const code = getCodeText(children)
  const className = children?.props?.className || ''
  const lang = className?.replace('language-', '') || ''

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="sf-math-block-wrap my-4 rounded-xl border border-white/10 overflow-hidden bg-slate-950/80 shadow-md">
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-white/5 border-b border-white/10">
        <span className="text-[11px] font-mono font-medium text-slate-400 uppercase tracking-wider">{lang || 'code'}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-semibold text-slate-400 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 transition-all cursor-pointer"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check size={12} className="text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm text-slate-200 font-mono leading-relaxed">
        <code className={`language-${lang}`}>{code}</code>
      </pre>
    </div>
  )
}

function createMarkdownComponents(glossaryTerms, glossaryContext) {
  const termsBySlug = new Map(glossaryTerms.map((term) => [term.slug, term]))

  return {
  pre: CodeBlock,
  code: ({ children, className }) => (
    <code className={`sf-inline-code ${className || ''}`.trim()}>{children}</code>
  ),
  h1: ({ children }) => <h1 className="sf-md-h1">{children}</h1>,
  h2: ({ children }) => <h2 className="sf-md-h2">{children}</h2>,
  h3: ({ children }) => <h3 className="sf-md-h3">{children}</h3>,
  p: ({ children }) => <p className="sf-md-p">{children}</p>,
  ul: ({ children }) => <ul className="sf-md-ul">{children}</ul>,
  ol: ({ children }) => <ol className="sf-md-ol">{children}</ol>,
  blockquote: ({ children }) => <blockquote className="sf-md-blockquote">{children}</blockquote>,
  a: ({ href, children }) => {
    const glossaryMatch = href?.match(/^\/__glossary_term__\/([^/?#]+)/)
    if (glossaryMatch) {
      const term = termsBySlug.get(decodeURIComponent(glossaryMatch[1]))
      return term
        ? <GlossaryTermPopover term={term} glossaryContext={glossaryContext}>{children}</GlossaryTermPopover>
        : <>{children}</>
    }
    return href?.startsWith('/')
      ? <Link to={href} className="sf-md-link">{children}</Link>
      : <a href={href} className="sf-md-link" target="_blank" rel="noopener noreferrer">{children}</a>
  },
  strong: ({ children }) => <strong className="sf-md-strong">{children}</strong>,
  }
}

function removeGlossaryIndex(content) {
  const lines = content.split(/\r?\n/)
  const sectionStart = lines.findIndex((line) =>
    /^#{1,6}\s+Glossary Terms Used in This Topic\s*$/i.test(line),
  )

  if (sectionStart === -1) return content

  const nextSection = lines.findIndex(
    (line, index) => index > sectionStart && /^#{1,6}\s+/.test(line),
  )
  const sectionEnd = nextSection === -1 ? lines.length : nextSection
  lines.splice(sectionStart, sectionEnd - sectionStart)
  return lines.join('\n')
}

/**
 * Shared Markdown renderer component.
 * Eliminates duplication across Topic, Chat, and Glossary pages.
 */
export function MarkdownRenderer({
  content,
  className = 'sf-markdown-body',
  glossaryTerms = [],
  glossaryContext,
}) {
  if (!content) return null

  const normalizedContent = normalizeWikiText(content, glossaryTerms)
  const safeContent = removeGlossaryIndex(normalizedContent)

  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={createMarkdownComponents(glossaryTerms, glossaryContext)}
      >
        {safeContent}
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownRenderer