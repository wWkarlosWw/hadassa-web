import { api } from './api'
import type { EventSupervisor } from '@/types/models'

export const eventSupervisorService = {
  getAll: () => api.get<EventSupervisor[]>('/event-supervisor'),
  getByEvent: (eventId: string) => api.get<EventSupervisor[]>(`/event-supervisor/event/${eventId}`),
  assign: (userId: string, eventId: string) =>
    api.post<EventSupervisor>('/event-supervisor', { userId, eventId }),
  remove: (id: string) => api.delete<void>(`/event-supervisor/${id}`),
}
