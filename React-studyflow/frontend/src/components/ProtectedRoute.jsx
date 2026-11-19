import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { useAuth } from '../stores/authStore'
import { Loader2 } from '../components/ui/Icons'

export function ProtectedRoute({ children, requireAuth = false }) {
  const location = useLocation()
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 bg-gradient-brand bg-fixed">
        <Loader2 size={48} className="animate-spin text-cyan-400" aria-hidden="true" />
      </div>
    )
  }

  // Guests land on the front door instead of being dropped straight into a login form.
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return children ? <>{children}</> : <Outlet />
}

export function PublicOnlyRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 bg-gradient-brand bg-fixed">
        <Loader2 size={48} className="animate-spin text-cyan-400" aria-hidden="true" />
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children ? <>{children}</> : <Outlet />
}