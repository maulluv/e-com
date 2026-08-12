import { cn } from "../../lib/cn";

/**
 * Панель фасетних фільтрів (стан, бренд, тип, наявність, ціна).
 * Презентаційний компонент — увесь стан тримає Catalog і передає сюди.
 * Використовується і в бічній колонці (desktop), і в Drawer (mobile).
 */
export function Filters({
  conditionOptions,
  brandOptions,
  typeOptions,
  selected,
  onToggle,
  onStock,
  onPrice,
  onReset,
  hasActive,
}) {
  return (
    <div className="flex flex-col gap-6">
      {hasActive && (
        <button
          onClick={onReset}
          className="self-start text-sm font-medium text-brand hover:underline"
        >
          Скинути фільтри
        </button>
      )}

      <FacetSection title="Наявність">
        <CheckboxRow
          label="Тільки в наявності"
          checked={selected.onlyInStock}
          onChange={() => onStock(!selected.onlyInStock)}
        />
      </FacetSection>

      {conditionOptions.length > 0 && (
        <FacetSection title="Стан">
          {conditionOptions.map((o) => (
            <CheckboxRow
              key={o.value}
              label={o.value}
              count={o.count}
              checked={selected.conditions.includes(o.value)}
              onChange={() => onToggle("conditions", o.value)}
            />
          ))}
        </FacetSection>
      )}

      {typeOptions.length > 0 && (
        <FacetSection title="Тип запчастини">
          {typeOptions.map((o) => (
            <CheckboxRow
              key={o.value}
              label={o.value}
              count={o.count}
              checked={selected.types.includes(o.value)}
              onChange={() => onToggle("types", o.value)}
            />
          ))}
        </FacetSection>
      )}

      {brandOptions.length > 0 && (
        <FacetSection title="Виробник">
          {brandOptions.map((o) => (
            <CheckboxRow
              key={o.value}
              label={o.value}
              count={o.count}
              checked={selected.brands.includes(o.value)}
              onChange={() => onToggle("brands", o.value)}
            />
          ))}
        </FacetSection>
      )}

      <FacetSection title="Ціна, ₴">
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            inputMode="numeric"
            placeholder="від"
            value={selected.priceMin}
            onChange={(e) => onPrice("priceMin", e.target.value)}
            className="h-10 w-full rounded-lg border border-border bg-surface px-3 text-sm text-fg placeholder:text-fg-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
          <span className="text-fg-muted">—</span>
          <input
            type="number"
            min="0"
            inputMode="numeric"
            placeholder="до"
            value={selected.priceMax}
            onChange={(e) => onPrice("priceMax", e.target.value)}
            className="h-10 w-full rounded-lg border border-border bg-surface px-3 text-sm text-fg placeholder:text-fg-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </div>
      </FacetSection>
    </div>
  );
}

function FacetSection({ title, children }) {
  return (
    <div>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-fg-muted">{title}</h3>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  );
}

function CheckboxRow({ label, count, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={cn(
          "h-4 w-4 shrink-0 cursor-pointer rounded border-border text-brand",
          "focus:ring-2 focus:ring-brand/30 focus:ring-offset-0",
        )}
      />
      <span className="text-fg">{label}</span>
      {count != null && <span className="text-fg-muted">({count})</span>}
    </label>
  );
}
