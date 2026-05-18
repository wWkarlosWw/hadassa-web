// src/components/layout/Navbar.tsx
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#inicio", label: "Inicio" },
    { href: "#nosotros", label: "Nosotros" },
    { href: "#impacto", label: "Impacto" },
    { href: "#donar", label: "Donar" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${scrolled ? "bg-[var(--bg-white)] shadow-[var(--shadow-md)] py-3" : "bg-transparent py-5"}`}>
      <nav className="container mx-auto px-6 flex justify-between items-center">
        <a href="#inicio" className="flex items-center gap-3 group">
          <img src="/src/assets/hadassa/Hadassa_logo.png" alt="Fundación Hadassa" className={`transition-all duration-300 ${scrolled ? "h-10" : "h-14"}`} />
        </a>

        <ul className="hidden md:flex gap-8 font-semibold text-[var(--text-main)] items-center">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="hover:text-[var(--primary)] transition-colors duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--primary)] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#donar"
              className="bg-[var(--primary)] text-white px-5 py-2 rounded-full hover:bg-[var(--primary-dark)] transition-all duration-300 shadow-[var(--shadow-primary)] hover:scale-105"
            >
              Apoyar
            </a>
          </li>
        </ul>

        <button 
          className="md:hidden p-2 text-[var(--text-main)]"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden bg-[var(--bg-white)] shadow-[var(--shadow-lg)] border-t border-[var(--border-color)]">
          <ul className="py-4 px-6 space-y-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block text-[var(--text-main)] font-medium py-2 hover:text-[var(--primary)] transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#donar"
                className="block bg-[var(--primary)] text-white text-center px-5 py-3 rounded-full mt-2"
                onClick={() => setMobileOpen(false)}
              >
                Apoyar
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
