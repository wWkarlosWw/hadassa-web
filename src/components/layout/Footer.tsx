// src/components/layout/Footer.tsx
import { Heart, Mail, MapPin, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[var(--text-main)] text-[var(--bg-cream)] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/src/assets/hadassa/Hadassa_logo.png" alt="Hadassa" className="h-10" />
            </div>
            <p className="text-[var(--text-light)] max-w-sm mb-6 leading-relaxed">
              Promovemos acciones orientadas a sanar, restaurar y transformar vidas, generando un impacto positivo y sostenible en las familias de La Paz, Bolivia.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center hover:bg-[var(--primary)] transition-all duration-300">
                <span className="text-sm font-bold">F</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center hover:bg-[var(--primary)] transition-all duration-300">
                <span className="text-sm font-bold">I</span>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4 uppercase text-sm tracking-wider">Contacto</h4>
            <ul className="space-y-3 text-[var(--text-light)]">
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-[var(--primary)]" />
                <span>La Paz, Bolivia</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[var(--primary)]" />
                <span>fundacion@hadassa.org</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[var(--primary)]" />
                <span>+591 70000000</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4 uppercase text-sm tracking-wider">Enlaces</h4>
            <ul className="space-y-2 text-[var(--text-light)]">
              <li><a href="#inicio" className="hover:text-[var(--primary)] transition-colors">Inicio</a></li>
              <li><a href="#nosotros" className="hover:text-[var(--primary)] transition-colors">Nosotros</a></li>
              <li><a href="#proyectos" className="hover:text-[var(--primary)] transition-colors">Proyectos</a></li>
              <li><a href="#donar" className="hover:text-[var(--primary)] transition-colors">Donar</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[var(--text-light)]/20 pt-8 text-center">
          <p className="text-[var(--text-light)] text-sm">
            © {new Date().getFullYear()} Fundación Hadassa. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
