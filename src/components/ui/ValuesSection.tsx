// src/components/ui/ValuesSection.tsx
import { Sparkles } from "lucide-react";

export const ValuesSection = () => {
  const values = [
    {
      title: "Fidelidad",
      desc: "Fieles con cada proyecto que recibimos del Señor.",
    },
    {
      title: "Fe y Esperanza",
      desc: "Toda vida puede ser transformada por la gracia de Dios.",
    },
    {
      title: "Justicia",
      desc: "Practicamos la justicia de Dios para dar fruto abundante.",
    },
    {
      title: "Excelencia",
      desc: "Calidad, profesionalismo y dedicación en cada labor.",
    },
    {
      title: "Innovación",
      desc: "Ideas creativas sin comprometer nuestros valores.",
    },
    {
      title: "Integridad",
      desc: "Gestión de recursos con honestidad y responsabilidad.",
    },
    {
      title: "Amor y Compasión",
      desc: "Empatía, respeto y sensibilidad ante las realidades humanas.",
    },
    {
      title: "Servicio",
      desc: "Actuamos con espíritu de entrega y generosidad.",
    },
    {
      title: "Unidad",
      desc: "Somos parte de un mismo cuerpo cuya cabeza es Cristo.",
    },
    {
      title: "Hospitalidad",
      desc: "Acogemos a cada persona con calidez y amor.",
    },
    {
      title: "Confianza",
      desc: "Construimos relaciones sólidas basadas en transparencia.",
    },
  ];

  return (
    <section className="py-24 bg-[var(--bg-cream)] px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-[var(--primary-light)] rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[var(--success)] rounded-full blur-3xl opacity-20"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="text-[var(--primary)]" size={24} />
            <span className="text-[var(--primary)] font-semibold uppercase tracking-wider text-sm">Nuestros valores</span>
          </div>
          <h2 className="font-serif text-4xl font-bold text-[var(--text-main)] mb-4">
            Principios que Nos Guían
          </h2>
          <p className="text-[var(--text-light)] max-w-2xl mx-auto">
            La base de nuestra visión y misión que define nuestro comportamiento no negociable.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {values.map((val, idx) => (
            <div
              key={idx}
              className="group bg-white p-6 rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] border-b-4 border-transparent hover:border-[var(--primary)] transition-all duration-300 hover:-translate-y-2"
            >
              <h4 className="font-serif font-bold text-[var(--text-main)] text-lg mb-3 group-hover:text-[var(--primary)] transition-colors">
                {val.title}
              </h4>
              <p className="text-[var(--text-light)] text-sm leading-relaxed">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
