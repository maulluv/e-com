import { cn } from "../../lib/cn";

/**
 * Обгортка з максимальною шириною та горизонтальними відступами.
 * Задає єдину сітку для всіх секцій (хедер, контент, футер).
 */
export function Container({ children, className }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>{children}</div>;
}
