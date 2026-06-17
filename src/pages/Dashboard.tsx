import { useState, useEffect } from "react";
import { Users, Calendar, HeartHandshake, Building2, Megaphone, BadgePercent, ClipboardCheck, ShieldCheck, Wallet, Star, User, Mail, Shield } from "lucide-react";
import { useAuth } from "@/context";
import { donationService } from "@/services/donation.service";
import { organizationService } from "@/services/organization.service";
import { eventService } from "@/services/event.service";
import { discountService } from "@/services/discount.service";
import { userService } from "@/services/user.service";
import { participationService } from "@/services/event.service";
import type { UserRole } from "@/types";
import type { Donation } from "@/types/models";

export function Dashboard() {
  const { user, refreshUser } = useAuth();
  const role = (user?.role || "USER") as UserRole;
  const [stats, setStats] = useState<{ label: string; value: string; icon: React.ElementType; color: string }[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);

  const totalDonated = donations.reduce((sum, d) => sum + d.amount, 0);
  const totalPending = donations
    .filter((d) => d.status === "PENDING")
    .reduce((sum, d) => sum + d.amount, 0);
  const userPoints = user?.points ?? 0;

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      PENDING: "bg-yellow-100 text-yellow-800",
      APPROVED: "bg-green-100 text-green-800",
      REJECTED: "bg-red-100 text-red-800",
    };
    return `px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || "bg-gray-100 text-gray-800"}`;
  };

  const formatCurrency = (val?: number) => {
    return `Bs. ${(val ?? 0).toFixed(2)}`;
  };

  useEffect(() => {
    async function loadStats() {
      try {
        await refreshUser()
        if (role === "ADMIN") {
          const [users, orgs, events, discounts] = await Promise.all([
            userService.getAll().then(r => r.length.toString()).catch(() => "0"),
            organizationService.getAll().then(r => r.length.toString()).catch(() => "0"),
            eventService.getAll().then(r => r.length.toString()).catch(() => "0"),
            discountService.getAll().then(r => r.length.toString()).catch(() => "0"),
          ]);
          setStats([
            { label: "Usuarios", value: users, icon: Users, color: "var(--primary)" },
            { label: "Organizaciones", value: orgs, icon: Building2, color: "var(--success)" },
            { label: "Eventos", value: events, icon: Megaphone, color: "var(--primary-dark)" },
            { label: "Descuentos", value: discounts, icon: BadgePercent, color: "var(--primary)" },
          ]);
        } else if (role === "SUPERVISOR") {
          const [pendingDonations, pendingAttendances] = await Promise.all([
            donationService.getAll().then(r => r.filter(d => d.status === "PENDING").length.toString()).catch(() => "0"),
            participationService.getAll().then(r => r.filter(p => p.status === "REGISTERED").length.toString()).catch(() => "0"),
          ]);
          setStats([
            { label: "Donaciones Pendientes", value: pendingDonations, icon: ClipboardCheck, color: "var(--primary)" },
            { label: "Asistencias Pendientes", value: pendingAttendances, icon: ShieldCheck, color: "var(--success)" },
          ]);
        }
        if (role === "USER" || role === "GUEST") {
          const [dons, participations] = await Promise.all([
            donationService.getMine(),
            participationService.getMine(),
          ]);
          setDonations(dons);
          setStats([
            { label: "Mis Donaciones", value: dons.length.toString(), icon: HeartHandshake, color: "var(--primary)" },
            { label: "Mis Actividades", value: participations.length.toString(), icon: Calendar, color: "var(--success)" },
            { label: "Mis Puntos", value: user?.points?.toString() ?? "0", icon: Star, color: "#eab308" },
            { label: "Total Donado", value: formatCurrency(dons.reduce((s, d) => s + d.amount, 0)), icon: Wallet, color: "var(--primary)" },
          ]);
        }
      } catch {
        setStats([]);
      }
    }
    loadStats();
  }, [role]);

  const titles: Record<UserRole, { title: string; subtitle: string }> = {
    USER: { title: "Mi Panel", subtitle: "Gestiona tu cuenta y contribuciones" },
    SUPERVISOR: { title: "Panel de Supervisor", subtitle: "Gestiona validaciones pendientes" },
    ADMIN: { title: "Panel de Administración", subtitle: "Resumen general de la plataforma" },
    GUEST: { title: "Mi Panel", subtitle: "Gestiona tu cuenta y contribuciones" },
  };

  const { title, subtitle } = titles[role];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-[var(--text-main)]">{title}</h2>
        <p className="text-[var(--text-light)] mt-1">{subtitle}</p>
      </div>

      <div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-5 rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)]">
              <div className="flex items-center justify-between mb-3">
                <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <span className="text-2xl font-bold text-[var(--text-main)]">{stat.value}</span>
              </div>
              <p className="text-sm text-[var(--text-light)]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {(role === "USER" || role === "GUEST") && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)]">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-[var(--text-main)]">Historial de Donaciones</h3>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-[var(--text-light)]">
                  Pendiente: <strong className="text-yellow-600">{formatCurrency(totalPending)}</strong>
                </span>
              </div>
            </div>
            {donations.length === 0 ? (
              <p className="text-[var(--text-light)] text-sm text-center py-10">Aún no has realizado donaciones</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border-color)] text-left">
                      <th className="pb-3 pr-4 text-[var(--text-light)] font-medium">Organización</th>
                      <th className="pb-3 pr-4 text-[var(--text-light)] font-medium">Monto</th>
                      <th className="pb-3 pr-4 text-[var(--text-light)] font-medium">Estado</th>
                      <th className="pb-3 pr-4 text-[var(--text-light)] font-medium">Puntos</th>
                      <th className="pb-3 text-[var(--text-light)] font-medium">Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donations.map((d) => (
                      <tr key={d.id} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-cream)] transition-colors">
                        <td className="py-3 pr-4 text-[var(--text-main)] font-medium">{d.organization?.name || "-"}</td>
                        <td className="py-3 pr-4 text-[var(--text-main)]">Bs. {d.amount.toFixed(2)}</td>
                        <td className="py-3 pr-4"><span className={statusBadge(d.status)}>{d.status}</span></td>
                        <td className="py-3 pr-4">
                          {d.status === "APPROVED" ? (
                            <span className="text-[var(--success)] font-medium">+{(d.amount * 10).toFixed(0)}</span>
                          ) : (
                            <span className="text-[var(--text-light)]">-</span>
                          )}
                        </td>
                        <td className="py-3 text-[var(--text-light)]">{new Date(d.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="space-y-5">
            <div className="bg-white p-5 rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)]">
              <h3 className="text-base font-semibold text-[var(--text-main)] mb-4">Resumen</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-[var(--border-color)]">
                  <span className="text-sm text-[var(--text-light)]">Total donado</span>
                  <span className="font-semibold text-[var(--text-main)]">{formatCurrency(totalDonated)}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-[var(--border-color)]">
                  <span className="text-sm text-[var(--text-light)]">Pendiente</span>
                  <span className="font-semibold text-yellow-600">{formatCurrency(totalPending)}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-[var(--text-light)]">Puntos</span>
                  <span className="font-semibold text-[var(--success)]">{userPoints}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)]">
              <h3 className="text-base font-semibold text-[var(--text-main)] mb-4">Información</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <User className="w-4 h-4 text-[var(--text-light)]" />
                  <span className="text-[var(--text-main)]">{user?.name}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-[var(--text-light)]" />
                  <span className="text-[var(--text-main)]">{user?.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="w-4 h-4 text-[var(--text-light)]" />
                  <span className="px-2 py-0.5 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-xs font-medium capitalize">{user?.role?.toLowerCase()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
