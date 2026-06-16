import { Tag } from "lucide-react";

export function DescuentosPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
            <Tag className="w-6 h-6 text-[var(--primary)]" />
          </div>
          <h2 className="text-3xl font-bold text-[var(--text-main)]">Descuentos</h2>
        </div>
        <p className="text-[var(--text-light)] ml-[52px]">
          Beneficios y descuentos exclusivos para miembros de la fundación
        </p>
      </div>

      <div className="bg-white p-8 rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)]">
        <p className="text-[var(--text-light)]">
          Aquí podrás ver y gestionar tus descuentos disponibles.
        </p>
      </div>
    </div>
  );
}
