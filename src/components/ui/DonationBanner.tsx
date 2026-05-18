// src/components/ui/DonationBanner.tsx
import { Button } from "../common/Button";
import { Heart, Sparkles } from "lucide-react";

export const DonationBanner = () => {
  return (
    <section id="donar" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)]"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-4xl mx-auto relative z-10 text-center text-white">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles className="text-white/80" size={20} />
          <span className="text-white/80 font-semibold uppercase tracking-wider text-sm">Únete a nuestra misión</span>
        </div>
        
        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
          Transforma Vidas Hoy
        </h2>
        <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Tu aporte permite que la "Casa de Fruto" y nuestros programas sigan
          llevando fe, esperanza y desarrollo integral a las familias más necesitadas.
        </p>

        <div className="flex flex-col gap-4 w-full max-w-sm mx-auto mb-8">
          <Button 
            variant="secondary" 
            fullWidth
            className="bg-white text-[var(--primary-dark)] hover:bg-white/90 hover:scale-105 transition-all"
          >
            <Heart size={18} fill="currentColor" />
            <span>Donar $50</span>
          </Button>
          <Button 
            variant="secondary" 
            fullWidth
            className="bg-white text-[var(--primary-dark)] hover:bg-white/90 hover:scale-105 transition-all"
          >
            <Heart size={18} fill="currentColor" />
            <span>Donar $100</span>
          </Button>
          <Button 
            variant="outline" 
            fullWidth
            className="bg-transparent border-2 border-white/50 text-white hover:bg-white hover:text-[var(--primary-dark)]"
          >
            Otro monto
          </Button>
        </div>

        <p className="text-white/60 text-sm">
          💚 Cada donation cuenta y hace la diferencia
        </p>
      </div>
    </section>
  );
};
