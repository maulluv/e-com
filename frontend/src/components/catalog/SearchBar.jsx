import { Search, X } from "lucide-react";
import { cn } from "../../lib/cn";

/** Поле пошуку по каталогу (назва / бренд / артикул). Кероване через props. */
export function SearchBar({ value, onChange, className }) {
  return (
    <div className={cn("relative", className)}>
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-fg-muted" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Пошук: назва, бренд або артикул"
        className="h-11 w-full rounded-xl border border-border bg-surface pl-11 pr-10 text-sm text-fg placeholder:text-fg-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Очистити пошук"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted hover:text-fg"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
