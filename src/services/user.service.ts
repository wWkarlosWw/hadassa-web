import { api } from './api'
import type { User } from '@/types'

export const userService = {
  getAll: () => api.get<User[]>('/user'),
  getById: (id: string) => api.get<User>(`/user/${id}`),
  getProfile: () => api.get<User>('/user/profile'),
  update: (id: string, data: Partial<{ name: string; email: string; role: string; isActive: boolean }>) =>
    api.patch<User>(`/user/${id}`, data),
}
