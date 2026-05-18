// src/components/ui/ImpactSection.tsx
import { Users, Utensils, GraduationCap, Heart } from "lucide-react";

export const ImpactSection = () => {
  const stats = [
    {
      icon: <Users size={36} />,
      value: "+5,000",
      label: "Familias Ayudadas",
      color: "text-[var(--primary)]",
      bg: "bg-[var(--primary-light)]",
    },
    {
      icon: <Utensils size={36} />,
      value: "+12,000",
      label: "Raciones Entregadas",
      color: "text-[var(--success)]",
      bg: "bg-[var(--success)]/20",
    },
    {
      icon: <GraduationCap size={36} />,
      value: "300+",
      label: "Becas Escolares",
      color: "text-[var(--primary-dark)]",
      bg: "bg-[var(--primary-light)]",
    },
    {
      icon: <Heart size={36} />,
      value: "9",
      label: "Años de Servicio",
      color: "text-[var(--primary)]",
      bg: "bg-[var(--primary)]/20",
    },
  ];

  return (
    <section id="impacto" className="py-24 bg-[var(--bg-white)] px-4 relative overflow-hidden">
      <div className="absolute top-10 right-10 w-32 h-32 bg-[var(--primary-light)] rounded-full blur-2xl opacity-50"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-[var(--success)]/30 rounded-full blur-2xl opacity-50"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-[var(--primary)] font-semibold uppercase tracking-wider text-sm">Impacto Real</span>
          <h2 className="font-serif text-4xl font-bold text-[var(--text-main)] mt-2 mb-4">
            Nuestro Impacto
          </h2>
          <p className="text-[var(--text-light)] max-w-2xl mx-auto">
            Gracias a las donaciones, hemos podido alcanzar metas increíbles durante este último año.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group p-8 rounded-[var(--radius-lg)] bg-[var(--bg-cream)] text-center shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] transition-all duration-300 hover:-translate-y-2 border border-transparent hover:border-[var(--primary)]"
            >
              <div className={`mx-auto w-20 h-20 flex items-center justify-center rounded-full ${stat.bg} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <span className={stat.color}>{stat.icon}</span>
              </div>
              <h3 className="font-serif text-4xl font-bold text-[var(--text-main)] mb-2">
                {stat.value}
              </h3>
              <p className="text-[var(--text-light)] font-medium text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
