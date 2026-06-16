import { useState, useEffect } from "react";
import { Building2, Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { organizationService } from "@/services/organization.service";
import type { Organization } from "@/types/models";

const INITIAL_FORM = { name: "", email: "", password: "", type: "CHARITY" as 'CHARITY' | 'NGO' | 'COLLABORATOR', address: "" };

export function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Organization | null>(null);
  const [form, setForm] = useState(INITIAL_FORM);

  const fetchOrgs = async () => {
    setLoading(true);
    try {
      const data = await organizationService.getAll();
      setOrganizations(data);
    } catch {
      setError("Error al cargar organizaciones");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrgs();
  }, []);

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setEditing(null);
    setShowForm(false);
  };

  const openEdit = (org: Organization) => {
    setForm({ name: org.name, email: org.email, password: "", type: org.type, address: org.address });
    setEditing(org);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");
    try {
      if (editing) {
        await organizationService.update(editing.id, {
          name: form.name,
          email: form.email,
          type: form.type,
          address: form.address,
        });
        setSuccess("Organización actualizada exitosamente");
      } else {
        await organizationService.create(form);
        setSuccess("Organización creada exitosamente");
      }
      resetForm();
      fetchOrgs();
    } catch {
      setError(editing ? "Error al actualizar organización" : "Error al crear organización");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar esta organización?")) return;
    setError("");
    setSuccess("");
    try {
      await organizationService.delete(id);
      setSuccess("Organización eliminada");
      fetchOrgs();
    } catch {
      setError("Error al eliminar organización");
    }
  };

  const typeBadge = (type: string) => {
    const styles: Record<string, string> = {
      CHARITY: "bg-green-100 text-green-800",
      NGO: "bg-blue-100 text-blue-800",
      COLLABORATOR: "bg-purple-100 text-purple-800",
    };
    return `px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[type] || "bg-gray-100 text-gray-800"}`;
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
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <h2 className="text-3xl font-bold text-[var(--text-main)]">Organizaciones</h2>
            </div>
            <p className="text-[var(--text-light)] ml-[52px]">Gestiona las organizaciones de la fundación</p>
          </div>
          <button
            onClick={() => { resetForm(); setShowForm(true); }}
            className="flex items-center gap-2 bg-[var(--primary)] text-white px-4 py-2.5 rounded-[var(--radius)] font-medium text-sm hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            Nueva
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
            {editing ? "Editar Organización" : "Nueva Organización"}
          </h3>
          <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Nombre</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 border border-[var(--border-color)] rounded-[var(--radius)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)]" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 py-2 border border-[var(--border-color)] rounded-[var(--radius)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)]" required />
            </div>
            {!editing && (
              <div>
                <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Contraseña</label>
                <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-3 py-2 border border-[var(--border-color)] rounded-[var(--radius)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)]" required />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Tipo</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as any })}
                className="w-full px-3 py-2 border border-[var(--border-color)] rounded-[var(--radius)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)]">
                <option value="CHARITY">Charity</option>
                <option value="NGO">NGO</option>
                <option value="COLLABORATOR">Collaborator</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Dirección</label>
              <input type="text" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full px-3 py-2 border border-[var(--border-color)] rounded-[var(--radius)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)]" />
            </div>
            <div className="sm:col-span-2 flex gap-3">
              <button type="submit" disabled={submitting}
                className="flex items-center gap-2 bg-[var(--primary)] text-white px-6 py-2.5 rounded-[var(--radius)] font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
                {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {editing ? "Guardar Cambios" : "Crear Organización"}
              </button>
              <button type="button" onClick={resetForm}
                className="px-6 py-2.5 rounded-[var(--radius)] font-medium text-sm border border-[var(--border-color)] text-[var(--text-light)] hover:bg-[var(--bg-cream)]">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border-color)] bg-[var(--bg-cream)]">
                <th className="text-left py-3 px-4 text-[var(--text-light)] font-medium">Nombre</th>
                <th className="text-left py-3 px-4 text-[var(--text-light)] font-medium">Email</th>
                <th className="text-left py-3 px-4 text-[var(--text-light)] font-medium">Tipo</th>
                <th className="text-left py-3 px-4 text-[var(--text-light)] font-medium">Estado</th>
                <th className="text-left py-3 px-4 text-[var(--text-light)] font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {organizations.map((org) => (
                <tr key={org.id} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-cream)]">
                  <td className="py-3 px-4 font-medium text-[var(--text-main)]">{org.name}</td>
                  <td className="py-3 px-4 text-[var(--text-main)]">{org.email}</td>
                  <td className="py-3 px-4"><span className={typeBadge(org.type)}>{org.type}</span></td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${org.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                      {org.isActive ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(org)} className="p-1.5 text-[var(--text-light)] hover:text-[var(--primary)] transition-colors" title="Editar">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(org.id)} className="p-1.5 text-[var(--text-light)] hover:text-red-600 transition-colors" title="Eliminar">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {organizations.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-[var(--text-light)]">No hay organizaciones registradas</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
