export interface Organization {
  id: string
  name: string
  email: string
  type: 'CHARITY' | 'NGO' | 'COLLABORATOR'
  address: string
  isActive: boolean
  createdAt: string
  goal?: number
  raised?: number
  donors?: number
  beneficiaries?: number
  image?: string
  coverImage?: string
  tagline?: string
  category?: string
  location?: string
  featured?: boolean
}

export interface Event {
  id: string
  name: string
  description: string
  date: string
  createdAt: string
  isActive: boolean
  organizationId: string
  organization?: Pick<Organization, 'id' | 'name' | 'type'>
}

export interface Discount {
  id: string
  code: string
  description: string
  discount: number
  pointsRequired: number
  isActive: boolean
  organizationId: string
  organization?: Pick<Organization, 'id' | 'name'>
}

import type { User } from './auth'

export interface Donation {
  id: string
  amount: number
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  createdAt: string
  updatedAt: string
  userId: string
  user?: Pick<User, 'id' | 'name' | 'email'>
  organizationId: string
  organization?: Pick<Organization, 'id' | 'name'>
  eventId?: string
  event?: Pick<Event, 'id' | 'name'>
  validatedBy?: string
}

export interface EventParticipation {
  id: string
  status: 'REGISTERED' | 'ATTENDED' | 'CANCELLED'
  createdAt: string
  updatedAt: string
  userId: string
  user?: Pick<User, 'id' | 'name' | 'email'>
  eventId: string
  event?: Pick<Event, 'id' | 'name' | 'date'> & { organization?: Pick<Organization, 'id' | 'name'> }
  validatedBy?: string
}

export interface EventSupervisor {
  id: string
  createdAt: string
  userId: string
  user?: Pick<User, 'id' | 'name' | 'email'>
  eventId: string
  event?: Pick<Event, 'id' | 'name'>
}

export interface ClaimedDiscount {
  id: string
  pointsSpent: number
  status: 'PENDING' | 'REDEEMED' | 'CANCELLED'
  claimedAt: string
  userId: string
  user?: Pick<User, 'id' | 'name' | 'email'>
  discountId: string
  discount?: Pick<Discount, 'id' | 'code' | 'description' | 'discount'>
}
