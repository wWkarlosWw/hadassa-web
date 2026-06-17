// src/components/ui/DonationBanner.tsx
import { DollarSign, Package, Clock, Users } from "lucide-react";

export const DonationBanner = () => {
  const helpWays = [
    {
      icon: DollarSign,
      title: "Donación Monetaria",
      desc: "Tu contribución financiera ayuda a mantener nuestros programas y expandir nuestro alcance.",
      color: "var(--primary)",
    },
    {
      icon: Package,
      title: "Donación en Especie",
      desc: "Materiales educativos, ropa, alimentos y útiles escolares son siempre bienvenidos.",
      color: "var(--success)",
    },
    {
      icon: Clock,
      title: "Voluntariado",
      desc: "Dona tu tiempo y talentos. Profesionales, educadores y personas con corazón de servicio.",
      color: "var(--primary-dark)",
    },
    {
      icon: Users,
      title: "Difunde la Palabra",
      desc: "Comparte nuestra misión en tus redes sociales y con tu comunidad.",
      color: "var(--primary)",
    },
  ];

  return (
    <section id="ayuda" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-[var(--primary-light)]/30 rounded-full text-[var(--primary)] text-sm font-medium mb-4">Súmate a la Causa</div>
          <h2 className="text-4xl font-bold text-[var(--text-main)] mb-6">¿Cómo puedes ayudar?</h2>
          <p className="text-lg text-[var(--text-light)]">Hay muchas formas de contribuir a la transformación de vidas. Tu apoyo hace la diferencia.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {helpWays.map((way, idx) => (
            <div key={idx} className="text-center group">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all" style={{ backgroundColor: `${way.color}15` }}>
                <way.icon className="w-10 h-10" style={{ color: way.color }} />
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-main)] mb-3">{way.title}</h3>
              <p className="text-[var(--text-light)] mb-4">{way.desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] rounded-[var(--radius-lg)] p-12 text-center text-white shadow-[var(--shadow-lg)]">
          <h3 className="text-3xl font-bold mb-4">¿Listo para hacer la diferencia?</h3>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">Cada contribución, por pequeña que sea, tiene un impacto significativo en la vida de los niños y familias que servimos. Únete a nosotros hoy.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/donar" className="px-8 py-4 bg-white text-[var(--primary)] rounded-[var(--radius)] hover:bg-gray-100 transition-all shadow-lg font-semibold inline-block">Donar Ahora</a>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-[var(--radius)] hover:bg-white/10 transition-all font-semibold">Contáctanos</button>
          </div>
        </div>
      </div>
    </section>
  );
};