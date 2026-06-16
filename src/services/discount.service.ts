import { api } from './api'
import type { Discount } from '@/types/models'

export const discountService = {
  getAll: () => api.get<Discount[]>('/discounts'),
  getById: (id: string) => api.get<Discount>(`/discounts/${id}`),
  create: (data: { code: string; description: string; discount: number; pointsRequired: number; organizationId: string }) =>
    api.post<Discount>('/discounts', data),
  update: (id: string, data: Partial<{ code: string; description: string; discount: number; pointsRequired: number; isActive: boolean }>) =>
    api.patch<Discount>(`/discounts/${id}`, data),
  delete: (id: string) => api.delete<void>(`/discounts/${id}`),
}
