import { cn } from "../../lib/cn";

/**
 * Квадратна кнопка-іконка (кошик у хедері, закриття панелі тощо).
 * label обов'язковий — йде в aria-label для доступності.
 */
export function IconButton({ children, label, className, ...props }) {
  return (
    <button
      aria-label={label}
      className={cn(
        "relative inline-flex h-10 w-10 items-center justify-center rounded-xl text-fg transition-colors hover:bg-muted",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
