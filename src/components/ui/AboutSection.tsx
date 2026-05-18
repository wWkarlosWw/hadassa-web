// src/components/ui/AboutSection.tsx
import { Users, BookHeart, Stethoscope } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="nosotros" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-[var(--primary-light)]/30 rounded-full text-[var(--primary)] text-sm font-medium mb-4">Nuestra Historia</div>
          <h2 className="text-4xl font-bold text-[var(--text-main)] mb-6">9 años de compromiso y amor</h2>
          <p className="text-lg text-[var(--text-light)] leading-relaxed">
            Fundación Hadassa inicia el año 2017 con un grupo de mujeres llamadas a realizar acciones de misericordia a una población en estado vulnerable como lo son las mujeres y los niños. Nueve años después seguimos haciendo lo mismo como Fundación.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="relative rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-md)]">
            <img
              src="https://images.unsplash.com/photo-1589529800500-8a1a1a047e0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
              alt="Apoyo familiar"
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="relative rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-md)]">
            <img
              src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
              alt="Trabajo en equipo"
              className="w-full h-96 object-cover"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-[var(--bg-cream)] p-8 rounded-[var(--radius-lg)] border border-[var(--border-color)] hover:shadow-[var(--shadow-md)] transition-all">
            <div className="w-14 h-14 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-6">
              <Users className="w-7 h-7 text-[var(--primary)]" />
            </div>
            <h3 className="text-xl font-semibold text-[var(--text-main)] mb-4">Apoyo Escolar</h3>
            <p className="text-[var(--text-light)] leading-relaxed">
              Brindamos apoyo escolar a través de nuestro centro de estimulación infantil "Casa de Fruto" para niños hijos de mujeres recluidas en el COF.
            </p>
          </div>
          <div className="bg-[var(--bg-cream)] p-8 rounded-[var(--radius-lg)] border border-[var(--border-color)] hover:shadow-[var(--shadow-md)] transition-all">
            <div className="w-14 h-14 rounded-full bg-[var(--success)]/10 flex items-center justify-center mb-6">
              <BookHeart className="w-7 h-7 text-[var(--success)]" />
            </div>
            <h3 className="text-xl font-semibold text-[var(--text-main)] mb-4">Talleres y Formación</h3>
            <p className="text-[var(--text-light)] leading-relaxed">
              Realizamos talleres sobre desarrollo integral para las mamás y enseñanzas sobre la palabra de Dios para su crecimiento espiritual.
            </p>
          </div>
          <div className="bg-[var(--bg-cream)] p-8 rounded-[var(--radius-lg)] border border-[var(--border-color)] hover:shadow-[var(--shadow-md)] transition-all">
            <div className="w-14 h-14 rounded-full bg-[var(--primary-dark)]/10 flex items-center justify-center mb-6">
              <Stethoscope className="w-7 h-7 text-[var(--primary-dark)]" />
            </div>
            <h3 className="text-xl font-semibold text-[var(--text-main)] mb-4">Apoyo Médico</h3>
            <p className="text-[var(--text-light)] leading-relaxed">
              Proporcionamos apoyo médico y dental para los pequeños, asegurando su bienestar físico y desarrollo saludable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};