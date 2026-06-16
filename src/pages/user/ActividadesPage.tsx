import { useState, useEffect } from "react";
import { Calendar, MapPin, Loader2, CheckCircle, XCircle } from "lucide-react";
import { eventService, participationService } from "@/services/event.service";
import type { Event, EventParticipation } from "@/types/models";

export function ActividadesPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [myParticipations, setMyParticipations] = useState<EventParticipation[]>([]);
  const [loading, setLoading] = useState(true);
  const [registeringId, setRegisteringId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    Promise.all([
      eventService.getAll(),
      participationService.getMine(),
    ])
      .then(([evts, parts]) => {
        setEvents(evts.filter((e) => e.isActive));
        setMyParticipations(parts);
      })
      .catch(() => setMessage({ type: "error", text: "Error al cargar actividades" }))
      .finally(() => setLoading(false));
  }, []);

  const handleRegister = async (eventId: string) => {
    setRegisteringId(eventId);
    setMessage(null);
    try {
      const participation = await participationService.register(eventId);
      setMyParticipations((prev) => [participation, ...prev]);
      setMessage({ type: "success", text: "¡Inscripción exitosa!" });
    } catch {
      setMessage({ type: "error", text: "Error al inscribirse en la actividad" });
    } finally {
      setRegisteringId(null);
    }
  };

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      REGISTERED: "bg-blue-100 text-blue-800",
      ATTENDED: "bg-green-100 text-green-800",
      CANCELLED: "bg-gray-100 text-gray-800",
    };
    return `px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || "bg-gray-100 text-gray-800"}`;
  };

  const isRegistered = (eventId: string) =>
    myParticipations.some((p) => p.eventId === eventId && p.status !== "CANCELLED");

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
            <Calendar className="w-6 h-6 text-[var(--primary)]" />
          </div>
          <h2 className="text-3xl font-bold text-[var(--text-main)]">Actividades</h2>
        </div>
        <p className="text-[var(--text-light)] ml-[52px]">
          Próximos eventos y actividades de la fundación
        </p>
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded-[var(--radius)] text-sm flex items-center gap-2 ${
            message.type === "success"
              ? "bg-green-50 border border-green-200 text-green-700"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}
        >
          {message.type === "success" ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
          {message.text}
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-[var(--text-main)] mb-4">Eventos Disponibles</h3>
        {events.length === 0 ? (
          <div className="bg-white p-8 rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)]">
            <p className="text-[var(--text-light)] text-center">No hay eventos disponibles</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((evt) => (
              <div key={evt.id} className="bg-white p-6 rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)] flex flex-col">
                <h4 className="font-semibold text-[var(--text-main)] text-lg mb-2">{evt.name}</h4>
                <p className="text-sm text-[var(--text-light)] mb-4 flex-1 line-clamp-3">{evt.description}</p>
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-[var(--text-light)]">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(evt.date).toLocaleDateString("es-BO", { year: "numeric", month: "long", day: "numeric" })}</span>
                  </div>
                  {evt.organization && (
                    <div className="flex items-center gap-2 text-[var(--text-light)]">
                      <MapPin className="w-4 h-4" />
                      <span>{evt.organization.name}</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleRegister(evt.id)}
                  disabled={registeringId === evt.id || isRegistered(evt.id)}
                  className={`w-full py-2 rounded-[var(--radius)] font-medium text-sm transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 ${
                    isRegistered(evt.id)
                      ? "bg-green-100 text-green-700 cursor-default"
                      : "bg-[var(--primary)] text-white hover:opacity-90"
                  }`}
                >
                  {registeringId === evt.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : isRegistered(evt.id) ? (
                    "Inscrito"
                  ) : (
                    "Inscribirse"
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold text-[var(--text-main)] mb-4">Mis Actividades</h3>
        {myParticipations.length === 0 ? (
          <div className="bg-white p-8 rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)]">
            <p className="text-[var(--text-light)] text-center">No estás inscrito en ninguna actividad</p>
          </div>
        ) : (
          <div className="bg-white rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-color)] bg-[var(--bg-cream)]">
                    <th className="text-left py-3 px-4 text-[var(--text-light)] font-medium">Evento</th>
                    <th className="text-left py-3 px-4 text-[var(--text-light)] font-medium">Fecha</th>
                    <th className="text-left py-3 px-4 text-[var(--text-light)] font-medium">Estado</th>
                    <th className="text-left py-3 px-4 text-[var(--text-light)] font-medium">Inscrito</th>
                  </tr>
                </thead>
                <tbody>
                  {myParticipations.map((p) => (
                    <tr key={p.id} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-cream)]">
                      <td className="py-3 px-4 font-medium text-[var(--text-main)]">{p.event?.name || "-"}</td>
                      <td className="py-3 px-4 text-[var(--text-light)]">
                        {p.event?.date ? new Date(p.event.date).toLocaleDateString() : "-"}
                      </td>
                      <td className="py-3 px-4"><span className={statusBadge(p.status)}>{p.status}</span></td>
                      <td className="py-3 px-4 text-[var(--text-light)]">{new Date(p.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
