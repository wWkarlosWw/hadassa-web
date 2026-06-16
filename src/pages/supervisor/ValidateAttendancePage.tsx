import { useState, useEffect } from "react";
import { ShieldCheck, CheckCircle, Loader2 } from "lucide-react";
import { participationService } from "@/services/event.service";
import { eventSupervisorService } from "@/services/event-supervisor.service";
import { useAuth } from "@/context";
import type { EventParticipation, EventSupervisor } from "@/types/models";

export function ValidateAttendancePage() {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState<EventSupervisor[]>([]);
  const [participations, setParticipations] = useState<EventParticipation[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [selectedEventId, setSelectedEventId] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allAssignments = await eventSupervisorService.getAll();
        const myAssignments = allAssignments.filter((a) => a.userId === user?.id);
        setAssignments(myAssignments);
        if (myAssignments.length > 0) {
          const allParts = await participationService.getAll();
          setParticipations(allParts);
        }
      } catch {
        setError("Error al cargar datos");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user?.id]);

  const handleMarkAttend = async (participationId: string) => {
    setActionLoading(participationId);
    setError("");
    try {
      await participationService.markAttend(participationId);
      const allParts = await participationService.getAll();
      setParticipations(allParts);
    } catch {
      setError("Error al marcar asistencia");
    } finally {
      setActionLoading(null);
    }
  };

  const assignedEventIds = assignments.map((a) => a.eventId);

  const participationsForSelected = participations.filter((p) => {
    if (!selectedEventId) return assignedEventIds.includes(p.eventId);
    return p.eventId === selectedEventId;
  });

  const registered = participationsForSelected.filter((p) => p.status === "REGISTERED");
  const attended = participationsForSelected.filter((p) => p.status === "ATTENDED");

  const events = assignments
    .map((a) => a.event)
    .filter((e): e is NonNullable<typeof e> => e != null)
    .filter((e, i, arr) => arr.findIndex((x) => x.id === e.id) === i);

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
          <h2 className="text-3xl font-bold text-[var(--text-main)]">Validar Asistencia</h2>
        </div>
        <p className="text-[var(--text-light)] ml-[52px]">
          Marca la asistencia de los participantes a los eventos
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-[var(--radius)] text-red-700 text-sm">
          {error}
        </div>
      )}

      {events.length > 0 && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Filtrar por evento</label>
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="w-full max-w-xs px-3 py-2 border border-[var(--border-color)] rounded-[var(--radius)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)]"
          >
            <option value="">Todos mis eventos</option>
            {events.map((e) => (
              <option key={e.id} value={e.id}>{e.name}</option>
            ))}
          </select>
        </div>
      )}

      {assignments.length === 0 ? (
        <div className="bg-white p-8 rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)]">
          <p className="text-[var(--text-light)] text-center">No tienes eventos asignados como supervisor</p>
        </div>
      ) : (
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-[var(--text-main)] mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-yellow-500" />
              Pendientes ({registered.length})
            </h3>
            {registered.length === 0 ? (
              <div className="bg-white p-6 rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)]">
                <p className="text-[var(--text-light)] text-sm text-center">No hay participantes pendientes</p>
              </div>
            ) : (
              <div className="bg-white rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[var(--border-color)] bg-[var(--bg-cream)]">
                        <th className="text-left py-3 px-4 text-[var(--text-light)] font-medium">Usuario</th>
                        <th className="text-left py-3 px-4 text-[var(--text-light)] font-medium">Evento</th>
                        <th className="text-left py-3 px-4 text-[var(--text-light)] font-medium">Fecha</th>
                        <th className="text-left py-3 px-4 text-[var(--text-light)] font-medium">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registered.map((p) => (
                        <tr key={p.id} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-cream)]">
                          <td className="py-3 px-4 font-medium text-[var(--text-main)]">{p.user?.name || "-"}</td>
                          <td className="py-3 px-4 text-[var(--text-main)]">{p.event?.name || "-"}</td>
                          <td className="py-3 px-4 text-[var(--text-light)]">
                            {p.event?.date ? new Date(p.event.date).toLocaleDateString() : "-"}
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleMarkAttend(p.id)}
                              disabled={actionLoading === p.id}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--primary)] text-white rounded-[var(--radius)] text-xs font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                            >
                              {actionLoading === p.id ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <CheckCircle className="w-3 h-3" />
                              )}
                              Marcar Asistencia
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

          <div>
            <h3 className="text-xl font-semibold text-[var(--text-main)] mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Asistieron ({attended.length})
            </h3>
            {attended.length === 0 ? (
              <div className="bg-white p-6 rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)]">
                <p className="text-[var(--text-light)] text-sm text-center">Nadie ha marcado asistencia aún</p>
              </div>
            ) : (
              <div className="bg-white rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[var(--border-color)] bg-[var(--bg-cream)]">
                        <th className="text-left py-3 px-4 text-[var(--text-light)] font-medium">Usuario</th>
                        <th className="text-left py-3 px-4 text-[var(--text-light)] font-medium">Evento</th>
                        <th className="text-left py-3 px-4 text-[var(--text-light)] font-medium">Fecha</th>
                        <th className="text-left py-3 px-4 text-[var(--text-light)] font-medium">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attended.map((p) => (
                        <tr key={p.id} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-cream)]">
                          <td className="py-3 px-4 font-medium text-[var(--text-main)]">{p.user?.name || "-"}</td>
                          <td className="py-3 px-4 text-[var(--text-main)]">{p.event?.name || "-"}</td>
                          <td className="py-3 px-4 text-[var(--text-light)]">
                            {p.event?.date ? new Date(p.event.date).toLocaleDateString() : "-"}
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">ATTENDED</span>
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
      )}
    </div>
  );
}
