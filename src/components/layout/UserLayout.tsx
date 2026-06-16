import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "@/context";
import { Heart, HandHeart, Tag, Calendar, LogOut } from "lucide-react";
import logoHadassa from "../../assets/hadassa/Hadassa_logo.png";

const navItems = [
  { to: "/dashboard/donar", icon: HandHeart, label: "Donar" },
  { to: "/dashboard/descuentos", icon: Tag, label: "Descuentos" },
  { to: "/dashboard/actividades", icon: Calendar, label: "Actividades" },
];

export function UserLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[var(--bg-cream)] flex">
      <aside className="w-64 bg-white border-r border-[var(--border-color)] flex flex-col shrink-0">
        <div className="p-6 border-b border-[var(--border-color)]">
          <NavLink to="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center">
              <img src={logoHadassa} alt="Logo Hadassa" className="w-full h-full object-contain" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[var(--text-main)]">Fundación Hadassa</h2>
              <p className="text-xs text-[var(--text-light)]">Panel de Usuario</p>
            </div>
          </NavLink>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-[var(--radius)] text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                    : "text-[var(--text-light)] hover:bg-[var(--bg-cream)] hover:text-[var(--text-main)]"
                }`
              }
            >
              <Icon size={20} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-[var(--border-color)] space-y-3">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-9 h-9 rounded-full bg-[var(--primary)] flex items-center justify-center">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-[var(--text-main)] truncate">{user?.name}</p>
              <p className="text-xs text-[var(--text-light)] capitalize">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-[var(--radius)] text-sm font-medium text-[var(--text-light)] hover:text-[var(--error)] hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
