import { useState, useEffect } from "react";
import { ShieldCheck, Plus, Trash2, Loader2, UserCheck } from "lucide-react";
import { eventSupervisorService } from "@/services/event-supervisor.service";
import { userService } from "@/services/user.service";
import { eventService } from "@/services/event.service";
import type { EventSupervisor, User } from "@/types";
import type { Event } from "@/types/models";

export function SupervisorsPage() {
  const [assignments, setAssignments] = useState<EventSupervisor[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedEventId, setSelectedEventId] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [asigns, allUsers, allEvents] = await Promise.all([
        eventSupervisorService.getAll(),
        userService.getAll(),
        eventService.getAll(),
      ]);
      setAssignments(asigns);
      setUsers(allUsers.filter((u) => u.role === "SUPERVISOR"));
      setEvents(allEvents.filter((e) => e.isActive));
    } catch {
      setError("Error al cargar datos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserId || !selectedEventId) {
      setError("Selecciona un supervisor y un evento");
      return;
    }
    setSubmitting(true);
    setError("");
    setSuccess("");
    try {
      await eventSupervisorService.assign(selectedUserId, selectedEventId);
      setSuccess("Supervisor asignado exitosamente");
      setSelectedUserId("");
      setSelectedEventId("");
      fetchData();
    } catch {
      setError("Error al asignar supervisor");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemove = async (id: string) => {
    if (!confirm("¿Estás seguro de remover esta asignación?")) return;
    setError("");
    setSuccess("");
    try {
      await eventSupervisorService.remove(id);
      setSuccess("Asignación removida");
      fetchData();
    } catch {
      setError("Error al remover asignación");
    }
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
            <ShieldCheck className="w-6 h-6 text-[var(--primary)]" />
          </div>
          <h2 className="text-3xl font-bold text-[var(--text-main)]">Supervisores</h2>
        </div>
        <p className="text-[var(--text-light)] ml-[52px]">Asigna supervisores a los eventos</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-[var(--radius)] text-red-700 text-sm">{error}</div>
      )}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-[var(--radius)] text-green-700 text-sm">{success}</div>
      )}

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)]">
          <h3 className="text-lg font-semibold text-[var(--text-main)] mb-4 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-[var(--primary)]" />
            Asignar Supervisor
          </h3>
          <form onSubmit={handleAssign} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Supervisor</label>
              <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}
                className="w-full px-3 py-2 border border-[var(--border-color)] rounded-[var(--radius)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)]">
                <option value="">Seleccionar supervisor</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Evento</label>
              <select value={selectedEventId} onChange={(e) => setSelectedEventId(e.target.value)}
                className="w-full px-3 py-2 border border-[var(--border-color)] rounded-[var(--radius)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)]">
                <option value="">Seleccionar evento</option>
                {events.map((e) => (
                  <option key={e.id} value={e.id}>{e.name}</option>
                ))}
              </select>
            </div>
            <button type="submit" disabled={submitting}
              className="w-full flex items-center justify-center gap-2 bg-[var(--primary)] text-white py-2.5 rounded-[var(--radius)] font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              <Plus className="w-4 h-4" />
              Asignar
            </button>
          </form>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[var(--text-main)] mb-4">Asignaciones Actuales</h3>
          {assignments.length === 0 ? (
            <div className="bg-white p-6 rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)]">
              <p className="text-[var(--text-light)] text-sm text-center">No hay asignaciones</p>
            </div>
          ) : (
            <div className="bg-white rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border-color)] bg-[var(--bg-cream)]">
                      <th className="text-left py-3 px-4 text-[var(--text-light)] font-medium">Supervisor</th>
                      <th className="text-left py-3 px-4 text-[var(--text-light)] font-medium">Evento</th>
                      <th className="text-left py-3 px-4 text-[var(--text-light)] font-medium">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignments.map((a) => (
                      <tr key={a.id} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-cream)]">
                        <td className="py-3 px-4 font-medium text-[var(--text-main)]">{a.user?.name || "-"}</td>
                        <td className="py-3 px-4 text-[var(--text-main)]">{a.event?.name || "-"}</td>
                        <td className="py-3 px-4">
                          <button onClick={() => handleRemove(a.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-100 text-red-700 rounded-[var(--radius)] text-xs font-medium hover:bg-red-200 transition-colors">
                            <Trash2 className="w-3 h-3" />
                            Remover
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
