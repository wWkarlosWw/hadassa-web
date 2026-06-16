import { api } from './api'
import type { Donation } from '@/types/models'

export const donationService = {
  getAll: () => api.get<Donation[]>('/donation'),
  getMine: () => api.get<Donation[]>('/donation?mine=true'),
  getById: (id: string) => api.get<Donation>(`/donation/${id}`),
  create: (data: { amount: number; organizationId: string; eventId?: string }) =>
    api.post<Donation>('/donation', data),
  approve: (id: string) => api.patch<Donation>(`/donation/${id}/approve`),
  reject: (id: string) => api.patch<Donation>(`/donation/${id}/reject`),
}
