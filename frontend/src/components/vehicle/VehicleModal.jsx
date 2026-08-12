import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Car, Search } from "lucide-react";
import { Modal } from "../ui/Modal";
import { useVehicle } from "../../context/VehicleContext";
import { vehicleBrands } from "../../config/vehicles";

/**
 * Покроковий вибір авто: марка → модель → покоління (рік).
 * На кожному кроці працює пошук. Після вибору покоління — зберігаємо авто.
 */
export function VehicleModal({ open, onClose }) {
  const { setVehicle } = useVehicle();
  const [step, setStep] = useState("brand"); // brand | model | gen
  const [brand, setBrand] = useState(null);
  const [model, setModel] = useState(null);
  const [query, setQuery] = useState("");

  // Скидаємо стан щоразу при відкритті.
  useEffect(() => {
    if (open) {
      setStep("brand");
      setBrand(null);
      setModel(null);
      setQuery("");
    }
  }, [open]);

  const goBack = () => {
    setQuery("");
    if (step === "gen") setStep("model");
    else if (step === "model") setStep("brand");
  };

  const chooseBrand = (b) => {
    setBrand(b);
    setStep("model");
    setQuery("");
  };
  const chooseModel = (m) => {
    setModel(m);
    setStep("gen");
    setQuery("");
  };
  const chooseGen = (g) => {
    setVehicle({
      brandId: brand.id,
      brandLabel: brand.label,
      modelId: model.id,
      modelLabel: model.label,
      genId: g.id,
      genLabel: g.label,
      years: g.years,
    });
    onClose();
  };

  const q = query.trim().toLowerCase();
  const placeholder =
    step === "brand" ? "Пошук марки" : step === "model" ? "Пошук моделі" : "Пошук покоління";

  return (
    <Modal open={open} onClose={onClose} title="Виберіть авто" maxWidth="max-w-4xl">
      {/* Пошук */}
      <div className="relative mb-4">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-fg-muted" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="h-12 w-full rounded-xl border border-border bg-muted pl-12 pr-4 text-sm text-fg placeholder:text-fg-muted focus:border-brand focus:bg-surface focus:outline-none focus:ring-2 focus:ring-brand/20"
        />
      </div>

      {/* Кнопка "назад" на кроках моделі/покоління */}
      {step !== "brand" && (
        <button
          onClick={goBack}
          className="mb-4 inline-flex items-center gap-1 rounded-xl border border-border px-4 py-2 text-sm font-medium text-fg transition-colors hover:bg-muted"
        >
          <ChevronLeft className="h-4 w-4" /> назад
        </button>
      )}

      {/* Крок 1: марки */}
      {step === "brand" && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {vehicleBrands
            .filter((b) => b.label.toLowerCase().includes(q))
            .map((b) => (
              <button
                key={b.id}
                onClick={() => chooseBrand(b)}
                className="flex flex-col items-center gap-2 rounded-xl border border-border bg-surface p-5 transition-all hover:border-brand hover:shadow-md"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-fg-muted">
                  <Car className="h-6 w-6" />
                </span>
                <span className="text-sm font-semibold text-fg">{b.label}</span>
              </button>
            ))}
        </div>
      )}

      {/* Крок 2: моделі */}
      {step === "model" && brand && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {brand.models
            .filter((m) => m.label.toLowerCase().includes(q))
            .map((m) => (
              <button
                key={m.id}
                onClick={() => chooseModel(m)}
                className="flex items-center justify-between gap-2 rounded-xl border border-border bg-surface px-5 py-4 text-left transition-colors hover:border-brand hover:bg-muted"
              >
                <span className="font-medium text-fg">{m.label}</span>
                <ChevronRight className="h-5 w-5 text-fg-muted" />
              </button>
            ))}
        </div>
      )}

      {/* Крок 3: покоління / рік */}
      {step === "gen" && model && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {model.generations
            .filter((g) => g.label.toLowerCase().includes(q))
            .map((g) => (
              <button
                key={g.id}
                onClick={() => chooseGen(g)}
                className="flex flex-col items-start gap-1 rounded-xl border border-border bg-surface px-5 py-4 text-left transition-all hover:border-brand hover:shadow-md"
              >
                <span className="font-semibold text-fg">{g.label}</span>
                <span className="rounded-md bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                  {g.years}
                </span>
              </button>
            ))}
        </div>
      )}
    </Modal>
  );
}
