import { cn } from "../../lib/cn";

/** Багаторядкове поле (напр. коментар до замовлення). */
export function Textarea({ label, className, id, ...props }) {
  const fieldId = id ?? props.name;
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={fieldId} className="text-sm font-medium text-fg">
          {label}
        </label>
      )}
      <textarea
        id={fieldId}
        className={cn(
          "min-h-24 rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-fg",
          "placeholder:text-fg-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20",
          className,
        )}
        {...props}
      />
    </div>
  );
}
