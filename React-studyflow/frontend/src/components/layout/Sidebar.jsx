import { NavLink } from 'react-router-dom'
import { Home, BookOpen, Sparkles, Bot, Calendar, X } from '../ui/Icons'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', end: true, icon: Home },
  { name: 'My Courses', href: '/courses', icon: BookOpen },
  { name: 'Global Glossary', href: '/glossary', icon: Sparkles },
  { name: 'AI Tutor Chat', href: '/chat', ai: true, icon: Bot },
  { name: 'Semester Calendar', href: '/calendar', icon: Calendar },
]

export function Sidebar({ isOpen, onClose, institutionLabel }) {
  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
          aria-label="Close navigation"
          onClick={onClose}
        />
      )}

      {/* Main Sidebar Shell - matches studyflow .sf-sidebar */}
      <aside
        className={`sf-sidebar ${isOpen ? 'mobile-open' : ''}`}
        id="sf-sidebar"
        aria-label="Main navigation"
      >
        {/* Brand Header - matches vanilla sf-sidebar-brand */}
        <div className="sf-sidebar-brand">
          <NavLink
            to="/"
            onClick={onClose}
            className="sf-brand-link"
            aria-label="StudyFlow home"
          >
            <img
              src="/icons/logo.png"
              alt="StudyFlow Logo"
              className="sf-brand-logo"
            />
            <span className="sf-brand-name">
              <span className="sf-white">Study</span>
              <span className="sf-blue">Flow</span>
            </span>
          </NavLink>

          {/* Close button on mobile */}
          <button
            type="button"
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Menu - matches studyflow .sf-nav-menu */}
        <nav className="sf-nav-menu" aria-label="Main navigation">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.end}
                onClick={onClose}
                className={({ isActive }) => {
                  const base = 'sf-nav-item'
                  return isActive ? `${base} active` : base
                }}
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon
                        size={18}
                        className={isActive ? 'text-cyan-400' : 'text-slate-400'}
                      />
                      <span className="truncate">{item.name}</span>
                    </div>
                    {item.ai && (
                      <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 shadow-sm">
                        AI
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* Sidebar Footer - matches studyflow .sf-sidebar-footer */}
        <div className="sf-sidebar-footer">
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
            <span className="block text-[10px] font-extrabold uppercase tracking-wider text-cyan-400 truncate">
              {institutionLabel}
            </span>
            <p className="text-xs text-slate-400 font-medium">
              200L · B.Sc Computer Science
            </p>
            <p className="text-[11px] text-slate-500">
              Second Semester Workspace
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}
export default Sidebar