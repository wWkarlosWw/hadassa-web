import { useState, useEffect } from "react";
import { HandHeart, Plus, Loader2, Wallet, Clock } from "lucide-react";
import { donationService } from "@/services/donation.service";
import { organizationService } from "@/services/organization.service";
import { eventService } from "@/services/event.service";
import type { Donation, Organization, Event } from "@/types/models";

export function DonarPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({ organizationId: "", amount: "", eventId: "" });

  useEffect(() => {
    Promise.all([
      organizationService.getAll(),
      eventService.getAll(),
      donationService.getMine(),
    ])
      .then(([orgs, evts, dons]) => {
        setOrganizations(orgs);
        setEvents(evts);
        setDonations(dons);
      })
      .catch(() => setError("Error al cargar datos"))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.organizationId || !form.amount) {
      setError("Selecciona una organización e ingresa un monto");
      return;
    }
    setSubmitting(true);
    setError("");
    setSuccess("");
    try {
      await donationService.create({
        amount: Number(form.amount),
        organizationId: form.organizationId,
        eventId: form.eventId || undefined,
      });
      setSuccess("Donación registrada exitosamente");
      setForm({ organizationId: "", amount: "", eventId: "" });
      const dons = await donationService.getMine();
      setDonations(dons);
    } catch {
      setError("Error al registrar donación");
    } finally {
      setSubmitting(false);
    }
  };

  const totalDonated = donations.reduce((sum, d) => sum + d.amount, 0);
  const totalPending = donations
    .filter((d) => d.status === "PENDING")
    .reduce((sum, d) => sum + d.amount, 0);

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

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-[var(--radius)] text-red-700 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-[var(--radius)] text-green-700 text-sm">
          {success}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)]">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "#d6746a15" }}>
              <Wallet className="w-6 h-6 text-[var(--primary)]" />
            </div>
            <span className="text-3xl font-bold text-[var(--text-main)]">
              Bs. {totalDonated.toFixed(2)}
            </span>
          </div>
          <p className="text-[var(--text-light)]">Total donado</p>
        </div>
        <div className="bg-white p-6 rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)]">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "#eab30815" }}>
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-3xl font-bold text-[var(--text-main)]">
              Bs. {totalPending.toFixed(2)}
            </span>
          </div>
          <p className="text-[var(--text-light)]">Pendiente de validación</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)]">
            <h3 className="text-xl font-semibold text-[var(--text-main)] mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-[var(--primary)]" />
              Nueva Donación
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Organización</label>
                <select
                  value={form.organizationId}
                  onChange={(e) => setForm({ ...form, organizationId: e.target.value })}
                  className="w-full px-3 py-2 border border-[var(--border-color)] rounded-[var(--radius)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)]"
                  required
                >
                  <option value="">Seleccionar organización</option>
                  {organizations.map((org) => (
                    <option key={org.id} value={org.id}>{org.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Monto (Bs.)</label>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  className="w-full px-3 py-2 border border-[var(--border-color)] rounded-[var(--radius)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)]"
                  placeholder="0.00"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Evento (opcional)</label>
                <select
                  value={form.eventId}
                  onChange={(e) => setForm({ ...form, eventId: e.target.value })}
                  className="w-full px-3 py-2 border border-[var(--border-color)] rounded-[var(--radius)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)]"
                >
                  <option value="">Sin evento</option>
                  {events.map((evt) => (
                    <option key={evt.id} value={evt.id}>{evt.name}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[var(--primary)] text-white py-2.5 rounded-[var(--radius)] font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                Donar
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white p-6 rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)]">
            <h3 className="text-xl font-semibold text-[var(--text-main)] mb-6">Historial de Donaciones</h3>
            {donations.length === 0 ? (
              <p className="text-[var(--text-light)] text-center py-8">Aún no has realizado donaciones</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border-color)]">
                      <th className="text-left py-3 px-2 text-[var(--text-light)] font-medium">Monto</th>
                      <th className="text-left py-3 px-2 text-[var(--text-light)] font-medium">Organización</th>
                      <th className="text-left py-3 px-2 text-[var(--text-light)] font-medium">Estado</th>
                      <th className="text-left py-3 px-2 text-[var(--text-light)] font-medium">Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donations.map((d) => (
                      <tr key={d.id} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-cream)]">
                        <td className="py-3 px-2 font-medium text-[var(--text-main)]">Bs. {d.amount.toFixed(2)}</td>
                        <td className="py-3 px-2 text-[var(--text-main)]">{d.organization?.name || "-"}</td>
                        <td className="py-3 px-2"><span className={statusBadge(d.status)}>{d.status}</span></td>
                        <td className="py-3 px-2 text-[var(--text-light)]">
                          {new Date(d.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
