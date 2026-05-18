// src/components/ui/ValuesSection.tsx
export const ValuesSection = () => {
  const values = [
    {
      title: "Fidelidad y obediencia",
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
      title: "Integridad y Verdad",
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
  ];

  return (
    <section className="py-20 bg-[var(--bg-cream)] px-4 border-t border-[var(--border-color)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-[var(--text-main)] mb-4">
            Nuestros Principios y Valores
          </h2>
          <p className="text-[var(--text-light)]">
            La base de nuestra visión y misión que define nuestro comportamiento
            no negociable.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {values.map((val, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-[var(--radius)] shadow-[var(--shadow-sm)] border-l-4 border-[var(--primary)]"
            >
              <h4 className="font-bold text-[var(--text-main)] text-sm uppercase mb-2">
                {val.title}
              </h4>
              <p className="text-[var(--text-light)] text-xs leading-relaxed">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
