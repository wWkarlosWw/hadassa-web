import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

interface AuthButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export const AuthButton = ({
  children,
  type = "submit",
  onClick,
  isLoading = false,
  disabled = false,
}: AuthButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className="w-full py-4 bg-[var(--primary)] text-[var(--bg-white)] rounded-[var(--radius-lg)] hover:bg-[var(--primary-dark)] transition-all shadow-[var(--shadow-primary)] hover:shadow-[var(--shadow-lg)] font-medium flex items-center justify-center gap-2 group disabled:opacity-50"
    >
      {isLoading ? "Cargando..." : children}
      {!isLoading && (
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      )}
    </motion.button>
  );
};