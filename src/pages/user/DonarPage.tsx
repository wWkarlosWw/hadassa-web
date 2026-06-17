import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Users,
  MapPin,
  TrendingUp,
  Search,
  SlidersHorizontal,
  Star,
} from "lucide-react";
import { organizationService } from "@/services/organization.service";
import { eventService } from "@/services/event.service";
import { useAuth } from "@/context";
import { useNavigate } from "react-router-dom";
import { DonationModal } from "./DonationModal";
import { getOrgColors, getOrgImages } from "@/shared/constants/categoryColors";
import type { Organization, Event } from "@/types/models";

const CATEGORIES = [
  "Todas",
  "Infancia y Familia",
  "Educación",
  "Salud",
  "Salud y Nutrición",
  "Vivienda",
  "Medio Ambiente",
];

export function DonarPage() {
  const { refreshUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [activeCarousel, setActiveCarousel] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas");
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleDonate = (org: Organization) => {
    if (isAuthenticated) {
      setSelectedOrg(org);
    } else {
      navigate("/login?redirect=/donar");
    }
  };

  useEffect(() => {
    const fetchData = isAuthenticated
      ? Promise.all([organizationService.getAll(), eventService.getAll()])
      : Promise.all([organizationService.getAllPublic(), eventService.getAllPublic()]);

    fetchData
      .then(([orgs, evts]) => {
        setOrganizations(orgs);
        setEvents(evts);
      })
      .catch((err) => {
        const msg = err instanceof Error ? err.message : "";
        if (msg.includes("401") || msg.includes("Unauthorized")) {
          setError("Inicia sesión para ver las fundaciones disponibles");
        } else {
          setError("Error al cargar datos");
        }
      })
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const carouselItems = useMemo(() => {
    return organizations.filter((o) => o.isActive && o.featured);
  }, [organizations]);

  const startAutoplay = useCallback(() => {
    stopAutoplay();
    if (carouselItems.length > 1) {
      autoplayRef.current = setInterval(() => {
        setActiveCarousel((prev) => (prev + 1) % carouselItems.length);
      }, 4500);
    }
  }, [carouselItems.length, stopAutoplay]);

  useEffect(() => {
    if (carouselItems.length > 1) startAutoplay();
    return stopAutoplay;
  }, [carouselItems.length, startAutoplay, stopAutoplay]);

  const goTo = useCallback(
    (index: number) => {
      stopAutoplay();
      setActiveCarousel(index);
      if (carouselItems.length > 1) {
        autoplayRef.current = setInterval(() => {
          setActiveCarousel((prev) => (prev + 1) % carouselItems.length);
        }, 4500);
      }
    },
    [carouselItems.length, stopAutoplay],
  );

  const activeOrgs = useMemo(
    () => organizations.filter((o) => o.isActive),
    [organizations],
  );

  const filtered = useMemo(
    () =>
      activeOrgs.filter((f) => {
        const matchSearch =
          f.name.toLowerCase().includes(search.toLowerCase()) ||
          (f.tagline || "").toLowerCase().includes(search.toLowerCase());
        const matchCategory =
          category === "Todas" || f.category === category;
        return matchSearch && matchCategory;
      }),
    [activeOrgs, search, category],
  );

  const handleModalClose = () => {
    setSelectedOrg(null);
  };

  const handleModalSuccess = () => {
    setSelectedOrg(null);
    refreshUser();
    setSuccess("Donación registrada exitosamente");
  };

  const getProgress = (raised?: number, goal?: number) => {
    if (!goal || goal <= 0) return 0;
    return Math.min(((raised ?? 0) / goal) * 100, 100);
  };

  const formatCurrency = (val?: number) => {
    return `Bs. ${(val ?? 0).toFixed(2)}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]" />
      </div>
    );
  }

  return (
    <div className="min-h-full space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
            <Heart className="w-6 h-6 text-[var(--primary)]" />
          </div>
          <h2 className="text-3xl font-bold text-[var(--text-main)]">Donar</h2>
        </div>
        <p className="text-[var(--text-light)] ml-[52px]">
          Elige una fundación y haz la diferencia hoy
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-[var(--radius)] text-red-700 text-sm">{error}</div>
      )}
      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-[var(--radius)] text-green-700 text-sm">{success}</div>
      )}

      <div className="flex gap-6 flex-col lg:flex-row">
        {/* ─── MAIN CONTENT ─── */}
        <div className="flex-1 min-w-0 space-y-8">
          {/* CAROUSEL */}
          {carouselItems.length > 0 && (
            <CarouselSection
              items={carouselItems}
              activeIndex={activeCarousel}
              onGoTo={goTo}
              onDonate={handleDonate}
              getProgress={getProgress}
              formatCurrency={formatCurrency}
            />
          )}

          {/* ALL FOUNDATIONS */}
          <div>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <h3 className="text-xl font-semibold text-[var(--text-main)]">
                Todas las Fundaciones
              </h3>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-light)]" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar fundación..."
                  className="pl-8 pr-3 py-2 text-sm rounded-xl border border-[var(--border-color)] bg-white outline-none focus:border-[var(--primary)] transition-colors text-[var(--text-main)]"
                  style={{ width: 180 }}
                />
              </div>
            </div>

            <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className="whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium border-2 transition-all duration-200 flex-shrink-0"
                  style={{
                    borderColor: category === cat ? "var(--primary)" : "var(--border-color)",
                    backgroundColor: category === cat ? "var(--primary)" : "white",
                    color: category === cat ? "#fff" : "var(--text-light)",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-16 text-[var(--text-light)]">
                <SlidersHorizontal size={32} className="mx-auto mb-3 opacity-30" />
                <p>No se encontraron fundaciones con ese criterio</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((foundation) => (
                  <FoundationCard
                    key={foundation.id}
                    foundation={foundation}
                    onDonate={() => handleDonate(foundation)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

      {selectedOrg && (
        <DonationModal
          organization={selectedOrg}
          events={events}
          onClose={handleModalClose}
          onSuccess={handleModalSuccess}
        />
      )}
    </div>
  );
}

/* ─── CAROUSEL SUB-COMPONENT ─── */
function CarouselSection({
  items,
  activeIndex,
  onGoTo,
  onDonate,
  getProgress,
  formatCurrency,
}: {
  items: Organization[];
  activeIndex: number;
  onGoTo: (i: number) => void;
  onDonate: (org: Organization) => void;
  getProgress: (r?: number, g?: number) => number;
  formatCurrency: (v?: number) => string;
}) {
  const feat = items[activeIndex % items.length];
  const progress = getProgress(feat.raised, feat.goal);
  const palette = getOrgColors(feat.type, feat.category);

  return (
    <div className="relative">
      <div className="relative rounded-3xl overflow-hidden shadow-xl" style={{ minHeight: 320 }}>
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{ backgroundImage: `url(${feat.coverImage || ""})` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(120deg, ${palette.primaryDark}ee 0%, ${palette.primaryColor}99 60%, transparent 100%)`,
          }}
        />

        <div className="relative z-10 p-8 flex flex-col justify-between" style={{ minHeight: 320 }}>
          <div className="flex items-start justify-between">
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{ backgroundColor: "rgba(255,255,255,0.25)", color: "#fff" }}
            >
              <Star size={10} className="inline mr-1" />
              Fundación Destacada
            </span>
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "#fff" }}
            >
              {feat.category || feat.type}
            </span>
          </div>

          <div className="mt-auto space-y-4">
            <div>
              <h2 className="text-3xl font-bold text-white drop-shadow-sm">{feat.name}</h2>
              <p className="text-white/80 text-sm mt-1 max-w-md leading-relaxed">
                {feat.tagline || feat.address}
              </p>
            </div>

            <div className="flex gap-4 flex-wrap">
              {[
                { icon: Users, label: `${feat.donors || 0} donantes` },
                { icon: MapPin, label: feat.location || feat.address },
                { icon: TrendingUp, label: `${progress.toFixed(0)}% logrado` },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-1.5 text-white/90 text-xs">
                  <stat.icon size={13} />
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-white/80">
                <span>Recaudado: <strong className="text-white">{formatCurrency(feat.raised)}</strong></span>
                <span>Meta: <strong className="text-white">{formatCurrency(feat.goal)}</strong></span>
              </div>
              <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${progress}%`, backgroundColor: "#fff" }}
                />
              </div>
            </div>

            <button
              onClick={() => onDonate(feat)}
              className="px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
              style={{ backgroundColor: "#fff", color: palette.primaryDark }}
            >
              Donar ahora
            </button>
          </div>
        </div>

        {items.length > 1 && (
          <>
            <button
              onClick={() => onGoTo((activeIndex - 1 + items.length) % items.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => onGoTo((activeIndex + 1) % items.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {items.length > 1 && (
        <div className="flex justify-center gap-2 mt-3">
          {items.map((f, i) => (
            <button
              key={f.id}
              onClick={() => onGoTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === activeIndex ? 24 : 8,
                height: 8,
                backgroundColor: i === activeIndex ? palette.primaryColor : `${palette.primaryColor}40`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── FOUNDATION CARD ─── */
function FoundationCard({
  foundation,
  onDonate,
}: {
  foundation: Organization;
  onDonate: () => void;
}) {
  const palette = getOrgColors(foundation.type, foundation.category);
  const c = {
    primary: palette.primaryColor,
    dark: palette.primaryDark,
    light: palette.primaryLight,
  };
  const goal = foundation.goal ?? 0;
  const raised = foundation.raised ?? 0;
  const progress = goal > 0 ? Math.min((raised / goal) * 100, 100) : 0;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
      style={{
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        border: `1px solid ${hovered ? c.light : "var(--border-color)"}`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-44 overflow-hidden flex-shrink-0">
        <img
          src={foundation.image || getOrgImages(foundation.category).image}
          alt={foundation.name}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = getOrgImages(foundation.category).image;
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to top, ${c.dark}80 0%, transparent 60%)` }}
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {foundation.featured && (
            <span
              className="px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1"
              style={{ backgroundColor: c.primary, color: "#fff" }}
            >
              <Star size={9} />
              Destacada
            </span>
          )}
          <span
            className="px-2 py-0.5 rounded-full text-xs font-semibold"
            style={{ backgroundColor: "rgba(255,255,255,0.85)", color: c.dark }}
          >
            {foundation.category || foundation.type}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs">
          <MapPin size={11} />
          <span>{foundation.location || foundation.address}</span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="font-bold text-[var(--text-main)] leading-snug">{foundation.name}</h3>
          <p className="text-xs text-[var(--text-light)] mt-1 leading-relaxed line-clamp-2">
            {foundation.tagline || foundation.address}
          </p>
        </div>

        <div className="flex gap-3 text-xs text-[var(--text-light)]">
          <div className="flex items-center gap-1">
            <Users size={12} style={{ color: c.primary }} />
            <span>{foundation.donors || 0} donantes</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart size={12} style={{ color: c.primary }} />
            <span>{foundation.beneficiaries || 0} beneficiarios</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-[var(--text-light)]">Recaudado</span>
            <span className="font-semibold" style={{ color: c.primary }}>
              {progress.toFixed(0)}%
            </span>
          </div>
          <div className="h-2 bg-[var(--bg-cream)] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${progress}%`, backgroundColor: c.primary }}
            />
          </div>
          <div className="flex justify-between text-xs text-[var(--text-light)]">
            <span className="font-medium" style={{ color: c.dark }}>
              Bs. {raised.toFixed(2)}
            </span>
            <span>de Bs. {goal.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={onDonate}
          className="mt-auto w-full py-2.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 active:scale-95 flex items-center justify-center gap-2"
          style={{ backgroundColor: c.primary }}
        >
          <Heart size={14} />
          Donar
        </button>
      </div>
    </div>
  );
}
