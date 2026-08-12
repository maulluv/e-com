import { useEffect, useMemo, useState } from "react";
import {
  Disc3,
  Cog,
  Spline,
  Filter,
  Droplet,
  BatteryCharging,
  CircleDot,
  CarFront,
  ChevronLeft,
  ChevronRight,
  Search,
  LayoutGrid,
} from "lucide-react";
import { Modal } from "../ui/Modal";
import { categories } from "../../config/categories";

const iconMap = { Disc3, Cog, Spline, Filter, Droplet, BatteryCharging, CircleDot, CarFront };

/**
 * Двоступеневий вибір категорії: категорія → підкатегорія.
 * onSelect(categoryId, subcategoryId | null) застосовує фільтр і закриває модалку.
 */
export function CategoryModal({ open, onClose, onSelect }) {
  const [cat, setCat] = useState(null); // обрана категорія для другого кроку
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (open) {
      setCat(null);
      setQuery("");
    }
  }, [open]);

  const q = query.trim().toLowerCase();

  // Другий крок: підкатегорії поточної категорії, згруповані за полем group.
  const groupedSubs = useMemo(() => {
    if (!cat) return [];
    const subs = cat.subcategories.filter((s) => s.label.toLowerCase().includes(q));
    const order = [];
    const map = new Map();
    for (const s of subs) {
      const key = s.group ?? "";
      if (!map.has(key)) {
        map.set(key, []);
        order.push(key);
      }
      map.get(key).push(s);
    }
    return order.map((key) => ({ title: key, items: map.get(key) }));
  }, [cat, q]);

  const header = cat ? (
    <button
      onClick={() => {
        setCat(null);
        setQuery("");
      }}
      className="inline-flex items-center gap-2 text-brand"
    >
      <ChevronLeft className="h-5 w-5" />
      <span className="font-semibold">{cat.label}</span>
    </button>
  ) : undefined;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Категорії"
      header={header}
      maxWidth="max-w-4xl"
    >
      {/* Пошук */}
      <div className="relative mb-4">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-fg-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={cat ? "Пошук підкатегорії" : "Пошук категорії"}
          className="h-12 w-full rounded-xl border border-border bg-muted pl-12 pr-4 text-sm text-fg placeholder:text-fg-muted focus:border-brand focus:bg-surface focus:outline-none focus:ring-2 focus:ring-brand/20"
        />
      </div>

      {/* Крок 1: категорії */}
      {!cat && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories
            .filter((c) => c.label.toLowerCase().includes(q))
            .map((c) => {
              const Icon = iconMap[c.icon] ?? Cog;
              return (
                <button
                  key={c.id}
                  onClick={() => setCat(c)}
                  className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface px-5 py-4 text-left transition-colors hover:border-brand hover:bg-muted"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/10 text-brand">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-medium text-fg">{c.label}</span>
                  </span>
                  <ChevronRight className="h-5 w-5 text-fg-muted" />
                </button>
              );
            })}
        </div>
      )}

      {/* Крок 2: підкатегорії */}
      {cat && (
        <div className="flex flex-col gap-6">
          {/* Усі товари категорії */}
          <button
            onClick={() => onSelect(cat.id, null)}
            className="flex items-center gap-2 self-start rounded-xl bg-brand px-5 py-2.5 text-sm font-medium text-brand-fg transition-colors hover:bg-brand-hover"
          >
            <LayoutGrid className="h-4 w-4" /> Усі товари категорії
          </button>

          {groupedSubs.map((group) => (
            <div key={group.title || "default"}>
              {group.title && (
                <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand">
                  {group.title}
                </h4>
              )}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => onSelect(cat.id, s.id)}
                    className="flex items-center justify-between gap-2 rounded-xl border border-border bg-surface px-5 py-3.5 text-left transition-colors hover:border-brand hover:bg-muted"
                  >
                    <span className="font-medium text-fg">{s.label}</span>
                    <ChevronRight className="h-5 w-5 text-fg-muted" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
}
