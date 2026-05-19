import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  User,
  Phone,
  Users as UsersIcon,
  Target,
} from "lucide-react";
import { useAuth } from "@/context";
import { Navigate, useNavigate } from "react-router-dom";

type AuthView = "login" | "register";

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
          <LoginView key="login" onLogin={login} onSwitchToRegister={() => setView("register")} />
        ) : (
          <RegisterView key="register" onRegister={register} onSwitchToLogin={() => setView("login")} />
        )}
      </AnimatePresence>
    </div>
  );
}

interface LoginProps {
  onLogin: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  onSwitchToRegister: () => void;
}

function LoginView({ onLogin, onSwitchToRegister }: LoginProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = "El correo electrónico es requerido";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "El correo electrónico no es válido";
    if (!password) newErrors.password = "La contraseña es requerida";
    else if (password.length < 6) newErrors.password = "La contraseña debe tener al menos 6 caracteres";
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
        navigate('/dashboard');
      } else {
        setServerError(result.error || "Error al iniciar sesión");
      }
    }
  };

  return (
    <>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[var(--primary)] via-[var(--primary-dark)] to-[var(--primary)] relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring", stiffness: 200 }} className="mb-8">
            <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl">
              <Heart className="w-16 h-16 text-white fill-white" />
            </div>
          </motion.div>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="text-5xl font-bold text-center mb-6">
            Fundación Hadassa
          </motion.h1>
          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="text-xl text-white/90 text-center max-w-md mb-8">
            Transformando vidas a través del amor y el servicio
          </motion.p>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }} className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm">9+ años haciendo la diferencia</span>
          </motion.div>
          <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.9 }} className="mt-16 grid grid-cols-3 gap-8 text-center">
            <div><div className="text-3xl font-bold mb-2">100+</div><div className="text-sm text-white/80">Beneficiarios</div></div>
            <div><div className="text-3xl font-bold mb-2">50+</div><div className="text-sm text-white/80">Familias</div></div>
            <div><div className="text-3xl font-bold mb-2">9+</div><div className="text-sm text-white/80">Años</div></div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[var(--bg-cream)]"
      >
        <div className="w-full max-w-md">
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="mb-10">
            <h2 className="text-4xl font-bold text-[var(--text-main)] mb-3">Bienvenido de nuevo</h2>
            <p className="text-lg text-[var(--text-light)]">Inicia sesión para continuar ayudando</p>
          </motion.div>

          <motion.form initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} onSubmit={handleSubmit} className="space-y-6">
            {serverError && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-[var(--error)]/10 border border-[var(--error)] rounded-[var(--radius)] text-[var(--error)] text-sm">
                {serverError}
              </motion.div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--text-main)] mb-2">Correo Electrónico</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-[var(--text-light)]" />
                </div>
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`w-full pl-12 pr-4 py-4 border-2 rounded-[var(--radius-lg)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all bg-white ${errors.email ? "border-[var(--error)]" : "border-gray-200 focus:border-[var(--primary)]"}`} placeholder="tu@email.com" />
              </div>
              {errors.email && <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-sm text-[var(--error)]">{errors.email}</motion.p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[var(--text-main)] mb-2">Contraseña</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-[var(--text-light)]" />
                </div>
                <input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className={`w-full pl-12 pr-12 py-4 border-2 rounded-[var(--radius-lg)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all bg-white ${errors.password ? "border-[var(--error)]" : "border-gray-200 focus:border-[var(--primary)]"}`} placeholder="••••••••" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-[var(--text-light)] hover:text-[var(--text-main)] transition-colors">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-sm text-[var(--error)]">{errors.password}</motion.p>}
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isLoading} className="w-full py-4 bg-[var(--primary)] text-white rounded-[var(--radius-lg)] hover:bg-[var(--primary-dark)] transition-all shadow-[var(--shadow-primary)] hover:shadow-[var(--shadow-lg)] font-medium flex items-center justify-center gap-2 group disabled:opacity-50">
              {isLoading ? "Cargando..." : "Iniciar Sesión"}
              {!isLoading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </motion.button>
          </motion.form>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-8 text-center">
            <p className="text-sm text-[var(--text-light)]">¿No tienes una cuenta? <button onClick={onSwitchToRegister} className="text-[var(--primary)] hover:text-[var(--primary-dark)] font-semibold transition-colors">Regístrate aquí</button></p>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}

