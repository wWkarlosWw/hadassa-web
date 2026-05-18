// src/components/ui/Hero.tsx
import { ArrowRight, HeartHandshake } from "lucide-react";
import { Button } from "../common/Button";

export const Hero = () => {
  return (
    <main
      id="inicio"
      className="relative pt-32 pb-24 flex flex-col items-center text-center px-4 overflow-hidden"
    >
      <div className="absolute inset-0 -z-20 bg-[var(--bg-cream)]">
        <img 
          src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1920&h=1080&fit=crop" 
          alt="Fondo" 
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute top-20 right-0 w-96 h-96 bg-[var(--primary-light)] rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
        <div className="absolute top-40 left-0 w-72 h-72 bg-[var(--success)] rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-[var(--primary)]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
        <h1 className="text-[var(--primary-dark)] font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight drop-shadow-sm">
          Restaurando Vidas,
          <br /> Construyendo Futuro
        </h1>

        <p className="text-[var(--text-light)] text-lg md:text-xl max-w-3xl mb-12 leading-relaxed">
          Promovemos acciones de alcance social y formación espiritual
          orientadas a sanar y transformar a mujeres y niños vulnerables,
          generando un impacto positivo y sostenible en la sociedad desde el
          2017.
        </p>

        <div className="flex flex-col gap-4 w-full max-w-sm">
          <Button variant="primary" fullWidth>
            <HeartHandshake size={20} />
            <span>Apoyar la Causa</span>
          </Button>
          <Button variant="outline" fullWidth>
            <span>Nuestra Historia</span>
            <ArrowRight size={20} />
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[var(--primary)] rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-[var(--primary)] rounded-full animate-pulse"></div>
        </div>
      </div>
    </main>
  );
};
