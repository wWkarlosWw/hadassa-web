import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User } from '@/types'
import { STORAGE_KEYS } from '@/shared/constants'
import { authService } from '@/services/auth.service'
import { userService } from '@/services/user.service'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (name: string, email: string, phone: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN)
    const userData = localStorage.getItem(STORAGE_KEYS.USER)

    if (token && userData) {
      try {
        setUser(JSON.parse(userData))
        userService.getProfile()
          .then((updatedUser) => {
            localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser))
            setUser(updatedUser)
          })
          .catch(() => {})
      } catch {
        localStorage.removeItem(STORAGE_KEYS.TOKEN)
        localStorage.removeItem(STORAGE_KEYS.USER)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password)
      localStorage.setItem(STORAGE_KEYS.TOKEN, response.accessToken)
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user))
      setUser(response.user)
      return { success: true }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Error al iniciar sesión' }
    }
  }

  const register = async (name: string, email: string, phone: string, password: string) => {
    try {
      const response = await authService.register({ name, email, phone, password })
      localStorage.setItem(STORAGE_KEYS.TOKEN, response.accessToken)
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user))
      setUser(response.user)
      return { success: true }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Error al registrarse' }
    }
  }

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN)
    localStorage.removeItem(STORAGE_KEYS.USER)
    setUser(null)
  }

  const refreshUser = async () => {
    try {
      const updatedUser = await userService.getProfile()
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser))
      setUser(updatedUser)
    } catch {
      // ignore
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}