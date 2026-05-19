import { Eye, EyeOff } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface AuthInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  error?: string;
  showPasswordToggle?: boolean;
}

export const AuthInput = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  icon,
  error,
  showPasswordToggle = false,
}: AuthInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password" || showPasswordToggle;

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-[var(--text-main)] mb-2"
      >
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={id}
          type={isPassword && showPasswordToggle ? (showPassword ? "text" : "password") : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full ${icon ? "pl-12" : "pl-4"} ${isPassword && showPasswordToggle ? "pr-12" : "pr-4"} py-4 border-2 rounded-[var(--radius-lg)] focus:outline-none transition-all bg-[var(--bg-white)] ${error ? "border-[var(--error)]" : "border-gray-200 focus:border-[var(--primary)]"}`}
        />
        {isPassword && showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-[var(--text-light)] hover:text-[var(--text-main)] transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-[var(--error)]"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};