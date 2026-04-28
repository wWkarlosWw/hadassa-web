import { MainLayout } from '@/layouts'

export function HomePage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 text-center">
          Bienvenido a Hadassa
        </h1>
        <p className="mt-4 text-xl text-gray-600 text-center">
          Tu aplicación web está lista para usar
        </p>
      </div>
    </MainLayout>
  )
}