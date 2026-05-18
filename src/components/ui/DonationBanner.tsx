// src/components/ui/DonationBanner.tsx
import { Button } from "../common/Button";
import { Heart } from "lucide-react";

export const DonationBanner = () => {
  return (
    <section id="donar" className="py-20 px-4">
      <div className="max-w-4xl mx-auto bg-[var(--primary-dark)] rounded-[var(--radius-lg)] p-12 text-center text-white relative overflow-hidden shadow-[var(--shadow-lg)]">
        <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
          <Heart size={250} fill="currentColor" />
        </div>

        <h2 className="font-serif text-4xl font-bold mb-6 relative z-10">
          Únete a nuestra Misión
        </h2>
        <p className="text-[var(--primary-light)] text-lg mb-10 max-w-xl mx-auto relative z-10">
          Tu aporte permite que la "Casa de Fruto" y nuestros programas sigan
          llevando fe, esperanza y desarrollo integral a las familias.
        </p>

        <div className="flex flex-col gap-4 w-full max-w-xs mx-auto relative z-10">
          <Button variant="secondary" fullWidth>
            Donar $50
          </Button>
          <Button variant="secondary" fullWidth>
            Donar $100
          </Button>
          <Button
            variant="outline"
            className="bg-transparent border-white text-white hover:bg-white hover:text-[var(--primary-dark)]"
            fullWidth
          >
            Otro monto
          </Button>
        </div>
      </div>
    </section>
  );
};
