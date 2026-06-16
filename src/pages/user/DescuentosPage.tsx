import { useState, useEffect } from "react";
import { Tag, Gift, Star, Loader2, CheckCircle, XCircle } from "lucide-react";
import { discountService } from "@/services/discount.service";
import { claimedDiscountService } from "@/services/claimed-discount.service";
import type { Discount, ClaimedDiscount } from "@/types/models";

export function DescuentosPage() {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [myClaims, setMyClaims] = useState<ClaimedDiscount[]>([]);
  const [loading, setLoading] = useState(true);
  const [claimingId, setClaimingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    Promise.all([
      discountService.getAll(),
      claimedDiscountService.getMine(),
    ])
      .then(([discs, claims]) => {
        setDiscounts(discs.filter((d) => d.isActive));
        setMyClaims(claims);
      })
      .catch(() => setMessage({ type: "error", text: "Error al cargar descuentos" }))
      .finally(() => setLoading(false));
  }, []);

  const handleClaim = async (discountId: string) => {
    setClaimingId(discountId);
    setMessage(null);
    try {
      const claim = await claimedDiscountService.claim(discountId);
      setMyClaims((prev) => [claim, ...prev]);
      setMessage({ type: "success", text: "¡Descuento canjeado exitosamente!" });
    } catch {
      setMessage({ type: "error", text: "Error al canjear el descuento. Verifica tus puntos." });
    } finally {
      setClaimingId(null);
    }
  };

  const claimStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      PENDING: "bg-yellow-100 text-yellow-800",
      REDEEMED: "bg-green-100 text-green-800",
      CANCELLED: "bg-red-100 text-red-800",
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
            <Tag className="w-6 h-6 text-[var(--primary)]" />
          </div>
          <h2 className="text-3xl font-bold text-[var(--text-main)]">Descuentos</h2>
        </div>
        <p className="text-[var(--text-light)] ml-[52px]">
          Beneficios y descuentos exclusivos para miembros de la fundación
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

      <div className="bg-white p-6 rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)] mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <span className="text-lg font-semibold text-[var(--text-main)]">Mis Puntos</span>
        </div>
        <p className="text-3xl font-bold text-[var(--primary)]">{0}</p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-[var(--text-main)] mb-4">Descuentos Disponibles</h3>
        {discounts.length === 0 ? (
          <div className="bg-white p-8 rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)]">
            <p className="text-[var(--text-light)] text-center">No hay descuentos disponibles</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {discounts.map((disc) => (
              <div key={disc.id} className="bg-white p-6 rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)] flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <Gift className="w-5 h-5 text-[var(--primary)]" />
                  <span className="font-semibold text-[var(--text-main)]">{disc.code}</span>
                </div>
                <p className="text-sm text-[var(--text-light)] mb-4 flex-1">{disc.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-[var(--primary)]">{disc.discount}%</span>
                  <span className="text-sm text-[var(--text-light)] flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    {disc.pointsRequired} pts
                  </span>
                </div>
                {disc.organization && (
                  <p className="text-xs text-[var(--text-light)] mb-3">{disc.organization.name}</p>
                )}
                <button
                  onClick={() => handleClaim(disc.id)}
                  disabled={claimingId === disc.id}
                  className="w-full bg-[var(--primary)] text-white py-2 rounded-[var(--radius)] font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {claimingId === disc.id && <Loader2 className="w-4 h-4 animate-spin" />}
                  Canjear
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold text-[var(--text-main)] mb-4">Mis Descuentos Canjeados</h3>
        {myClaims.length === 0 ? (
          <div className="bg-white p-8 rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)]">
            <p className="text-[var(--text-light)] text-center">Aún no has canjeado descuentos</p>
          </div>
        ) : (
          <div className="bg-white rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-color)] bg-[var(--bg-cream)]">
                    <th className="text-left py-3 px-4 text-[var(--text-light)] font-medium">Código</th>
                    <th className="text-left py-3 px-4 text-[var(--text-light)] font-medium">Descripción</th>
                    <th className="text-left py-3 px-4 text-[var(--text-light)] font-medium">Estado</th>
                    <th className="text-left py-3 px-4 text-[var(--text-light)] font-medium">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {myClaims.map((c) => (
                    <tr key={c.id} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-cream)]">
                      <td className="py-3 px-4 font-medium text-[var(--text-main)]">{c.discount?.code || "-"}</td>
                      <td className="py-3 px-4 text-[var(--text-main)]">{c.discount?.description || "-"}</td>
                      <td className="py-3 px-4"><span className={claimStatusBadge(c.status)}>{c.status}</span></td>
                      <td className="py-3 px-4 text-[var(--text-light)]">{new Date(c.claimedAt).toLocaleDateString()}</td>
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
