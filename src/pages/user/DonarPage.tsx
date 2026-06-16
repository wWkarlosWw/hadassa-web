import { HandHeart } from "lucide-react";

export function DonarPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
            <HandHeart className="w-6 h-6 text-[var(--primary)]" />
          </div>
          <h2 className="text-3xl font-bold text-[var(--text-main)]">Donar</h2>
        </div>
        <p className="text-[var(--text-light)] ml-[52px]">
          Contribuye a los proyectos de la fundación y transforma vidas
        </p>
      </div>

      <div className="bg-white p-8 rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)]">
        <p className="text-[var(--text-light)]">
          Aquí podrás realizar donaciones y ver tu historial de contribuciones.
        </p>
      </div>
    </div>
  );
}
