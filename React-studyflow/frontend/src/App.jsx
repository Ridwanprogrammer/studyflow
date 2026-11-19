import { Routes, Route, Navigate, Outlet, useLocation, NavLink } from 'react-router-dom'
import { AuthProvider } from './stores/authStore'
import { PageContainer } from './components/layout/PageContainer'
import { ChatPageContainer } from './components/layout/ChatPageContainer'
import { ProtectedRoute, PublicOnlyRoute } from './components/ProtectedRoute'
import { Dashboard } from './pages/Dashboard'
import { Courses } from './pages/Courses'
import { CourseDetail } from './pages/CourseDetail'
import { Topic } from './pages/Topic'
import { Learn } from './pages/Learn'
import { Glossary } from './pages/Glossary'
import { Chat } from './pages/Chat'
import { CalendarPage as Calendar } from './pages/Calendar'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Landing } from './pages/Landing'
import { useAuth } from './stores/authStore'
import { Loader2 } from './components/ui/Icons'

function LearningPageLayout() {
  const location = useLocation()
  const topicRoute = location.pathname.match(/^\/courses\/([^/]+)\/topics\//)
  const courseId = topicRoute ? decodeURIComponent(topicRoute[1]) : null
  const isTopic = Boolean(topicRoute)

  return (
    <div className="sf-learning-shell">
      <div className="sf-learning-shell__inner">
        <header className="sf-learning-header">
          <NavLink to="/" className="sf-learning-brand" aria-label="StudyFlow dashboard">
            <img src="/icons/logo.png" alt="" />
            <span><strong>Study</strong><em>Flow</em></span>
          </NavLink>
          <nav className="sf-learning-nav" aria-label="Learning navigation">
            {isTopic && (
              <NavLink to={`/courses/${courseId}`} className="sf-learning-nav__link">
                Back to course
              </NavLink>
            )}
            <NavLink to="/" className="sf-learning-nav__link">
              Dashboard
            </NavLink>
            <NavLink to="/chat" className="sf-learning-nav__link">
              AI chat
            </NavLink>
          </nav>
        </header>
        <main id="main-content" className="sf-learning-shell__main" tabIndex={-1}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

// The first page a visitor sees: a landing page for guests, the workspace for members.
function HomeRoute() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 bg-gradient-brand bg-fixed">
        <Loader2 size={48} className="animate-spin text-cyan-400" aria-hidden="true" />
      </div>
    )
  }

  return isAuthenticated ? <Dashboard /> : <Landing />
}

function AppRoutes() {
  return (
    <Routes>
      {/* The front door */}
      <Route path="/" element={<HomeRoute />} />

      {/* Public routes */}
      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected routes */}
      <Route element={<ProtectedRoute requireAuth={true} />}>
        <Route element={<PageContainer />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseId" element={<CourseDetail />} />
          <Route path="/calendar" element={<Calendar />} />
        </Route>

        <Route element={<LearningPageLayout />}>
          <Route path="/courses/:courseId/topics/:topicId" element={<Navigate to="learn" replace />} />
          <Route path="/courses/:courseId/topics/:topicId/learn" element={<Learn />} />
          <Route path="/courses/:courseId/topics/:topicId/notes" element={<Topic />} />
          <Route path="/glossary" element={<Glossary />} />
        </Route>

        <Route element={<ChatPageContainer />}>
          <Route path="/chat" element={<Chat />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App