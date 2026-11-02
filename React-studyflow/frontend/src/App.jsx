import { Routes, Route, Navigate, Outlet, useLocation, NavLink } from 'react-router-dom'
import { AuthProvider } from './stores/authStore'
import { PageContainer } from './components/layout/PageContainer'
import { ChatPageContainer } from './components/layout/ChatPageContainer'
import { TopBar } from './components/layout/TopBar'
import { ProtectedRoute, PublicOnlyRoute } from './components/ProtectedRoute'
import { Dashboard } from './pages/Dashboard'
import { Courses } from './pages/Courses'
import { CourseDetail } from './pages/CourseDetail'
import { Topic } from './pages/Topic'
import { Glossary } from './pages/Glossary'
import { Chat } from './pages/Chat'
import { CalendarPage as Calendar } from './pages/Calendar'
import { Login } from './pages/Login'
import { Register } from './pages/Register'

function LearningPageLayout() {
  const location = useLocation()
  const topicRoute = location.pathname.match(/^\/courses\/([^/]+)\/topics\//)
  const courseId = topicRoute ? decodeURIComponent(topicRoute[1]) : null
  const isTopic = Boolean(topicRoute)

  return (
    <div className="sf-learning-shell">
      <div className="sf-learning-shell__inner">
        <TopBar
          pathname={location.pathname}
          hideMenu
          navigation={(
            <nav className="sf-learning-nav" aria-label="Learning navigation">
            {isTopic && (
              <NavLink to={`/courses/${courseId}`} className="sf-learning-nav__link">
                Back to course
              </NavLink>
            )}
            <NavLink to="/" className="sf-learning-nav__link">
              Dashboard
            </NavLink>
            </nav>
          )}
        />
        <main id="main-content" className="sf-learning-shell__main" tabIndex={-1}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected routes */}
      <Route element={<ProtectedRoute requireAuth={true} />}>
        <Route element={<PageContainer />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseId" element={<CourseDetail />} />
          <Route path="/calendar" element={<Calendar />} />
        </Route>

        <Route element={<LearningPageLayout />}>
          <Route path="/courses/:courseId/topics/:topicId" element={<Topic />} />
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