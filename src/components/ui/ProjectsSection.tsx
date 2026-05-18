// src/components/ui/ProjectsSection.tsx
import { GraduationCap, Heart, Users, BookOpen } from "lucide-react";

export const ProjectsSection = () => {
  return (
    <section id="proyectos" className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--bg-cream)]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-[var(--primary-light)]/30 rounded-full text-[var(--primary)] text-sm font-medium mb-4">Nuestros Proyectos</div>
          <h2 className="text-4xl font-bold text-[var(--text-main)] mb-6">Casa de Fruto</h2>
          <p className="text-lg text-[var(--text-light)]">Nuestro centro de estimulación infantil donde los niños reciben amor, educación y cuidado integral mientras sus madres están en el Centro de Orientación Femenina.</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <div className="relative rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-lg)]">
              <img src="https://images.unsplash.com/photo-1475609471617-0ef53b59cff5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" alt="Niños en Casa de Fruto" className="w-full h-[500px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Transformando el futuro</h3>
                <p className="text-white/90">Un niño a la vez</p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)] flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <div>
                <h4 className="font-semibold text-[var(--text-main)] mb-2">Educación y Estimulación</h4>
                <p className="text-sm text-[var(--text-light)]">Proporcionamos educación de calidad y actividades de estimulación temprana adaptadas a cada etapa del desarrollo infantil.</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)] flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[var(--success)]/10 flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-[var(--success)]" />
              </div>
              <div>
                <h4 className="font-semibold text-[var(--text-main)] mb-2">Cuidado Integral</h4>
                <p className="text-sm text-[var(--text-light)]">Ofrecemos atención médica, dental y nutricional para garantizar el bienestar completo de cada niño que asiste a Casa de Fruto.</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)] flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[var(--primary-dark)]/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-[var(--primary-dark)]" />
              </div>
              <div>
                <h4 className="font-semibold text-[var(--text-main)] mb-2">Apoyo Familiar</h4>
                <p className="text-sm text-[var(--text-light)]">Trabajamos con las madres a través de talleres de desarrollo integral y formación espiritual para fortalecer el núcleo familiar.</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)] flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <div>
                <h4 className="font-semibold text-[var(--text-main)] mb-2">Formación Espiritual</h4>
                <p className="text-sm text-[var(--text-light)]">Compartimos enseñanzas sobre la palabra de Dios, sembrando valores y esperanza en el corazón de niños y familias.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};