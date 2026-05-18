// src/components/common/Button.tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "secondary";
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}) => {
  const baseStyle =
    "px-8 py-4 rounded-[var(--radius-lg)] font-semibold flex items-center justify-center gap-2 transition-all duration-300";
  const widthStyle = fullWidth ? "w-full" : "w-auto";

  const variants = {
    primary:
      "bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] shadow-[var(--shadow-primary)] hover:-translate-y-1",
    secondary:
      "bg-[var(--bg-white)] text-[var(--text-main)] hover:bg-[var(--bg-cream)] shadow-[var(--shadow-sm)]",
    outline:
      "border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary-light)] hover:text-white",
  };

  return (
    <button
      className={`${baseStyle} ${widthStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
