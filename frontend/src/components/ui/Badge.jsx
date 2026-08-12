import { cn } from "../../lib/cn";

const toneClasses = {
  brand: "bg-brand/10 text-brand",
  neutral: "bg-muted text-fg-muted",
  success: "bg-success/10 text-success",
  danger: "bg-danger/10 text-danger",
};

/** Маленька мітка статусу (напр. статус замовлення, "немає в наявності"). */
export function Badge({ children, tone = "neutral" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        toneClasses[tone],
      )}
    >
      {children}
    </span>
  );
}
