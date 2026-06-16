import { useState, useEffect } from "react";
import { Megaphone, Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { eventService } from "@/services/event.service";
import { organizationService } from "@/services/organization.service";
import type { Event, Organization } from "@/types/models";

const INITIAL_FORM = { name: "", description: "", date: "", organizationId: "" };

export function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Event | null>(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [orgFilter, setOrgFilter] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [evts, orgs] = await Promise.all([
        eventService.getAll(),
        organizationService.getAll(),
      ]);
      setEvents(evts);
      setOrganizations(orgs);
    } catch {
      setError("Error al cargar datos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setEditing(null);
    setShowForm(false);
  };

  const openEdit = (evt: Event) => {
    setForm({
      name: evt.name,
      description: evt.description,
      date: evt.date ? evt.date.slice(0, 16) : "",
      organizationId: evt.organizationId,
    });
    setEditing(evt);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");
    try {
      if (editing) {
        await eventService.update(editing.id, {
          name: form.name,
          description: form.description,
          date: form.date,
        });
        setSuccess("Evento actualizado exitosamente");
      } else {
        await eventService.create(form);
        setSuccess("Evento creado exitosamente");
      }
      resetForm();
      fetchData();
    } catch {
      setError(editing ? "Error al actualizar evento" : "Error al crear evento");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este evento?")) return;
    setError("");
    setSuccess("");
    try {
      await eventService.delete(id);
      setSuccess("Evento eliminado");
      fetchData();
    } catch {
      setError("Error al eliminar evento");
    }
  };

  const filteredEvents = events.filter((e) => {
    if (orgFilter) return e.organizationId === orgFilter;
    return true;
  });

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
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                <Megaphone className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <h2 className="text-3xl font-bold text-[var(--text-main)]">Eventos</h2>
            </div>
            <p className="text-[var(--text-light)] ml-[52px]">Gestiona los eventos de la fundación</p>
          </div>
          <button
            onClick={() => { resetForm(); setShowForm(true); }}
            className="flex items-center gap-2 bg-[var(--primary)] text-white px-4 py-2.5 rounded-[var(--radius)] font-medium text-sm hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            Nuevo
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-[var(--radius)] text-red-700 text-sm">{error}</div>
      )}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-[var(--radius)] text-green-700 text-sm">{success}</div>
      )}

      {showForm && (
        <div className="mb-8 bg-white p-6 rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)]">
          <h3 className="text-lg font-semibold text-[var(--text-main)] mb-4">
            {editing ? "Editar Evento" : "Nuevo Evento"}
          </h3>
          <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Nombre</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 border border-[var(--border-color)] rounded-[var(--radius)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)]" required />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Descripción</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-3 py-2 border border-[var(--border-color)] rounded-[var(--radius)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)]" rows={3} />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Fecha</label>
              <input type="datetime-local" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full px-3 py-2 border border-[var(--border-color)] rounded-[var(--radius)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Organización</label>
              <select value={form.organizationId} onChange={(e) => setForm({ ...form, organizationId: e.target.value })}
                className="w-full px-3 py-2 border border-[var(--border-color)] rounded-[var(--radius)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)]" required>
                <option value="">Seleccionar</option>
                {organizations.map((org) => (
                  <option key={org.id} value={org.id}>{org.name}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2 flex gap-3">
              <button type="submit" disabled={submitting}
                className="flex items-center gap-2 bg-[var(--primary)] text-white px-6 py-2.5 rounded-[var(--radius)] font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
                {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {editing ? "Guardar Cambios" : "Crear Evento"}
              </button>
              <button type="button" onClick={resetForm}
                className="px-6 py-2.5 rounded-[var(--radius)] font-medium text-sm border border-[var(--border-color)] text-[var(--text-light)] hover:bg-[var(--bg-cream)]">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="mb-4">
        <select value={orgFilter} onChange={(e) => setOrgFilter(e.target.value)}
          className="px-3 py-2 border border-[var(--border-color)] rounded-[var(--radius)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)]">
          <option value="">Todas las organizaciones</option>
          {organizations.map((org) => (
            <option key={org.id} value={org.id}>{org.name}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border-color)] bg-[var(--bg-cream)]">
                <th className="text-left py-3 px-4 text-[var(--text-light)] font-medium">Nombre</th>
                <th className="text-left py-3 px-4 text-[var(--text-light)] font-medium">Organización</th>
                <th className="text-left py-3 px-4 text-[var(--text-light)] font-medium">Fecha</th>
                <th className="text-left py-3 px-4 text-[var(--text-light)] font-medium">Estado</th>
                <th className="text-left py-3 px-4 text-[var(--text-light)] font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((evt) => (
                <tr key={evt.id} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-cream)]">
                  <td className="py-3 px-4 font-medium text-[var(--text-main)]">{evt.name}</td>
                  <td className="py-3 px-4 text-[var(--text-main)]">{evt.organization?.name || "-"}</td>
                  <td className="py-3 px-4 text-[var(--text-light)]">
                    {evt.date ? new Date(evt.date).toLocaleDateString() : "-"}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${evt.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                      {evt.isActive ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(evt)} className="p-1.5 text-[var(--text-light)] hover:text-[var(--primary)] transition-colors" title="Editar">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(evt.id)} className="p-1.5 text-[var(--text-light)] hover:text-red-600 transition-colors" title="Eliminar">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredEvents.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-[var(--text-light)]">No hay eventos registrados</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
