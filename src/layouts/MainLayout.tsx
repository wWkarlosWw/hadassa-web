import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ROUTES } from '@/shared/constants'

interface LayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: LayoutProps) {
  const location = useLocation()
  
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to={ROUTES.HOME} className="text-xl font-bold text-gray-900">
                Hadassa
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to={ROUTES.HOME}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === ROUTES.HOME
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Inicio
              </Link>
              <Link
                to={ROUTES.DASHBOARD}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === ROUTES.DASHBOARD
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to={ROUTES.PROFILE}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === ROUTES.PROFILE
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Perfil
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  )
}