// src/components/ui/ValuesSection.tsx
import {
  Shield,
  Sparkles,
  Scale,
  Award,
  Lightbulb,
  CircleCheckBig,
  Heart,
  HandHeart,
  Users,
  House,
} from "lucide-react";

export const ValuesSection = () => {
  const values = [
    {
      icon: Shield,
      title: "Fidelidad y Obediencia",
      desc: "Somos fieles con cada uno de los proyectos que recibimos del Señor.",
      color: "var(--primary)",
      bg: "rgba(214, 116, 106, 0.08)",
    },
    {
      icon: Sparkles,
      title: "Fe y Esperanza",
      desc: "Fundamos nuestras acciones en la fe en Dios y en la convicción de que toda vida puede ser transformada.",
      color: "var(--success)",
      bg: "rgba(136, 164, 124, 0.08)",
    },
    {
      icon: Scale,
      title: "Justicia",
      desc: "Promovemos y practicamos la justicia de Dios en cada una de nuestras acciones.",
      color: "var(--primary-dark)",
      bg: "rgba(165, 77, 68, 0.08)",
    },
    {
      icon: Award,
      title: "Excelencia",
      desc: "Desarrollamos programas y acciones con calidad, profesionalismo y dedicación.",
      color: "var(--primary)",
      bg: "rgba(214, 116, 106, 0.08)",
    },
    {
      icon: Lightbulb,
      title: "Innovación",
      desc: "Buscamos ideas creativas que tienen el potencial para cambiar el mundo.",
      color: "var(--success)",
      bg: "rgba(136, 164, 124, 0.08)",
    },
    {
      icon: CircleCheckBig,
      title: "Integridad y Verdad",
      desc: "Gestionamos recursos, proyectos y relaciones con honestidad y responsabilidad.",
      color: "var(--primary-dark)",
      bg: "rgba(165, 77, 68, 0.08)",
    },
    {
      icon: Heart,
      title: "Amor y Compasión",
      desc: "Servimos a cada persona con el amor de Cristo, mostrando empatía y respeto.",
      color: "var(--primary)",
      bg: "rgba(214, 116, 106, 0.08)",
    },
    {
      icon: HandHeart,
      title: "Servicio",
      desc: "Actuamos con espíritu de entrega, cooperación y generosidad.",
      color: "var(--success)",
      bg: "rgba(136, 164, 124, 0.08)",
    },
    {
      icon: Users,
      title: "Unidad",
      desc: "Somos parte de un mismo cuerpo cuya cabeza es Cristo.",
      color: "var(--primary-dark)",
      bg: "rgba(165, 77, 68, 0.08)",
    },
    {
      icon: House,
      title: "Hospitalidad y Confianza",
      desc: "Acogemos a cada persona con calidez y el amor de Cristo.",
      color: "var(--primary)",
      bg: "rgba(214, 116, 106, 0.08)",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-[var(--primary-light)]/30 rounded-full text-[var(--primary)] text-sm font-medium mb-4">
            Nuestros Valores
          </div>
          <h2 className="text-4xl font-bold text-[var(--text-main)] mb-6">
            Principios que nos guían
          </h2>
          <p className="text-lg text-[var(--text-light)]">
            Nuestros principios y valores fundamentales constituyen la base de
            nuestra visión y misión, definiendo nuestro comportamiento no
            negociable.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {values.map((val, idx) => (
            <div
              key={idx}
              className="bg-[var(--bg-cream)] p-6 rounded-[var(--radius-lg)] border border-[var(--border-color)] hover:shadow-[var(--shadow-md)] transition-all hover:-translate-y-1 group"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: val.bg }}
              >
                <val.icon className="w-6 h-6" style={{ color: val.color }} />
              </div>
              <h3 className="font-semibold text-[var(--text-main)] mb-2 text-sm">
                {val.title}
              </h3>
              <p className="text-xs text-[var(--text-light)] leading-relaxed">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
