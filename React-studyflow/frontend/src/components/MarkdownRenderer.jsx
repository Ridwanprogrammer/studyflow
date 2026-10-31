import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { Copy, Check } from './ui/Icons'
import 'katex/dist/katex.min.css'

function CodeBlock({ children, className }) {
  const [copied, setCopied] = useState(false)
  const code = String(children ?? '')
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

const markdownComponents = {
  code: CodeBlock,
  inlineCode: ({ children }) => (
    <code style={{
      background: 'rgba(1, 169, 254, 0.1)',
      color: 'var(--brand-cyan)',
      padding: '0.15em 0.4em',
      borderRadius: '4px',
      fontSize: '0.9em',
      fontFamily: 'monospace',
      border: '1px solid rgba(1, 169, 254, 0.2)',
    }}>
      {children}
    </code>
  ),
  h1: ({ children }) => <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#fff', margin: '2rem 0 1rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(1, 169, 254, 0.1)' }}>{children}</h1>,
  h2: ({ children }) => <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--brand-cyan)', margin: '2rem 0 1rem' }}>{children}</h2>,
  h3: ({ children }) => <h3 style={{ fontSize: '1.25rem', fontWeight: '650', color: '#fff', margin: '1.5rem 0 0.75rem' }}>{children}</h3>,
  p: ({ children }) => <p style={{ margin: '1rem 0', lineHeight: 1.8, color: '#d3dce7' }}>{children}</p>,
  ul: ({ children }) => <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', margin: '1rem 0', lineHeight: 1.8 }}>{children}</ul>,
  ol: ({ children }) => <ol style={{ listStyle: 'decimal', paddingLeft: '1.5rem', margin: '1rem 0', lineHeight: 1.8 }}>{children}</ol>,
  blockquote: ({ children }) => <blockquote style={{ borderLeft: '3px solid var(--brand-cyan)', paddingLeft: '1rem', margin: '1.5rem 0', color: '#94a3b8', fontStyle: 'italic' }}>{children}</blockquote>,
  a: ({ href, children }) => <a href={href} style={{ color: 'var(--brand-cyan)', textDecoration: 'none', borderBottom: '1px dashed var(--brand-cyan)' }} target="_blank" rel="noopener noreferrer">{children}</a>,
  strong: ({ children }) => <strong style={{ color: '#fff' }}>{children}</strong>,
}

/**
 * Shared Markdown renderer component.
 * Eliminates duplication across Topic, Chat, and Glossary pages.
 */
export function MarkdownRenderer({ content, className = '' }) {
  if (!content) return null

  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownRenderer