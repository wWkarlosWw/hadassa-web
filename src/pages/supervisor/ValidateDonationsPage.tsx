import { useState, useEffect } from "react";
import { ClipboardCheck, CheckCircle, XCircle, Loader2, Filter } from "lucide-react";
import { donationService } from "@/services/donation.service";
import type { Donation } from "@/types/models";

type FilterTab = "ALL" | "PENDING" | "APPROVED" | "REJECTED";

export function ValidateDonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterTab>("PENDING");

  const fetchDonations = async () => {
    setLoading(true);
    try {
      const data = await donationService.getAll();
      setDonations(data);
    } catch {
      setError("Error al cargar donaciones");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleApprove = async (id: string) => {
    setActionLoading(id);
    setError("");
    try {
      await donationService.approve(id);
      fetchDonations();
    } catch {
      setError("Error al aprobar donación");
      setActionLoading(null);
    }
  };

  const handleReject = async (id: string) => {
    setActionLoading(id);
    setError("");
    try {
      await donationService.reject(id);
      fetchDonations();
    } catch {
      setError("Error al rechazar donación");
      setActionLoading(null);
    }
  };

  const filteredDonations = donations.filter((d) => {
    if (activeFilter === "ALL") return true;
    return d.status === activeFilter;
  });

  const tabs: { key: FilterTab; label: string }[] = [
    { key: "ALL", label: "Todas" },
    { key: "PENDING", label: "Pendientes" },
    { key: "APPROVED", label: "Aprobadas" },
    { key: "REJECTED", label: "Rechazadas" },
  ];

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      PENDING: "bg-yellow-100 text-yellow-800",
      APPROVED: "bg-green-100 text-green-800",
      REJECTED: "bg-red-100 text-red-800",
    };
    return `px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || "bg-gray-100 text-gray-800"}`;
  };

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
            <ClipboardCheck className="w-6 h-6 text-[var(--primary)]" />
          </div>
          <h2 className="text-3xl font-bold text-[var(--text-main)]">Validar Donaciones</h2>
        </div>
        <p className="text-[var(--text-light)] ml-[52px]">
          Revisa y valida las donaciones realizadas por los miembros
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-[var(--radius)] text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-4 h-4 text-[var(--text-light)]" />
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveFilter(tab.key)}
            className={`px-4 py-2 rounded-[var(--radius)] text-sm font-medium transition-colors ${
              activeFilter === tab.key
                ? "bg-[var(--primary)] text-white"
                : "bg-white text-[var(--text-light)] border border-[var(--border-color)] hover:bg-[var(--bg-cream)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]"></div>
        </div>
      ) : filteredDonations.length === 0 ? (
        <div className="bg-white p-8 rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)]">
          <p className="text-[var(--text-light)] text-center">
            No hay donaciones {activeFilter !== "ALL" ? activeFilter.toLowerCase() : ""}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredDonations.map((d) => (
            <div key={d.id} className="bg-white p-6 rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-[var(--text-main)]">{d.user?.name || "Usuario"}</span>
                    <span className={statusBadge(d.status)}>{d.status}</span>
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-[var(--text-light)]">
                    <span>Monto: <strong className="text-[var(--text-main)]">Bs. {d.amount.toFixed(2)}</strong></span>
                    <span>Organización: <strong className="text-[var(--text-main)]">{d.organization?.name || "-"}</strong></span>
                    <span>Fecha: <strong className="text-[var(--text-main)]">{new Date(d.createdAt).toLocaleDateString()}</strong></span>
                  </div>
                </div>
                {d.status === "PENDING" && (
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => handleApprove(d.id)}
                      disabled={actionLoading === d.id}
                      className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white rounded-[var(--radius)] text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      {actionLoading === d.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <CheckCircle className="w-4 h-4" />
                      )}
                      Aprobar
                    </button>
                    <button
                      onClick={() => handleReject(d.id)}
                      disabled={actionLoading === d.id}
                      className="flex items-center gap-1.5 px-4 py-2 bg-red-600 text-white rounded-[var(--radius)] text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
                    >
                      <XCircle className="w-4 h-4" />
                      Rechazar
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
