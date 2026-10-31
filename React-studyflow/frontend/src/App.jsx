import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './stores/authStore'
import { PageContainer } from './components/layout/PageContainer'
import { ChatPageContainer } from './components/layout/ChatPageContainer'
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

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected routes with main layout (sidebar + topbar) */}
      <Route element={<ProtectedRoute requireAuth={true} />}>
        <Route element={<PageContainer />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseId" element={<CourseDetail />} />
          <Route path="/courses/:courseId/topics/:topicId" element={<Topic />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/calendar" element={<Calendar />} />
        </Route>
        
        {/* Chat page with its own layout (no main sidebar) */}
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