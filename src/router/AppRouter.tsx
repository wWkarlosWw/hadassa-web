import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/context";
import Home from "@/pages/Home";
import { AuthPage } from "@/pages/auth/AuthPage";
import { Dashboard } from "@/pages/Dashboard";
import { UserLayout } from "@/components/layout/UserLayout";
import { DonarPage } from "@/pages/user/DonarPage";
import { DescuentosPage } from "@/pages/user/DescuentosPage";
import { ActividadesPage } from "@/pages/user/ActividadesPage";

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
        <Route path="/dashboard" element={<ProtectedRoute><UserLayout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="donar" element={<DonarPage />} />
          <Route path="descuentos" element={<DescuentosPage />} />
          <Route path="actividades" element={<ActividadesPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
