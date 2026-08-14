import { useState } from "react";
import { Car, ChevronDown } from "lucide-react";
import { VehicleModal } from "./VehicleModal";
import { useVehicle } from "../../context/VehicleContext";

/** Компактний вибір авто в хедері — видно на всіх сторінках. */
export function HeaderVehicle({ className }) {
  const { vehicle } = useVehicle();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={
          "inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm text-fg transition-colors hover:bg-muted " +
          (className ?? "")
        }
      >
        <Car className="h-4 w-4 shrink-0 text-brand" />
        <span className="max-w-[180px] truncate font-medium">
          {vehicle ? `${vehicle.brandLabel} ${vehicle.genLabel}` : "Виберіть авто"}
        </span>
        <ChevronDown className="h-3.5 w-3.5 shrink-0 text-fg-muted" />
      </button>
      <VehicleModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
