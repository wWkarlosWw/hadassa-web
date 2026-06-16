import { api } from './api'
import type { ClaimedDiscount } from '@/types/models'

export const claimedDiscountService = {
  getAll: () => api.get<ClaimedDiscount[]>('/claimed-discount'),
  getMine: () => api.get<ClaimedDiscount[]>('/claimed-discount?mine=true'),
  claim: (discountId: string) => api.post<ClaimedDiscount>('/claimed-discount', { discountId }),
}
