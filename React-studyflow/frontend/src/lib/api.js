import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://studyflow-b9jw.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
})

// Token storage key
const TOKEN_KEY = 'studyflow_tokens'

// Get stored tokens
function getTokens() {
  try {
    const stored = localStorage.getItem(TOKEN_KEY)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

// Store tokens
function setTokens(tokens) {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens))
}

// Clear tokens
function clearTokens() {
  localStorage.removeItem(TOKEN_KEY)
}

// Request interceptor - attach auth token
api.interceptors.request.use(
  (config) => {
    const tokens = getTokens()
    if (tokens?.access) {
      config.headers.Authorization = `Bearer ${tokens.access}`
    }
    // Log request in development
    if (import.meta.env.DEV) {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`, config.data)
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor - handle errors, token refresh
api.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log(`[API] Response ${response.status}`, response.data)
    }
    return response
  },
  async (error) => {
    const originalRequest = error.config

    if (import.meta.env.DEV) {
      console.error(`[API] Error ${error.response?.status} ${originalRequest?.url}`, error.response?.data)
    }

    // Handle 401 - token expired, try refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const tokens = getTokens()
        if (tokens?.refresh) {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL || 'https://studyflow-b9jw.onrender.com'}/auth/token/refresh/`,
            { refresh: tokens.refresh },
            { headers: { 'Content-Type': 'application/json' } }
          )

          const { access } = response.data
          const newTokens = { ...tokens, access }
          setTokens(newTokens)

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${access}`
          return api(originalRequest)
        }
      } catch (refreshError) {
        // Refresh failed - clear tokens and redirect to login
        clearTokens()
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export function unwrapList(data) {
  if (Array.isArray(data)) return data
  return data?.results ?? []
}

export default api