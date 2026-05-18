// src/components/ui/Hero.tsx
import { ArrowRight, HeartHandshake } from "lucide-react";
import { Button } from "../common/Button";

export const Hero = () => {
  return (
    <main
      id="inicio"
      className="relative pt-20 pb-32 flex flex-col items-center text-center px-4 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-[var(--bg-cream)]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--primary-light)] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-[var(--success)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-blue-600 font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
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
    </main>
  );
};
