import { MainLayout } from '@/layouts'

export function DashboardPage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Contenido del dashboard</p>
      </div>
    </MainLayout>
  )
}