import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/cn";

/**
 * Універсальна висувна панель (ліворуч або праворуч).
 * Закривається кліком по фону, хрестиком або Esc.
 */
export function Drawer({ open, onClose, title, side = "right", children, widthClass = "max-w-sm" }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const hiddenTransform = side === "right" ? "translate-x-full" : "-translate-x-full";

  return (
    <>
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-black/40 transition-opacity",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <aside
        className={cn(
          "fixed top-0 z-50 flex h-full w-full flex-col bg-surface shadow-xl transition-transform duration-300",
          widthClass,
          side === "right" ? "right-0" : "left-0",
          open ? "translate-x-0" : hiddenTransform,
        )}
      >
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="text-lg font-semibold text-fg">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Закрити"
            className="rounded-lg p-1.5 text-fg-muted transition-colors hover:bg-muted hover:text-fg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </aside>
    </>
  );
}
