import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/context";
import Home from "@/pages/Home";
import { AuthPage } from "@/pages/auth/AuthPage";
import { Dashboard } from "@/pages/Dashboard";
import { UserLayout } from "@/components/layout/UserLayout";
import { DonarPage } from "@/pages/user/DonarPage";
import { Navbar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { DescuentosPage } from "@/pages/user/DescuentosPage";
import { ActividadesPage } from "@/pages/user/ActividadesPage";
import { ValidateDonationsPage } from "@/pages/supervisor/ValidateDonationsPage";
import { ValidateAttendancePage } from "@/pages/supervisor/ValidateAttendancePage";

import { OrganizationsPage } from "@/pages/admin/OrganizationsPage";
import { EventsPage } from "@/pages/admin/EventsPage";
import { DiscountsManagePage } from "@/pages/admin/DiscountsManagePage";
import { SupervisorsPage } from "@/pages/admin/SupervisorsPage";
import { UsersPage } from "@/pages/admin/UsersPage";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <>{children}</>;
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<PublicRoute><AuthPage /></PublicRoute>} />
        <Route path="/donar" element={
          <div className="min-h-screen flex flex-col bg-[var(--bg-cream)]">
            <Navbar />
            <main className="grow pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
              <DonarPage />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/dashboard" element={<ProtectedRoute><UserLayout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="donar" element={<DonarPage />} />
          <Route path="descuentos" element={<DescuentosPage />} />
          <Route path="actividades" element={<ActividadesPage />} />
          <Route path="validar-donaciones" element={<ValidateDonationsPage />} />
          <Route path="validar-asistencia" element={<ValidateAttendancePage />} />
          <Route path="organizaciones" element={<OrganizationsPage />} />
          <Route path="eventos" element={<EventsPage />} />
          <Route path="descuentos-admin" element={<DiscountsManagePage />} />
          <Route path="supervisores" element={<SupervisorsPage />} />
          <Route path="usuarios" element={<UsersPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
