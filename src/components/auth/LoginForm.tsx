import { motion } from "motion/react";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthInput } from "./AuthInput";
import { AuthButton } from "./AuthButton";

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  redirectPath?: string;
  onSwitchToRegister: () => void;
}

export const LoginForm = ({ onLogin, redirectPath, onSwitchToRegister }: LoginFormProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = "El correo electrónico es requerido";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "El correo electrónico no es válido";
    if (!password) newErrors.password = "La contraseña es requerida";
    else if (password.length < 6)
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    if (validateForm()) {
      setIsLoading(true);
      const result = await onLogin(email, password);
      setIsLoading(false);
      if (result.success) {
        navigate(redirectPath || "/dashboard");
      } else {
        setServerError(result.error || "Error al iniciar sesión");
      }
    }
  };

  return (
    <div className="w-full max-w-md">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-10"
      >
        <h2 className="text-4xl font-bold text-[var(--text-main)] mb-3">
          Bienvenido de nuevo
        </h2>
        <p className="text-lg text-[var(--text-light)]">
          Inicia sesión para continuar ayudando
        </p>
      </motion.div>

      <motion.form
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {serverError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-[var(--error)]/10 border border-[var(--error)] rounded-[var(--radius)] text-[var(--error)] text-sm"
          >
            {serverError}
          </motion.div>
        )}

        <AuthInput
          id="email"
          label="Correo Electrónico"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="tu@email.com"
          icon={<Mail className="w-5 h-5 text-[var(--text-light)]" />}
          error={errors.email}
        />

        <AuthInput
          id="password"
          label="Contraseña"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="••••••••"
          icon={<Lock className="w-5 h-5 text-[var(--text-light)]" />}
          error={errors.password}
          showPasswordToggle
        />

        <AuthButton isLoading={isLoading}>Iniciar Sesión</AuthButton>
      </motion.form>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-center"
      >
        <p className="text-sm text-[var(--text-light)]">
          ¿No tienes una cuenta?{" "}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-[var(--primary)] hover:text-[var(--primary-dark)] font-semibold transition-colors"
          >
            Regístrate aquí
          </button>
        </p>
      </motion.div>
    </div>
  );
};