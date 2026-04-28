import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { ROUTES } from '@/shared/constants'

interface AuthLayoutProps {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const location = useLocation()
  const isAuthenticated = localStorage.getItem('auth_token')
  
  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} state={{ from: location }} replace />
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        {children}
      </div>
    </div>
  )
}