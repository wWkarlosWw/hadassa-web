import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "@/shared/constants";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        {/* <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} /> */}

        {/* Rutas protegidas */}
        <Route
          path={ROUTES.DASHBOARD}
          element={
            // <ProtectedRoute>
            //   <DashboardPage />
            // </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.PROFILE}
          element={
            // <ProtectedRoute>
            //   <ProfilePage />
            // </ProtectedRoute>
          }
        />

        {/* 404 */}
        {/* <Route path="*" element={<HomePage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
