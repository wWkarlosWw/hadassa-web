// src/components/ui/AboutSection.tsx
import { BookOpen, Cross, HeartPulse } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="nosotros" className="py-24 bg-[var(--bg-white)] px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16 items-center mb-20">
          <div className="md:w-1/2">
            <h2 className="font-serif text-4xl font-bold text-[var(--text-main)] mb-6">
              Nuestra Historia
            </h2>
            <p className="text-[var(--text-light)] mb-4 leading-relaxed">
              Iniciamos en 2017 con un grupo de mujeres llamadas a realizar
              acciones de misericordia hacia una población vulnerable: las
              mujeres y los niños.
            </p>
            <p className="text-[var(--text-light)] leading-relaxed">
              Nueve años después, mantenemos nuestro compromiso brindando apoyo
              a través de iniciativas como el centro de estimulación infantil
              "Casa de Fruto", dedicado a los hijos de mujeres recluidas en el
              Centro de Orientación Femenina de Obrajes, La Paz, Bolivia.
            </p>
          </div>
          <div className="md:w-1/2 bg-[var(--bg-cream)] p-8 rounded-[var(--radius-lg)] border border-[var(--border-color)]">
            <h3 className="font-serif text-2xl font-bold text-[var(--primary-dark)] mb-4">
              Visión y Misión
            </h3>
            <p className="text-[var(--text-main)] mb-4">
              <strong>Visión:</strong> Ser reconocidos por el compromiso con la
              restauración espiritual, solidaridad y servicio, transformando
              vidas para que florezca su identidad, propósito y relación con
              Dios.
            </p>
            <p className="text-[var(--text-main)]">
              <strong>Misión:</strong> Promover acciones orientadas a sanar,
              restaurar y transformar vidas, contribuyendo a la construcción de
              un presente y futuro sostenible para las familias.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="p-8 rounded-[var(--radius-lg)] bg-[var(--bg-cream)] text-center shadow-[var(--shadow-sm)]">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-white mb-6 text-[var(--primary)]">
              <BookOpen size={32} />
            </div>
            <h3 className="font-serif text-xl font-bold text-[var(--text-main)] mb-3">
              Apoyo Infantil
            </h3>
            <p className="text-[var(--text-light)]">
              Centro de estimulación "Casa de Fruto" para hijos de madres en el
              Centro de Obrajes.
            </p>
          </div>

          <div className="p-8 rounded-[var(--radius-lg)] bg-[var(--bg-cream)] text-center shadow-[var(--shadow-sm)]">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-white mb-6 text-[var(--success)]">
              <Cross size={32} />
            </div>
            <h3 className="font-serif text-xl font-bold text-[var(--text-main)] mb-3">
              Formación Integral
            </h3>
            <p className="text-[var(--text-light)]">
              Talleres de desarrollo integral para mamás y enseñanzas
              fundamentadas en la palabra de Dios.
            </p>
          </div>

          <div className="p-8 rounded-[var(--radius-lg)] bg-[var(--bg-cream)] text-center shadow-[var(--shadow-sm)]">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-white mb-6 text-blue-500">
              <HeartPulse size={32} />
            </div>
            <h3 className="font-serif text-xl font-bold text-[var(--text-main)] mb-3">
              Asistencia Médica
            </h3>
            <p className="text-[var(--text-light)]">
              Apoyo médico y atención dental integral para asegurar el bienestar
              físico de los pequeños.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
