// src/components/ui/MissionVisionSection.tsx
import { Target, Eye } from "lucide-react";

export const MissionVisionSection = () => {
  return (
    <section id="mision" className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--bg-cream)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-white p-10 rounded-[var(--radius-lg)] shadow-[var(--shadow-md)] border border-[var(--border-color)]">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                <Target className="w-8 h-8 text-[var(--primary)]" />
              </div>
              <h2 className="text-3xl font-bold text-[var(--text-main)]">Nuestra Misión</h2>
            </div>
            <p className="text-lg text-[var(--text-light)] leading-relaxed">
              Promovemos acciones de alcance social y formación espiritual orientadas a<span className="text-[var(--primary)] font-semibold"> sanar, restaurar y transformar vidas</span>, contribuyendo a la construcción de un presente y un futuro que generen un impacto positivo y sostenible en las familias y en la sociedad.
            </p>
          </div>
          <div className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] p-10 rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] text-white">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold">Nuestra Visión</h2>
            </div>
            <p className="text-lg text-white/90 leading-relaxed">
              Ser una fundación reconocida en toda la sociedad por su compromiso con la<span className="font-semibold"> restauración espiritual, la solidaridad y el servicio</span>. Aspiramos a transformar vidas y comunidades mediante proyectos y programas de alta calidad, especialmente orientados a personas y familias con necesidades diversas, floreciendo su identidad, propósito y relación con Dios.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};