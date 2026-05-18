// src/components/ui/Hero.tsx
import { ArrowRight, Heart } from "lucide-react";

export const Hero = () => {
  return (
    <section id="inicio" className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-cream)] via-[var(--primary-light)]/20 to-[var(--bg-cream)]"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-[var(--shadow-sm)]">
              <Heart className="w-4 h-4 text-[var(--primary)] fill-[var(--primary)]" />
              <span className="text-sm text-[var(--text-main)]">9 años transformando vidas</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-[var(--text-main)] leading-tight">
              Sembrando esperanza,<span className="text-[var(--primary)]"> cosechando futuro</span>
            </h1>
            <p className="text-lg text-[var(--text-light)] leading-relaxed">
              Promovemos acciones de alcance social y formación espiritual orientadas a sanar, restaurar y transformar vidas de mujeres y niños en situación vulnerable.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-[var(--primary)] text-white rounded-[var(--radius)] hover:bg-[var(--primary-dark)] transition-all shadow-[var(--shadow-primary)] hover:shadow-[var(--shadow-lg)] flex items-center gap-2 group">
                Únete a la causa
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white text-[var(--text-main)] rounded-[var(--radius)] hover:bg-gray-50 transition-all shadow-[var(--shadow-sm)]">
                Conoce más
              </button>
            </div>
            <div className="flex gap-12 pt-8 border-t border-[var(--border-color)]">
              <div>
                <div className="text-3xl font-bold text-[var(--primary)]">9+</div>
                <div className="text-sm text-[var(--text-light)]">Años de servicio</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[var(--primary)]">100+</div>
                <div className="text-sm text-[var(--text-light)]">Niños beneficiados</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[var(--primary)]">50+</div>
                <div className="text-sm text-[var(--text-light)]">Familias apoyadas</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-lg)]">
              <img
                src="https://images.unsplash.com/photo-1531983412531-1f49a365ffed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Madre e hijo"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/40 to-transparent"></div>
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] max-w-xs">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--success)]/20 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-[var(--success)]" />
                </div>
                <div>
                  <div className="font-semibold text-[var(--text-main)]">Casa de Fruto</div>
                  <div className="text-sm text-[var(--text-light)] mt-1">Centro de estimulación infantil para hijos de mujeres en el COF</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};