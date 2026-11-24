import { Outlet, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { CommandPalette } from '../ui/CommandPalette'
import { getInstitutionLabel } from '../../config/AppConfig'

export function PageContainer() {
  const location = useLocation()
  const workspaceVariant =
    location.pathname === '/dashboard'
      ? 'sf-main-workspace--dashboard'
      : location.pathname === '/courses'
        ? 'sf-main-workspace--catalog'
        : location.pathname.startsWith('/courses/')
          ? 'sf-main-workspace--course-detail'
        : ''
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cmdOpen, setCmdOpen] = useState(false)

  useEffect(() => {
    setMobileOpen(false)
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

      <div className="sf-dashboard-layout">
        <Sidebar
          isOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
          institutionLabel={getInstitutionLabel()}
        />
        <div className={`sf-main-workspace ${workspaceVariant}`}>
          <TopBar
            onMenuClick={() => setMobileOpen(!mobileOpen)}
            onSearchClick={() => setCmdOpen(true)}
            pathname={location.pathname}
          />
          <main id="main-content" className="flex-1 min-w-0" tabIndex={-1}>
            <Outlet />
          </main>
        </div>
        <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />
      </div>
    </>
  )
}
export default PageContainer