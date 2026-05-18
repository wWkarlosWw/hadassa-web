// src/components/layout/Navbar.tsx
import { Heart } from "lucide-react";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--bg-white)]/90 backdrop-blur-lg border-b border-[var(--border-color)] transition-all duration-300 shadow-[var(--shadow-sm)]">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#inicio" className="flex items-center gap-3 group">
          <div className="bg-[var(--primary-light)] p-2 rounded-full group-hover:bg-[var(--primary)] transition-colors duration-300">
            <Heart
              className="text-[var(--primary-dark)] group-hover:text-white transition-colors duration-300"
              fill="currentColor"
              size={24}
            />
          </div>
          <span className="font-serif font-bold text-2xl text-[var(--text-main)] tracking-wide">
            Fundación Hadassa
          </span>
        </a>

        <ul className="hidden md:flex gap-8 font-semibold text-[var(--text-main)] items-center">
          <li>
            <a
              href="#inicio"
              className="hover:text-[var(--primary)] transition-colors duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--primary)] hover:after:w-full after:transition-all after:duration-300"
            >
              Inicio
            </a>
          </li>
          <li>
            <a
              href="#nosotros"
              className="hover:text-[var(--primary)] transition-colors duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--primary)] hover:after:w-full after:transition-all after:duration-300"
            >
              Historia
            </a>
          </li>
          <li>
            <a
              href="#proyectos"
              className="hover:text-[var(--primary)] transition-colors duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--primary)] hover:after:w-full after:transition-all after:duration-300"
            >
              Proyectos
            </a>
          </li>
          <li>
            <a
              href="#donar"
              className="bg-[var(--primary-light)] text-[var(--primary-dark)] px-5 py-2 rounded-full hover:bg-[var(--primary)] hover:text-white transition-all duration-300 shadow-sm"
            >
              Apoyar
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
