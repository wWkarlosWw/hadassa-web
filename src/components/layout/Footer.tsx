// src/components/layout/Footer.tsx
export const Footer = () => {
  return (
    <footer className="bg-[var(--text-main)] text-[var(--bg-cream)] py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <span className="font-serif font-bold text-2xl text-white block mb-2">
            Fundación Hadassa
          </span>
          <p className="text-[var(--text-light)] max-w-sm">
            Sanar, restaurar y transformar vidas con el amor de Cristo. La Paz,
            Bolivia.
          </p>
        </div>
        <div className="text-sm text-[var(--text-light)]">
          © {new Date().getFullYear()} Fundación Hadassa. Todos los derechos
          reservados.
        </div>
      </div>
    </footer>
  );
};
