import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { Copy, Check } from './ui/Icons'
import 'katex/dist/katex.min.css'

function normalizeWikiText(content = '') {
  return content
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2')
    .replace(/\[\[([^\]]+)\]\]/g, '$1')
}

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
    <code className="sf-inline-code">{children}</code>
  ),
  h1: ({ children }) => <h1 className="sf-md-h1">{children}</h1>,
  h2: ({ children }) => <h2 className="sf-md-h2">{children}</h2>,
  h3: ({ children }) => <h3 className="sf-md-h3">{children}</h3>,
  p: ({ children }) => <p className="sf-md-p">{children}</p>,
  ul: ({ children }) => <ul className="sf-md-ul">{children}</ul>,
  ol: ({ children }) => <ol className="sf-md-ol">{children}</ol>,
  blockquote: ({ children }) => <blockquote className="sf-md-blockquote">{children}</blockquote>,
  a: ({ href, children }) => <a href={href} className="sf-md-link" target="_blank" rel="noopener noreferrer">{children}</a>,
  strong: ({ children }) => <strong className="sf-md-strong">{children}</strong>,
}

/**
 * Shared Markdown renderer component.
 * Eliminates duplication across Topic, Chat, and Glossary pages.
 */
export function MarkdownRenderer({ content, className = 'sf-markdown-body' }) {
  if (!content) return null

  const safeContent = normalizeWikiText(content)

  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={markdownComponents}
      >
        {safeContent}
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownRenderer