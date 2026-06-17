import { useState } from "react";
import {
  X,
  CreditCard,
  Building2,
  Smartphone,
  CheckCircle2,
  Lock,
  ChevronRight,
  ArrowLeft,
  Star,
  Loader2,
} from "lucide-react";
import { donationService } from "@/services/donation.service";
import { getOrgColors } from "@/shared/constants/categoryColors";
import type { Organization, Event } from "@/types/models";

interface DonationModalProps {
  organization: Organization;
  events: Event[];
  onClose: () => void;
  onSuccess: () => void;
}

type Step = "amount" | "method" | "details" | "confirm" | "success";
type PaymentMethod = "card" | "transfer" | "qr";

const QUICK_AMOUNTS = [50, 100, 200, 500, 1000];

export function DonationModal({
  organization,
  events,
  onClose,
  onSuccess,
}: DonationModalProps) {
  const [step, setStep] = useState<Step>("amount");
  const [amount, setAmount] = useState<string>("");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [selectedEventId, setSelectedEventId] = useState("");
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const palette = getOrgColors(organization.type, organization.category);
  const c = {
    primary: palette.primaryColor,
    dark: palette.primaryDark,
    light: palette.primaryLight,
  };

  const finalAmount = parseFloat(amount || customAmount || "0");
  const pctRaised =
    organization.goal && organization.goal > 0
      ? Math.min(((organization.raised ?? 0) / organization.goal) * 100, 100)
      : 0;

  const handleQuickAmount = (val: number) => {
    setAmount(String(val));
    setCustomAmount("");
  };

  const handleCustomAmount = (val: string) => {
    setCustomAmount(val);
    setAmount("");
  };

  const handleConfirm = async () => {
    if (finalAmount < 10) {
      setError("El monto mínimo es Bs. 10");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await donationService.create({
        amount: finalAmount,
        organizationId: organization.id,
        eventId: selectedEventId || undefined,
      });
      setStep("success");
    } catch {
      setError("Error al registrar la donación");
      setSubmitting(false);
    }
  };

  const stepOrder: Step[] = ["amount", "method", "details", "confirm"];
  const currentIndex = stepOrder.indexOf(step);
  const canProceedAmount = finalAmount >= 10;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(4px)",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        style={{ maxHeight: "90vh" }}
      >
        {/* Header */}
        <div
          className="relative px-6 pt-6 pb-4 flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${c.primary}18 0%, ${c.light}30 100%)`,
            borderBottom: `1px solid ${c.primary}20`,
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/10 transition-colors"
          >
            <X size={18} className="text-[var(--text-main)]" />
          </button>

          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md flex-shrink-0"
              style={{ backgroundColor: c.primary }}
            >
              {organization.name.charAt(0)}
            </div>
            <div>
              <p className="text-xs text-[var(--text-light)]">Donando a</p>
              <p className="text-sm font-semibold text-[var(--text-main)] leading-tight">
                {organization.name}
              </p>
            </div>
          </div>

          {/* Progress mini */}
          <div className="flex items-center gap-2 text-xs text-[var(--text-light)]">
            <div className="flex-1 h-1.5 bg-black/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${pctRaised}%`, backgroundColor: c.primary }}
              />
            </div>
            <span style={{ color: c.primary }}>{pctRaised.toFixed(0)}% logrado</span>
          </div>

          {/* Step indicator */}
          {step !== "success" && (
            <div className="flex gap-1.5 mt-3">
              {stepOrder.map((s, i) => (
                <div
                  key={s}
                  className="h-1 rounded-full flex-1 transition-all duration-300"
                  style={{
                    backgroundColor:
                      i <= currentIndex ? c.primary : `${c.primary}30`,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {step === "amount" && (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-semibold text-[var(--text-main)] mb-1">
                  ¿Cuánto deseas donar?
                </h3>
                <p className="text-sm text-[var(--text-light)]">
                  Mínimo Bs. 10. Tu donación cambia vidas.
                </p>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {QUICK_AMOUNTS.map((val) => (
                  <button
                    key={val}
                    onClick={() => handleQuickAmount(val)}
                    className="py-2.5 rounded-xl text-sm font-semibold border-2 transition-all duration-200"
                    style={{
                      borderColor:
                        amount === String(val) ? c.primary : `${c.primary}30`,
                      backgroundColor:
                        amount === String(val) ? c.primary : "transparent",
                      color: amount === String(val) ? "#fff" : c.primary,
                    }}
                  >
                    {val}
                  </button>
                ))}
              </div>

              <div>
                <label className="text-xs font-medium text-[var(--text-light)] mb-1 block">
                  Monto personalizado (Bs.)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-light)] font-medium">
                    Bs.
                  </span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => handleCustomAmount(e.target.value)}
                    placeholder="Ingresa un monto"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border-2 outline-none transition-all duration-200 bg-[var(--bg-cream)] text-[var(--text-main)]"
                    style={{
                      borderColor: customAmount ? c.primary : "var(--border-color)",
                    }}
                  />
                </div>
              </div>

              {/* Recurring */}
              <div
                className="flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all duration-200"
                style={{
                  borderColor: isRecurring ? c.primary : "var(--border-color)",
                  backgroundColor: isRecurring ? `${c.primary}08` : "transparent",
                }}
                onClick={() => setIsRecurring(!isRecurring)}
              >
                <div>
                  <p className="text-sm font-medium text-[var(--text-main)]">
                    Donación mensual recurrente
                  </p>
                  <p className="text-xs text-[var(--text-light)]">
                    Impacto sostenido mes a mes
                  </p>
                </div>
                <div
                  className="w-12 h-6 rounded-full relative transition-all duration-300"
                  style={{
                    backgroundColor: isRecurring ? c.primary : "#e5e7eb",
                  }}
                >
                  <div
                    className="w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all duration-300 shadow-sm"
                    style={{ left: isRecurring ? "26px" : "2px" }}
                  />
                </div>
              </div>

              {/* Event select */}
              {events.length > 0 && (
                <div>
                  <label className="text-xs font-medium text-[var(--text-light)] mb-1 block">
                    Evento (opcional)
                  </label>
                  <select
                    value={selectedEventId}
                    onChange={(e) => setSelectedEventId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 outline-none bg-[var(--bg-cream)] text-[var(--text-main)] text-sm"
                    style={{ borderColor: "var(--border-color)" }}
                  >
                    <option value="">Sin evento específico</option>
                    {events
                      .filter((evt) => evt.organizationId === organization.id)
                      .map((evt) => (
                        <option key={evt.id} value={evt.id}>
                          {evt.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}

              {/* Points preview */}
              {finalAmount >= 10 && (
                <div className="flex items-center gap-2 text-sm text-[var(--text-light)] bg-[var(--bg-cream)] rounded-xl p-3">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 shrink-0" />
                  <span>
                    Ganarás{" "}
                    <strong style={{ color: c.primary }}>
                      {(finalAmount * 10).toFixed(0)} puntos
                    </strong>{" "}
                    cuando se apruebe tu donación
                  </span>
                </div>
              )}
            </div>
          )}

          {step === "method" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-[var(--text-main)] mb-1">
                  Método de pago
                </h3>
                <p className="text-sm text-[var(--text-light)]">
                  Elige cómo realizar tu donación
                </p>
              </div>

              {(
                [
                  {
                    id: "card" as PaymentMethod,
                    icon: CreditCard,
                    title: "Tarjeta de crédito/débito",
                    desc: "Visa, Mastercard, American Express",
                  },
                  {
                    id: "transfer" as PaymentMethod,
                    icon: Building2,
                    title: "Transferencia bancaria",
                    desc: "Banco Bisa, BCP, Banco Mercantil",
                  },
                  {
                    id: "qr" as PaymentMethod,
                    icon: Smartphone,
                    title: "Pago por QR",
                    desc: "SimplePay, Tigo Money, Viva Digital",
                  },
                ] as const
              ).map((m) => (
                <button
                  key={m.id}
                  onClick={() => setPaymentMethod(m.id)}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200"
                  style={{
                    borderColor:
                      paymentMethod === m.id ? c.primary : "var(--border-color)",
                    backgroundColor:
                      paymentMethod === m.id ? `${c.primary}08` : "white",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor:
                        paymentMethod === m.id
                          ? c.primary
                          : `${c.primary}15`,
                    }}
                  >
                    <m.icon
                      size={20}
                      color={paymentMethod === m.id ? "#fff" : c.primary}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[var(--text-main)]">
                      {m.title}
                    </p>
                    <p className="text-xs text-[var(--text-light)]">{m.desc}</p>
                  </div>
                  <ChevronRight size={16} className="text-[var(--text-light)]" />
                </button>
              ))}

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-[var(--radius)] text-red-700 text-sm">
                  {error}
                </div>
              )}
            </div>
          )}

          {step === "details" && paymentMethod === "card" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-[var(--text-main)] mb-1">
                  Datos de tu tarjeta
                </h3>
                <p className="text-sm text-[var(--text-light)]">
                  Transacción segura con cifrado SSL
                </p>
              </div>

              {[
                {
                  label: "Número de tarjeta",
                  key: "number" as const,
                  placeholder: "1234 5678 9012 3456",
                },
                {
                  label: "Nombre en la tarjeta",
                  key: "name" as const,
                  placeholder: "NOMBRE APELLIDO",
                },
              ].map((f) => (
                <div key={f.key}>
                  <label className="text-xs font-medium text-[var(--text-light)] mb-1 block">
                    {f.label}
                  </label>
                  <input
                    type="text"
                    placeholder={f.placeholder}
                    value={cardData[f.key]}
                    onChange={(e) =>
                      setCardData({ ...cardData, [f.key]: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border-2 outline-none transition-colors bg-[var(--bg-cream)] text-[var(--text-main)]"
                    style={{ borderColor: "var(--border-color)" }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = c.primary)
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "var(--border-color)")
                    }
                  />
                </div>
              ))}

              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    label: "Vencimiento",
                    key: "expiry" as const,
                    placeholder: "MM/AA",
                  },
                  {
                    label: "CVV",
                    key: "cvv" as const,
                    placeholder: "\u2022\u2022\u2022",
                  },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="text-xs font-medium text-[var(--text-light)] mb-1 block">
                      {f.label}
                    </label>
                    <input
                      type="text"
                      placeholder={f.placeholder}
                      value={cardData[f.key]}
                      onChange={(e) =>
                        setCardData({ ...cardData, [f.key]: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border-2 outline-none transition-colors bg-[var(--bg-cream)] text-[var(--text-main)]"
                      style={{ borderColor: "var(--border-color)" }}
                      onFocus={(e) =>
                        (e.target.style.borderColor = c.primary)
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor = "var(--border-color)")
                      }
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs text-[var(--text-light)] bg-[var(--bg-cream)] rounded-xl p-3">
                <Lock size={14} style={{ color: c.primary }} />
                <span>
                  Tus datos están protegidos con cifrado de 256 bits
                </span>
              </div>
            </div>
          )}

          {step === "details" && paymentMethod === "transfer" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-[var(--text-main)] mb-1">
                  Datos bancarios
                </h3>
                <p className="text-sm text-[var(--text-light)]">
                  Realiza la transferencia a esta cuenta
                </p>
              </div>
              {[
                { label: "Banco", value: "Banco Bisa S.A." },
                { label: "Cuenta", value: "1-001-234567-8" },
                { label: "Titular", value: organization.name },
                { label: "NIT", value: "123456789" },
                {
                  label: "Referencia",
                  value: `DON-${organization.id.slice(-6).toUpperCase()}`,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between items-center py-2 border-b border-[var(--border-color)]"
                >
                  <span className="text-sm text-[var(--text-light)]">
                    {item.label}
                  </span>
                  <span className="text-sm font-semibold text-[var(--text-main)]">
                    {item.value}
                  </span>
                </div>
              ))}
              <p className="text-xs text-[var(--text-light)] bg-[var(--bg-cream)] rounded-xl p-3">
                Envía el comprobante a{" "}
                <strong style={{ color: c.primary }}>
                  donaciones@{organization.id.slice(-8)}.org.bo
                </strong>{" "}
                para confirmar tu donación.
              </p>
            </div>
          )}

          {step === "details" && paymentMethod === "qr" && (
            <div className="space-y-4 text-center">
              <div>
                <h3 className="text-lg font-semibold text-[var(--text-main)] mb-1">
                  Escanea el código QR
                </h3>
                <p className="text-sm text-[var(--text-light)]">
                  Usa tu app bancaria o billetera digital
                </p>
              </div>
              <div
                className="w-48 h-48 mx-auto rounded-2xl flex items-center justify-center border-2"
                style={{
                  borderColor: c.primary,
                  backgroundColor: `${c.primary}08`,
                }}
              >
                <div className="grid grid-cols-5 gap-1 p-4">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-5 h-5 rounded-sm"
                      style={{
                        backgroundColor:
                          Math.random() > 0.4 ? c.primary : "transparent",
                      }}
                    />
                  ))}
                </div>
              </div>
              <p
                className="text-sm font-semibold"
                style={{ color: c.primary }}
              >
                Bs. {finalAmount.toFixed(2)}
              </p>
              <p className="text-xs text-[var(--text-light)]">
                El QR es válido por 15 minutos
              </p>
            </div>
          )}

          {step === "confirm" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-[var(--text-main)] mb-1">
                  Confirma tu donación
                </h3>
                <p className="text-sm text-[var(--text-light)]">
                  Revisa los detalles antes de continuar
                </p>
              </div>

              <div
                className="rounded-2xl border-2 overflow-hidden"
                style={{ borderColor: `${c.primary}30` }}
              >
                {[
                  { label: "Fundación", value: organization.name },
                  {
                    label: "Monto",
                    value: `Bs. ${finalAmount.toFixed(2)}`,
                  },
                  {
                    label: "Frecuencia",
                    value: isRecurring
                      ? "Mensual recurrente"
                      : "Una sola vez",
                  },
                  {
                    label: "Método",
                    value:
                      paymentMethod === "card"
                        ? "Tarjeta de crédito/débito"
                        : paymentMethod === "transfer"
                          ? "Transferencia bancaria"
                          : "Pago por QR",
                  },
                ].map((item, i, arr) => (
                  <div
                    key={item.label}
                    className="flex justify-between items-center px-4 py-3"
                    style={{
                      borderBottom:
                        i < arr.length - 1
                          ? `1px solid ${c.primary}20`
                          : "none",
                    }}
                  >
                    <span className="text-sm text-[var(--text-light)]">
                      {item.label}
                    </span>
                    <span className="text-sm font-semibold text-[var(--text-main)]">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="p-4 rounded-2xl text-center"
                style={{ backgroundColor: `${c.primary}10` }}
              >
                <p
                  className="text-2xl font-bold"
                  style={{ color: c.primary }}
                >
                  Bs. {finalAmount.toFixed(2)}
                </p>
                <p className="text-xs text-[var(--text-light)] mt-1">
                  Total a donar
                </p>
              </div>

              {/* Points on confirm */}
              <div className="flex items-center gap-2 text-sm text-[var(--text-light)] bg-[var(--bg-cream)] rounded-xl p-3">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 shrink-0" />
                <span>
                  Recibirás{" "}
                  <strong style={{ color: c.primary }}>
                    {(finalAmount * 10).toFixed(0)} puntos
                  </strong>{" "}
                  cuando tu donación sea aprobada
                </span>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-[var(--radius)] text-red-700 text-sm">
                  {error}
                </div>
              )}
            </div>
          )}

          {step === "success" && (
            <div className="py-6 text-center space-y-4">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-lg"
                style={{ backgroundColor: `${c.primary}15` }}
              >
                <CheckCircle2 size={40} style={{ color: c.primary }} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--text-main)]">
                  ¡Gracias por donar!
                </h3>
                <p className="text-sm text-[var(--text-light)] mt-1">
                  Tu generosidad transforma vidas
                </p>
              </div>
              <div
                className="rounded-2xl p-4 text-center"
                style={{ backgroundColor: `${c.primary}10` }}
              >
                <p
                  className="text-3xl font-bold"
                  style={{ color: c.primary }}
                >
                  Bs. {finalAmount.toFixed(2)}
                </p>
                <p className="text-sm text-[var(--text-light)] mt-1">
                  donados a {organization.name}
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-[var(--text-light)]">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span>
                  +{(finalAmount * 10).toFixed(0)} puntos cuando se apruebe
                </span>
              </div>
              <p className="text-xs text-[var(--text-light)]">
                Recibirás un comprobante en tu correo electrónico con los
                detalles de tu donación.
              </p>
              <button
                onClick={() => { onSuccess(); onClose(); }}
                className="w-full py-3 rounded-xl font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{ backgroundColor: c.primary }}
              >
                Cerrar
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {step !== "success" && (
          <div className="px-6 py-4 flex-shrink-0 flex gap-3 border-t border-[var(--border-color)]">
            {step !== "amount" && (
              <button
                onClick={() => {
                  const prev = stepOrder[currentIndex - 1];
                  if (prev) setStep(prev);
                }}
                className="flex items-center gap-1 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 hover:bg-[var(--bg-cream)]"
                style={{
                  borderColor: "var(--border-color)",
                  color: "var(--text-light)",
                }}
              >
                <ArrowLeft size={14} />
                Atrás
              </button>
            )}
            <button
              disabled={
                (step === "amount" && !canProceedAmount) || submitting
              }
              onClick={() => {
                if (step === "amount") setStep("method");
                else if (step === "method") setStep("details");
                else if (step === "details") setStep("confirm");
                else if (step === "confirm") handleConfirm();
              }}
              className="flex-1 py-3 rounded-xl font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ backgroundColor: c.primary }}
            >
              {submitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : step === "confirm" ? (
                "Confirmar donación"
              ) : (
                "Continuar"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
