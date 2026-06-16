import { Calendar } from "lucide-react";

export function ActividadesPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-[var(--primary)]" />
          </div>
          <h2 className="text-3xl font-bold text-[var(--text-main)]">Actividades</h2>
        </div>
        <p className="text-[var(--text-light)] ml-[52px]">
          Próximos eventos y actividades de la fundación
        </p>
      </div>

      <div className="bg-white p-8 rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)]">
        <p className="text-[var(--text-light)]">
          Aquí podrás ver las actividades disponibles e inscribirte.
        </p>
      </div>
    </div>
  );
}
