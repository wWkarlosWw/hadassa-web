import { Users, BookOpen, Utensils } from "lucide-react";

export const ImpactSection = () => {
  const stats = [
    {
      icon: <Users size={32} className="text-[var(--primary)]" />,
      value: "+5,000",
      label: "Familias Ayudadas",
    },
    {
      icon: <Utensils size={32} className="text-[var(--success)]" />,
      value: "+12,000",
      label: "Raciones Entregadas",
    },
    {
      icon: <BookOpen size={32} className="text-blue-500" />,
      value: "300",
      label: "Becas Escolares",
    },
  ];

  return (
    <section id="impacto" className="py-24 bg-[var(--bg-white)] px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold text-[var(--text-main)] mb-4">
            Nuestro Impacto
          </h2>
          <p className="text-[var(--text-light)] max-w-2xl mx-auto">
            Gracias a las donaciones, hemos podido alcanzar metas increíbles
            durante este último año.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-8 rounded-[var(--radius-lg)] bg-[var(--bg-cream)] text-center shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all duration-300"
            >
              <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-white shadow-sm mb-6">
                {stat.icon}
              </div>
              <h3 className="font-serif text-3xl font-bold text-[var(--text-main)] mb-2">
                {stat.value}
              </h3>
              <p className="text-[var(--text-light)] font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
