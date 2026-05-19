import { useAuth } from "@/context";
import { Heart, Users, Calendar, HeartHandshake, LogOut } from "lucide-react";

export function Dashboard() {
  const { user, logout } = useAuth();

  const stats = [
    { label: "Donaciones", value: "12", icon: HeartHandshake, color: "var(--primary)" },
    { label: "Eventos", value: "3", icon: Calendar, color: "var(--success)" },
    { label: "Horas voluntarias", value: "48", icon: Users, color: "var(--primary-dark)" },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-cream)]">
      <header className="bg-white shadow-[var(--shadow-sm)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[var(--primary)] flex items-center justify-center">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-[var(--text-main)]">Fundación Hadassa</h1>
              <p className="text-sm text-[var(--text-light)]">Panel de Usuario</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[var(--text-light)]">Bienvenido, {user?.name}</span>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 text-[var(--text-light)] hover:text-[var(--primary)] transition-colors"
            >
              <LogOut size={18} />
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[var(--text-main)]">Mi Panel</h2>
          <p className="text-[var(--text-light)] mt-2">Gestiona tu cuenta y contribuciones</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)]">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                  <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                <span className="text-3xl font-bold text-[var(--text-main)]">{stat.value}</span>
              </div>
              <p className="text-[var(--text-light)]">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)]">
          <h3 className="text-xl font-semibold text-[var(--text-main)] mb-4">Información de tu cuenta</h3>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="text-[var(--text-light)] w-32">Nombre:</span>
              <span className="font-medium text-[var(--text-main)]">{user?.name}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="text-[var(--text-light)] w-32">Correo:</span>
              <span className="font-medium text-[var(--text-main)]">{user?.email}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="text-[var(--text-light)] w-32">Rol:</span>
              <span className="px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-sm font-medium capitalize">{user?.role}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}