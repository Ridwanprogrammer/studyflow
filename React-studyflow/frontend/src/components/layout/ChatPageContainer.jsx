import { Outlet, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { CommandPalette } from '../ui/CommandPalette'

export function ChatPageContainer() {
  const location = useLocation()
  const [cmdOpen, setCmdOpen] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  // Global Ctrl+K / Cmd+K shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setCmdOpen((prev) => !prev)
      }
    }
    const handleCustomOpen = () => setCmdOpen(true)

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('open-command-palette', handleCustomOpen)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('open-command-palette', handleCustomOpen)
    }
  }, [])

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <div
        className="min-h-screen text-[var(--text)] flex flex-col chat-page-body"
        style={{
          backgroundColor: 'var(--bg)',
          backgroundImage: 'var(--bg-gradient)',
          backgroundAttachment: 'fixed',
        }}
      >
        <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />
        <main id="main-content" className="flex-1 min-w-0" tabIndex={-1}>
          <Outlet />
        </main>
      </div>
    </>
  )
}
export default ChatPageContainer