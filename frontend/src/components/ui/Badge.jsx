import { cn } from "../../lib/cn";

// М'який фон + тонкий inset-ring того ж відтінку. Опційна крапка — для статусів.
const toneClasses = {
  brand: "bg-brand/10 text-brand ring-brand/20",
  neutral: "bg-muted text-fg-muted ring-fg-muted/20",
  success: "bg-success/10 text-success ring-success/25",
  danger: "bg-danger/10 text-danger ring-danger/25",
};

const dotClasses = {
  brand: "bg-brand",
  neutral: "bg-fg-muted",
  success: "bg-success",
  danger: "bg-danger",
};

/**
 * Маленька мітка-пігулка (статус замовлення, наявність, "Оригінал" тощо).
 * dot=true додає кольорову крапку зліва (для статусів наявності).
 */
export function Badge({ children, tone = "neutral", dot = false }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset",
        toneClasses[tone],
      )}
    >
      {dot && <span className={cn("h-1.5 w-1.5 rounded-full", dotClasses[tone])} />}
      {children}
    </span>
  );
}
