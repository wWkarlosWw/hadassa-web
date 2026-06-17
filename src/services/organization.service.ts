import { api } from './api'
import type { Organization } from '@/types/models'

export type CreateOrgData = {
  name: string
  email: string
  password: string
  type: string
  address: string
  goal?: number
  image?: string
  coverImage?: string
  tagline?: string
  category?: string
  location?: string
  featured?: boolean
  beneficiaries?: number
}

export type UpdateOrgData = Partial<Omit<CreateOrgData, 'password' | 'name' | 'email'> & { isActive?: boolean }>

export const organizationService = {
  getAll: () => api.get<Organization[]>('/organization'),
  getById: (id: string) => api.get<Organization>(`/organization/${id}`),
  create: (data: CreateOrgData) =>
    api.post<Organization>('/organization', data),
  update: (id: string, data: UpdateOrgData) =>
    api.patch<Organization>(`/organization/${id}`, data),
  delete: (id: string) => api.delete<void>(`/organization/${id}`),
}
