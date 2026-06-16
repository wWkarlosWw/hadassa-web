import { api } from './api'
import type { Event, EventParticipation } from '@/types/models'

export const eventService = {
  getAll: () => api.get<Event[]>('/event'),
  getById: (id: string) => api.get<Event>(`/event/${id}`),
  getByOrganization: (orgId: string) => api.get<Event[]>(`/event?organizationId=${orgId}`),
  create: (data: { name: string; description: string; date?: string; organizationId: string }) =>
    api.post<Event>('/event', data),
  update: (id: string, data: Partial<{ name: string; description: string; date: string; isActive: boolean }>) =>
    api.patch<Event>(`/event/${id}`, data),
  delete: (id: string) => api.delete<void>(`/event/${id}`),
}

export const participationService = {
  getAll: () => api.get<EventParticipation[]>('/event-participation'),
  getMine: () => api.get<EventParticipation[]>('/event-participation?mine=true'),
  getByEvent: (eventId: string) => api.get<EventParticipation[]>(`/event-participation/event/${eventId}`),
  register: (eventId: string) => api.post<EventParticipation>('/event-participation', { eventId }),
  markAttend: (id: string) => api.patch<EventParticipation>(`/event-participation/${id}/attend`),
  cancel: (id: string) => api.patch<EventParticipation>(`/event-participation/${id}/cancel`),
}