interface RegisterProps {
  onRegister: (name: string, email: string, phone: string, password: string) => Promise<{ success: boolean; error?: string }>;
  onSwitchToLogin: () => void;
}

function RegisterView({ onRegister, onSwitchToLogin }: RegisterProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "El nombre es requerido";
    else if (formData.name.trim().length < 3) newErrors.name = "El nombre debe tener al menos 3 caracteres";
    if (!formData.email) newErrors.email = "El correo electrónico es requerido";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "El correo electrónico no es válido";
    if (!formData.phone) newErrors.phone = "El teléfono es requerido";
    if (!formData.password) newErrors.password = "La contraseña es requerida";
    else if (formData.password.length < 6) newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Debes confirmar tu contraseña";
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Las contraseñas no coinciden";
    if (!acceptTerms) newErrors.terms = "Debes aceptar los términos y condiciones";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    if (validateForm()) {
      setIsLoading(true);
      const result = await onRegister(formData.name, formData.email, formData.phone, formData.password);
      setIsLoading(false);
      if (result.success) {
        navigate('/dashboard');
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
    <>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[var(--bg-cream)] overflow-y-auto"
      >
        <div className="w-full max-w-md py-8">
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="mb-8">
            <h2 className="text-4xl font-bold text-[var(--text-main)] mb-3">Únete a nosotros</h2>
            <p className="text-lg text-[var(--text-light)]">Crea tu cuenta y comienza a hacer la diferencia</p>
          </motion.div>

          <motion.form initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} onSubmit={handleSubmit} className="space-y-5">
            {serverError && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-[var(--error)]/10 border border-[var(--error)] rounded-[var(--radius)] text-[var(--error)] text-sm">
                {serverError}
              </motion.div>
            )}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[var(--text-main)] mb-2">Nombre Completo</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-[var(--text-light)]" />
                </div>
                <input id="name" type="text" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} className={`w-full pl-12 pr-4 py-3 border-2 rounded-[var(--radius-lg)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all bg-white ${errors.name ? "border-[var(--error)]" : "border-gray-200 focus:border-[var(--primary)]"}`} placeholder="Juan Pérez" />
              </div>
              {errors.name && <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-1 text-sm text-[var(--error)]">{errors.name}</motion.p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--text-main)] mb-2">Correo Electrónico</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-[var(--text-light)]" />
                </div>
                <input id="email" type="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} className={`w-full pl-12 pr-4 py-3 border-2 rounded-[var(--radius-lg)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all bg-white ${errors.email ? "border-[var(--error)]" : "border-gray-200 focus:border-[var(--primary)]"}`} placeholder="tu@email.com" />
              </div>
              {errors.email && <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-1 text-sm text-[var(--error)]">{errors.email}</motion.p>}
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-[var(--text-main)] mb-2">Teléfono</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="w-5 h-5 text-[var(--text-light)]" />
                </div>
                <input id="phone" type="tel" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} className={`w-full pl-12 pr-4 py-3 border-2 rounded-[var(--radius-lg)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all bg-white ${errors.phone ? "border-[var(--error)]" : "border-gray-200 focus:border-[var(--primary)]"}`} placeholder="+591 123 456 789" />
              </div>
              {errors.phone && <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-1 text-sm text-[var(--error)]">{errors.phone}</motion.p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[var(--text-main)] mb-2">Contraseña</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-[var(--text-light)]" />
                </div>
                <input id="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={(e) => handleChange("password", e.target.value)} className={`w-full pl-12 pr-12 py-3 border-2 rounded-[var(--radius-lg)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all bg-white ${errors.password ? "border-[var(--error)]" : "border-gray-200 focus:border-[var(--primary)]"}`} placeholder="••••••••" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-[var(--text-light)] hover:text-[var(--text-main)] transition-colors">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-1 text-sm text-[var(--error)]">{errors.password}</motion.p>}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[var(--text-main)] mb-2">Confirmar Contraseña</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-[var(--text-light)]" />
                </div>
                <input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={formData.confirmPassword} onChange={(e) => handleChange("confirmPassword", e.target.value)} className={`w-full pl-12 pr-12 py-3 border-2 rounded-[var(--radius-lg)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all bg-white ${errors.confirmPassword ? "border-[var(--error)]" : "border-gray-200 focus:border-[var(--primary)]"}`} placeholder="••••••••" />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-[var(--text-light)] hover:text-[var(--text-main)] transition-colors">
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-1 text-sm text-[var(--error)]">{errors.confirmPassword}</motion.p>}
            </div>
            <div>
              <label className="flex items-start cursor-pointer">
                <input type="checkbox" checked={acceptTerms} onChange={(e) => { setAcceptTerms(e.target.checked); if (errors.terms) setErrors((prev) => ({ ...prev, terms: "" })); }} className={`w-4 h-4 mt-1 text-[var(--primary)] border-gray-300 rounded focus:ring-[var(--primary)] cursor-pointer ${errors.terms ? "border-[var(--error)]" : ""}`} />
                <span className="ml-2 text-sm text-[var(--text-light)]">Acepto los <a href="#" className="text-[var(--primary)] hover:underline">Términos y Condiciones</a> y la <a href="#" className="text-[var(--primary)] hover:underline">Política de Privacidad</a></span>
              </label>
              {errors.terms && <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-1 text-sm text-[var(--error)]">{errors.terms}</motion.p>}
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isLoading} className="w-full py-4 bg-[var(--primary)] text-white rounded-[var(--radius-lg)] hover:bg-[var(--primary-dark)] transition-all shadow-[var(--shadow-primary)] hover:shadow-[var(--shadow-lg)] font-medium flex items-center justify-center gap-2 group disabled:opacity-50">
              {isLoading ? "Cargando..." : "Crear Cuenta"}
              {!isLoading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </motion.button>
          </motion.form>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-6 text-center">
            <p className="text-sm text-[var(--text-light)]">¿Ya tienes una cuenta? <button onClick={onSwitchToLogin} className="text-[var(--primary)] hover:text-[var(--primary-dark)] font-semibold transition-colors">Inicia sesión aquí</button></p>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[var(--success)] via-[var(--primary)] to-[var(--primary-dark)] relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <motion.div animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <motion.div animate={{ scale: [1.3, 1, 1.3], rotate: [-90, 0, -90] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
          <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.3, type: "spring", stiffness: 200 }} className="mb-8">
            <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl">
              <Heart className="w-16 h-16 text-white fill-white" />
            </div>
          </motion.div>
          <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="text-4xl font-bold text-center mb-4">Sé parte del cambio</motion.h2>
          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="text-lg text-white/90 text-center max-w-md mb-12">Únete a nuestra comunidad y ayuda a transformar vidas en Bolivia</motion.p>
          <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }} className="space-y-6 w-full max-w-md">
            <div className="flex items-start gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-[var(--radius-lg)]">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0"><UsersIcon className="w-6 h-6" /></div>
              <div><h3 className="font-semibold text-lg mb-2">Comunidad Activa</h3><p className="text-sm text-white/80">Únete a cientos de personas comprometidas con hacer la diferencia</p></div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-[var(--radius-lg)]">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0"><Target className="w-6 h-6" /></div>
              <div><h3 className="font-semibold text-lg mb-2">Impacto Real</h3><p className="text-sm text-white/80">Cada contribución llega directamente a quienes más lo necesitan</p></div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-[var(--radius-lg)]">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0"><Heart className="w-6 h-6 fill-white" /></div>
              <div><h3 className="font-semibold text-lg mb-2">Transparencia Total</h3><p className="text-sm text-white/80">Conoce exactamente cómo se utilizan tus donaciones</p></div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}