import { useState, useEffect } from "react";
import { Users, Calendar, HeartHandshake, Building2, Megaphone, BadgePercent, ClipboardCheck, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context";
import { donationService } from "@/services/donation.service";
import { organizationService } from "@/services/organization.service";
import { eventService } from "@/services/event.service";
import { discountService } from "@/services/discount.service";
import { userService } from "@/services/user.service";
import { participationService } from "@/services/event.service";
import type { UserRole } from "@/types";

export function Dashboard() {
  const { user } = useAuth();
  const role = (user?.role || "USER") as UserRole;
  const [stats, setStats] = useState<{ label: string; value: string; icon: React.ElementType; color: string }[]>([]);

  useEffect(() => {
    async function loadStats() {
      try {
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
        } else {
          const [donations, participations] = await Promise.all([
            donationService.getMine().then(r => r.length.toString()).catch(() => "0"),
            participationService.getMine().then(r => r.length.toString()).catch(() => "0"),
          ]);
          setStats([
            { label: "Mis Donaciones", value: donations, icon: HeartHandshake, color: "var(--primary)" },
            { label: "Mis Actividades", value: participations, icon: Calendar, color: "var(--success)" },
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
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[var(--text-main)]">{title}</h2>
        <p className="text-[var(--text-light)] mt-2">{subtitle}</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
            <span className="px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-sm font-medium capitalize">{user?.role?.toLowerCase()}</span>
          </div>
        </div>
      </div>
    </>
  );
}
