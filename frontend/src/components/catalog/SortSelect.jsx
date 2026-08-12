import { useEffect, useRef, useState } from "react";
import { ArrowDownWideNarrow, Check, ChevronDown } from "lucide-react";
import { cn } from "../../lib/cn";

// Варіанти сортування/добірки. "популярні" — типовий стан (без сортування).
// "акції" та "новинки" показують лише відповідні товари.
export const sortOptions = [
  { id: "cheap", label: "дешеві" },
  { id: "expensive", label: "дорогі" },
  { id: "popular", label: "популярні" },
  { id: "sale", label: "акції" },
  { id: "new", label: "новинки" },
];

/** Дропдаун сортування. Закривається кліком поза ним. */
export function SortSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const current = sortOptions.find((o) => o.id === value) ?? sortOptions.find((o) => o.id === "popular");

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-fg transition-colors hover:bg-muted"
      >
        <ArrowDownWideNarrow className="h-4 w-4 text-fg-muted" />
        {current.label}
        <ChevronDown className={cn("h-4 w-4 text-fg-muted transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute right-0 z-40 mt-2 min-w-44 rounded-xl border border-border bg-surface p-1 shadow-lg">
          {sortOptions.map((o) => (
            <button
              key={o.id}
              onClick={() => {
                onChange(o.id);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                o.id === current.id ? "text-brand" : "text-fg hover:bg-muted",
              )}
            >
              {o.label}
              {o.id === current.id && <Check className="h-4 w-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
