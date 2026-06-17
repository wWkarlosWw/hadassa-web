// src/components/layout/Navbar.tsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import logoHadassa from "../../assets/hadassa/Hadassa_logo.png";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { hash: "inicio", label: "Inicio" },
    { hash: "nosotros", label: "Nosotros" },
    { hash: "mision", label: "Misión" },
    { hash: "proyectos", label: "Proyectos" },
  ];

  const handleNavClick = (hash: string) => {
    if (isHome) {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/#${hash}`);
    }
    setMobileOpen(false);
  };

  const handleLogoClick = () => {
    if (isHome) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${isHome && !scrolled ? "bg-transparent py-5" : "bg-[var(--bg-white)] shadow-[var(--shadow-md)] py-3"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <button onClick={handleLogoClick} className="flex items-center gap-3 group">
            <div className="w-20 h-20 rounded-full flex items-center justify-center ">
              <img src={logoHadassa} alt="Logo Hadassa" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-[var(--text-main)]">
                Fundación Hadassa
              </h1>
              <p className="text-sm text-[var(--text-light)]">
                Transformando vidas
              </p>
            </div>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.hash}
                onClick={() => handleNavClick(link.hash)}
                className="text-[var(--text-main)] hover:text-[var(--primary)] transition-colors duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--primary)] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </button>
            ))}
            <a href="/donar" className="px-6 py-2.5 bg-[var(--primary)] text-white rounded-[var(--radius)] hover:bg-[var(--primary-dark)] transition-all shadow-[var(--shadow-primary)] hover:shadow-[var(--shadow-lg)]">
              Donar Ahora
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/login"
              className="hidden md:flex items-center gap-2 text-[var(--text-main)] hover:text-[var(--primary)] transition-colors duration-300"
            >
              <User size={20} />
              <span className="font-medium">Iniciar Sesión</span>
            </a>

            <button
              className="md:hidden p-2 text-[var(--text-main)]"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[var(--bg-white)] shadow-[var(--shadow-lg)] border-t border-[var(--border-color)]">
          <ul className="py-4 px-6 space-y-4">
            {navLinks.map((link) => (
              <li key={link.hash}>
                <button
                  onClick={() => handleNavClick(link.hash)}
                  className="block text-[var(--text-main)] font-medium py-2 hover:text-[var(--primary)] transition-colors"
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li>
              <a
                href="/login"
                className="block text-[var(--text-main)] font-medium py-2 hover:text-[var(--primary)] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Iniciar Sesión
              </a>
            </li>
            <li>
              <a
                href="/donar"
                className="block w-full bg-[var(--primary)] text-white text-center px-5 py-3 rounded-[var(--radius)] mt-2"
                onClick={() => setMobileOpen(false)}
              >
                Donar Ahora
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
