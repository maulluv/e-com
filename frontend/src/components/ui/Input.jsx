import { cn } from "../../lib/cn";

/** Текстове поле з підписом та повідомленням про помилку. */
export function Input({ label, error, className, id, ...props }) {
  const inputId = id ?? props.name;
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-fg">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          "h-11 rounded-xl border border-border bg-surface px-3.5 text-sm text-fg",
          "placeholder:text-fg-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20",
          error && "border-danger focus:border-danger focus:ring-danger/20",
          className,
        )}
        {...props}
      />
      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  );
}
