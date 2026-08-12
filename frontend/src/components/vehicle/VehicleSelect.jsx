import { useState } from "react";
import { Car, ChevronDown, RefreshCw, X } from "lucide-react";
import { VehicleModal } from "./VehicleModal";
import { useVehicle } from "../../context/VehicleContext";
import { cn } from "../../lib/cn";

/**
 * Кнопка-фільтр "Виберіть авто". Якщо авто вже обране — показує його
 * та дозволяє змінити (кнопка) або скинути (хрестик).
 */
export function VehicleSelect({ className }) {
  const { vehicle, clear } = useVehicle();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={cn("flex items-stretch gap-2", className)}>
        <button
          onClick={() => setOpen(true)}
          className={cn(
            "flex flex-1 items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-colors",
            vehicle
              ? "border-brand bg-brand/5 text-fg hover:bg-brand/10"
              : "border-border bg-surface text-fg hover:bg-muted",
          )}
        >
          <span className="flex items-center gap-2.5 truncate">
            <Car className={cn("h-5 w-5 shrink-0", vehicle ? "text-brand" : "text-fg-muted")} />
            {vehicle ? (
              <span className="truncate">
                {/* genLabel уже містить модель (напр. "Jetta 5"), тож modelLabel не дублюємо */}
                <span className="font-semibold">
                  {vehicle.brandLabel} {vehicle.genLabel}
                </span>
                <span className="ml-2 text-sm text-fg-muted">{vehicle.years}</span>
              </span>
            ) : (
              <span className="font-medium">Виберіть авто</span>
            )}
          </span>
          {vehicle ? (
            <RefreshCw className="h-4 w-4 shrink-0 text-fg-muted" />
          ) : (
            <ChevronDown className="h-5 w-5 shrink-0 text-fg-muted" />
          )}
        </button>

        {vehicle && (
          <button
            onClick={clear}
            aria-label="Скинути авто"
            className="flex w-12 items-center justify-center rounded-xl border border-border text-fg-muted transition-colors hover:bg-muted hover:text-danger"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <VehicleModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
