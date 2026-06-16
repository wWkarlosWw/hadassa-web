import { useState, useEffect } from "react";
import { Users, Building2, Calendar, BadgePercent, ArrowRight } from "lucide-react";
import { userService } from "@/services/user.service";
import { organizationService } from "@/services/organization.service";
import { eventService } from "@/services/event.service";
import { discountService } from "@/services/discount.service";
import { donationService } from "@/services/donation.service";
import { useNavigate } from "react-router-dom";
import type { Donation } from "@/types/models";

export function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ users: 0, organizations: 0, events: 0, discounts: 0 });
  const [recentDonations, setRecentDonations] = useState<Donation[]>([]);

  useEffect(() => {
    Promise.all([
      userService.getAll(),
      organizationService.getAll(),
      eventService.getAll(),
      discountService.getAll(),
      donationService.getAll(),
    ])
      .then(([users, orgs, evts, disc, dons]) => {
        setStats({
          users: users.length,
          organizations: orgs.length,
          events: evts.length,
          discounts: disc.length,
        });
        setRecentDonations(dons.slice(-5).reverse());
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    { label: "Usuarios", value: stats.users, icon: Users, color: "var(--primary)", link: "/dashboard/usuarios" },
    { label: "Organizaciones", value: stats.organizations, icon: Building2, color: "#3b82f6", link: "/dashboard/organizaciones" },
    { label: "Eventos", value: stats.events, icon: Calendar, color: "#22c55e", link: "/dashboard/eventos" },
    { label: "Descuentos", value: stats.discounts, icon: BadgePercent, color: "#a855f7", link: "/dashboard/descuentos-admin" },
  ];

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      PENDING: "bg-yellow-100 text-yellow-800",
      APPROVED: "bg-green-100 text-green-800",
      REJECTED: "bg-red-100 text-red-800",
    };
    return `px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || "bg-gray-100 text-gray-800"}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[var(--text-main)]">Panel de Administración</h2>
        <p className="text-[var(--text-light)] mt-2">Resumen general del sistema</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)] cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate(stat.link)}
          >
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

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-[var(--text-main)]">Donaciones Recientes</h3>
            <button
              onClick={() => navigate("/dashboard/usuarios")}
              className="text-sm text-[var(--primary)] flex items-center gap-1 hover:underline"
            >
              Ver más <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          {recentDonations.length === 0 ? (
            <p className="text-[var(--text-light)] text-center py-4 text-sm">No hay donaciones recientes</p>
          ) : (
            <div className="space-y-3">
              {recentDonations.map((d) => (
                <div key={d.id} className="flex items-center justify-between py-2 border-b border-[var(--border-color)] last:border-0">
                  <div>
                    <p className="text-sm font-medium text-[var(--text-main)]">{d.user?.name || "Usuario"}</p>
                    <p className="text-xs text-[var(--text-light)]">{d.organization?.name || "-"}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[var(--text-main)]">Bs. {d.amount.toFixed(2)}</p>
                    <span className={statusBadge(d.status)}>{d.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)]">
          <h3 className="text-xl font-semibold text-[var(--text-main)] mb-4">Accesos Rápidos</h3>
          <div className="grid grid-cols-2 gap-3">
            {statCards.map((stat, idx) => (
              <button
                key={idx}
                onClick={() => navigate(stat.link)}
                className="flex items-center gap-3 p-4 rounded-[var(--radius)] border border-[var(--border-color)] hover:bg-[var(--bg-cream)] transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <span className="text-sm font-medium text-[var(--text-main)]">{stat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
