import { cn } from "../../lib/cn";

/** Пульсуючий плейсхолдер для стану завантаження. */
export function Skeleton({ className }) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} />;
}
