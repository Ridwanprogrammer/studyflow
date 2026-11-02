import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { api } from '../lib/api'

const TOKEN_KEY = 'studyflow_tokens'

function getTokens() {
  try {
    const stored = localStorage.getItem(TOKEN_KEY)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

function setTokens(tokens) {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens))
}

function clearTokens() {
  localStorage.removeItem(TOKEN_KEY)
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const fetchUser = useCallback(async () => {
    const tokens = getTokens()
    if (!tokens?.access) {
      setIsLoading(false)
      setIsAuthenticated(false)
      return
    }

    try {
      const response = await api.get('/users/me/')
      setUser(response.data)
      setIsAuthenticated(true)
    } catch (error) {
      // Token might be expired, try refresh
      if (tokens?.refresh) {
        try {
          const refreshResponse = await api.post('/auth/token/refresh/', { refresh: tokens.refresh })
          const newTokens = { ...tokens, access: refreshResponse.data.access }
          setTokens(newTokens)
          
          // Retry fetching user with new token
          const userResponse = await api.get('/users/me/')
          setUser(userResponse.data)
          setIsAuthenticated(true)
        } catch (refreshError) {
          clearTokens()
          setUser(null)
          setIsAuthenticated(false)
        }
      } else {
        clearTokens()
        setUser(null)
        setIsAuthenticated(false)
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUser()
    document.documentElement.classList.add('dark')
  }, [fetchUser])

  const login = async (email, password) => {
    const response = await api.post('/auth/token/', { email, password })
    const tokens = { access: response.data.access, refresh: response.data.refresh }
    setTokens(tokens)
    await fetchUser()
    return response.data
  }

  const register = async (userData) => {
    const response = await api.post('/users/register/', {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      password_confirm: userData.password,
      first_name: userData.full_name?.split(' ')[0] || '',
      last_name: userData.full_name?.split(' ').slice(1).join(' ') || '',
    })
    return response.data
  }

  const logout = async () => {
    clearTokens()
    setUser(null)
    setIsAuthenticated(false)
    return true
  }

  const updateProfile = async (data) => {
    const response = await api.patch('/users/me/', data)
    setUser(response.data)
    return response.data
  }

  const changePassword = async (currentPassword, newPassword) => {
    const response = await api.post('/users/change_password/', {
      current_password: currentPassword,
      new_password: newPassword,
    })
    return response.data
  }

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}