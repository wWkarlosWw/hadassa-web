import { API_BASE_URL } from '@/shared/constants'
import { AuthResponse, User } from '@/types'

interface LoginResponse {
  accessToken: string
  tokenType: string
  expiresIn: string
  user: User
}

interface RegisterData {
  name: string
  email: string
  phone: string
  password: string
}

interface ApiError {
  message: string
  statusCode?: number
}

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const error: ApiError = await response.json()
      throw new Error(error.message || 'Error al iniciar sesión')
    }

    return response.json()
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error: ApiError = await response.json()
      throw new Error(error.message || 'Error al registrarse')
    }

    return response.json()
  },
}