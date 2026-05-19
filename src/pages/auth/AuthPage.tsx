import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "@/context";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import {
  AuthSidePanel,
  AuthStats,
  AuthBenefits,
  LoginForm,
  RegisterForm,
  benefits,
} from "@/components/auth";

type AuthView = "login" | "register";

const loginStats = [
  { value: "100+", label: "Beneficiarios" },
  { value: "50+", label: "Familias" },
  { value: "9+", label: "Años" },
];

export function AuthPage() {
  const { login, register, isAuthenticated } = useAuth();
  const [view, setView] = useState<AuthView>("login");

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex overflow-hidden">
      <AnimatePresence mode="wait">
        {view === "login" ? (
          <motion.div
            key="login-left"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[var(--primary)] via-[var(--primary-dark)] to-[var(--primary)] relative overflow-hidden"
          >
            <AuthSidePanel
              title="Fundación Hadassa"
              subtitle="Transformando vidas a través del amor y el servicio"
              badge="9+ años haciendo la diferencia"
              stats={loginStats}
            />
          </motion.div>
        ) : (
          <motion.div
            key="register-left"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[var(--bg-cream)] overflow-y-auto"
          >
            <RegisterForm
              onRegister={register}
              onSwitchToLogin={() => setView("login")}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {view === "login" ? (
          <motion.div
            key="login-right"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[var(--bg-cream)]"
          >
            <LoginForm
              onLogin={login}
              onSwitchToRegister={() => setView("register")}
            />
          </motion.div>
        ) : (
          <motion.div
            key="register-right"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[var(--success)] via-[var(--primary)] to-[var(--primary-dark)] relative overflow-hidden"
          >
            <AuthSidePanel
              title="Sé parte del cambio"
              subtitle="Únete a nuestra comunidad y ayuda a transformar vidas en Bolivia"
            />
            <div className="relative z-10 flex flex-col items-center justify-center w-full p-12">
              <AuthBenefits benefits={benefits} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}