import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ROUTES } from '@/shared/constants'
import { HomePage, DashboardPage, ProfilePage } from '@/pages'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
        <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}