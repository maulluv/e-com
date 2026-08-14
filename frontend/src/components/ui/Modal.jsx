import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "../../lib/cn";

/**
 * Універсальне модальне вікно: затемнення + панель по центру.
 * Закривається кліком по фону, хрестиком або Esc. Блокує прокрутку сторінки.
 *
 * Рендериться через портал у <body> — інакше `position: fixed` ламається,
 * якщо модал відкрито з елемента всередині хедера (у якого backdrop-blur
 * створює containing block для fixed-нащадків).
 *
 * header — довільний вміст шапки (зліва); якщо не задано, показуємо title.
 */
export function Modal({ open, onClose, title, header, children, maxWidth = "max-w-3xl" }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className={cn("mt-6 mb-6 w-full rounded-2xl bg-surface shadow-xl sm:mt-12", maxWidth)}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-border p-4 sm:px-6">
          {header ?? <h2 className="text-lg font-semibold text-fg">{title}</h2>}
          <button
            onClick={onClose}
            aria-label="Закрити"
            className="shrink-0 rounded-lg p-1.5 text-fg-muted transition-colors hover:bg-muted hover:text-fg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4 sm:p-6">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
