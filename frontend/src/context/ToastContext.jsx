import { createContext, useCallback, useContext, useRef, useState } from "react";
import { Check, X } from "lucide-react";

const ToastContext = createContext(null);

/**
 * Тости — короткі спливаючі сповіщення (напр. «Додано в кошик»).
 * ToastProvider тримає список і сам рендерить їх у кутку екрана.
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), []);

  const show = useCallback(
    (message, { duration = 2600 } = {}) => {
      const id = ++idRef.current;
      setToasts((t) => [...t, { id, message }]);
      setTimeout(() => dismiss(id), duration);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex flex-col items-center gap-2 px-4">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 shadow-lg"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-success/10 text-success">
              <Check className="h-4 w-4" />
            </span>
            <span className="text-sm font-medium text-fg">{t.message}</span>
            <button
              onClick={() => dismiss(t.id)}
              aria-label="Закрити"
              className="text-fg-muted hover:text-fg"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast має використовуватись усередині <ToastProvider>");
  return ctx;
}
