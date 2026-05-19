import { motion } from "motion/react";
import { Mail, Lock, User, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthInput } from "./AuthInput";
import { AuthButton } from "./AuthButton";

interface RegisterFormProps {
  onRegister: (
    name: string,
    email: string,
    phone: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  onSwitchToLogin: () => void;
}

export const RegisterForm = ({ onRegister, onSwitchToLogin }: RegisterFormProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "El nombre es requerido";
    else if (formData.name.trim().length < 3)
      newErrors.name = "El nombre debe tener al menos 3 caracteres";
    if (!formData.email) newErrors.email = "El correo electrónico es requerido";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "El correo electrónico no es válido";
    if (!formData.phone) newErrors.phone = "El teléfono es requerido";
    if (!formData.password) newErrors.password = "La contraseña es requerida";
    else if (formData.password.length < 6)
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Debes confirmar tu contraseña";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    if (!acceptTerms)
      newErrors.terms = "Debes aceptar los términos y condiciones";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    if (validateForm()) {
      setIsLoading(true);
      const result = await onRegister(
        formData.name,
        formData.email,
        formData.phone,
        formData.password
      );
      setIsLoading(false);
      if (result.success) {
        navigate("/dashboard");
      } else {
        setServerError(result.error || "Error al registrarse");
      }
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <div className="w-full max-w-md py-8">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-4xl font-bold text-[var(--text-main)] mb-3">
          Únete a nosotros
        </h2>
        <p className="text-lg text-[var(--text-light)]">
          Crea tu cuenta y comienza a hacer la diferencia
        </p>
      </motion.div>

      <motion.form
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        onSubmit={handleSubmit}
        className="space-y-5"
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
          id="name"
          label="Nombre Completo"
          type="text"
          value={formData.name}
          onChange={(val) => handleChange("name", val)}
          placeholder="Juan Pérez"
          icon={<User className="w-5 h-5 text-[var(--text-light)]" />}
          error={errors.name}
        />

        <AuthInput
          id="email"
          label="Correo Electrónico"
          type="email"
          value={formData.email}
          onChange={(val) => handleChange("email", val)}
          placeholder="tu@email.com"
          icon={<Mail className="w-5 h-5 text-[var(--text-light)]" />}
          error={errors.email}
        />

        <AuthInput
          id="phone"
          label="Teléfono"
          type="tel"
          value={formData.phone}
          onChange={(val) => handleChange("phone", val)}
          placeholder="+591 123 456 789"
          icon={<Phone className="w-5 h-5 text-[var(--text-light)]" />}
          error={errors.phone}
        />

        <AuthInput
          id="password"
          label="Contraseña"
          type="password"
          value={formData.password}
          onChange={(val) => handleChange("password", val)}
          placeholder="••••••••"
          icon={<Lock className="w-5 h-5 text-[var(--text-light)]" />}
          error={errors.password}
          showPasswordToggle
        />

        <AuthInput
          id="confirmPassword"
          label="Confirmar Contraseña"
          type="password"
          value={formData.confirmPassword}
          onChange={(val) => handleChange("confirmPassword", val)}
          placeholder="••••••••"
          icon={<Lock className="w-5 h-5 text-[var(--text-light)]" />}
          error={errors.confirmPassword}
          showPasswordToggle
        />

        <div>
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => {
                setAcceptTerms(e.target.checked);
                if (errors.terms)
                  setErrors((prev) => ({ ...prev, terms: "" }));
              }}
              className={`w-4 h-4 mt-1 text-[var(--primary)] border-gray-300 rounded focus:ring-[var(--primary)] cursor-pointer ${errors.terms ? "border-[var(--error)]" : ""}`}
            />
            <span className="ml-2 text-sm text-[var(--text-light)]">
              Acepto los{" "}
              <a href="#" className="text-[var(--primary)] hover:underline">
                Términos y Condiciones
              </a>{" "}
              y la{" "}
              <a href="#" className="text-[var(--primary)] hover:underline">
                Política de Privacidad
              </a>
            </span>
          </label>
          {errors.terms && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-[var(--error)]"
            >
              {errors.terms}
            </motion.p>
          )}
        </div>

        <AuthButton isLoading={isLoading}>Crear Cuenta</AuthButton>
      </motion.form>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 text-center"
      >
        <p className="text-sm text-[var(--text-light)]">
          ¿Ya tienes una cuenta?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-[var(--primary)] hover:text-[var(--primary-dark)] font-semibold transition-colors"
          >
            Inicia sesión aquí
          </button>
        </p>
      </motion.div>
    </div>
  );
};