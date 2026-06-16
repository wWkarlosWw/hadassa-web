import { api } from './api'
import type { Organization } from '@/types/models'

export const organizationService = {
  getAll: () => api.get<Organization[]>('/organization'),
  getById: (id: string) => api.get<Organization>(`/organization/${id}`),
  create: (data: { name: string; email: string; password: string; type: string; address: string }) =>
    api.post<Organization>('/organization', data),
  update: (id: string, data: Partial<{ name: string; email: string; type: string; address: string; isActive: boolean }>) =>
    api.patch<Organization>(`/organization/${id}`, data),
  delete: (id: string) => api.delete<void>(`/organization/${id}`),
}
