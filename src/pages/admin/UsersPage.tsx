import { useState, useEffect } from "react";
import { Users, Loader2 } from "lucide-react";
import { userService } from "@/services/user.service";
import type { User } from "@/types";

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await userService.getAll();
      setUsers(data);
    } catch {
      setError("Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    setSavingId(userId);
    setError("");
    setSuccess("");
    try {
      await userService.update(userId, { role: newRole });
      setSuccess("Rol actualizado exitosamente");
      fetchUsers();
    } catch {
      setError("Error al actualizar rol");
      setSavingId(null);
    }
  };

  const roleBadge = (role: string) => {
    const styles: Record<string, string> = {
      USER: "bg-blue-100 text-blue-800",
      SUPERVISOR: "bg-purple-100 text-purple-800",
      ADMIN: "bg-red-100 text-red-800",
      GUEST: "bg-gray-100 text-gray-800",
    };
    return `px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[role] || "bg-gray-100 text-gray-800"}`;
  };

  const statusBadge = (isActive: boolean | undefined) => {
    return isActive === false
      ? "px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
      : "px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800";
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
            <Users className="w-6 h-6 text-[var(--primary)]" />
          </div>
          <h2 className="text-3xl font-bold text-[var(--text-main)]">Usuarios</h2>
        </div>
        <p className="text-[var(--text-light)] ml-[52px]">Gestiona los usuarios del sistema</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-[var(--radius)] text-red-700 text-sm">{error}</div>
      )}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-[var(--radius)] text-green-700 text-sm">{success}</div>
      )}

      <div className="bg-white rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border-color)] bg-[var(--bg-cream)]">
                <th className="text-left py-3 px-4 text-[var(--text-light)] font-medium">CI</th>
                <th className="text-left py-3 px-4 text-[var(--text-light)] font-medium">Nombre</th>
                <th className="text-left py-3 px-4 text-[var(--text-light)] font-medium">Email</th>
                <th className="text-left py-3 px-4 text-[var(--text-light)] font-medium">Rol</th>
                <th className="text-left py-3 px-4 text-[var(--text-light)] font-medium">Teléfono</th>
                <th className="text-left py-3 px-4 text-[var(--text-light)] font-medium">Estado</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-cream)]">
                  <td className="py-3 px-4 text-[var(--text-main)]">{(u as any).ci || "-"}</td>
                  <td className="py-3 px-4 font-medium text-[var(--text-main)]">{u.name}</td>
                  <td className="py-3 px-4 text-[var(--text-main)]">{u.email}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className={roleBadge(u.role)}>{u.role}</span>
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        disabled={savingId === u.id}
                        className="ml-1 px-2 py-1 border border-[var(--border-color)] rounded-[var(--radius)] text-xs focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 disabled:opacity-50"
                      >
                        <option value="USER">USER</option>
                        <option value="SUPERVISOR">SUPERVISOR</option>
                        <option value="ADMIN">ADMIN</option>
                      </select>
                      {savingId === u.id && <Loader2 className="w-3 h-3 animate-spin text-[var(--primary)]" />}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[var(--text-light)]">{(u as any).phone || "-"}</td>
                  <td className="py-3 px-4">
                    <span className={statusBadge((u as any).isActive)}>
                      {(u as any).isActive === false ? "Inactivo" : "Activo"}
                    </span>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[var(--text-light)]">No hay usuarios registrados</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
