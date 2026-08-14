import { createContext, useCallback, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useToast } from "./ToastContext";

const WishlistContext = createContext(null);

/**
 * Обране (вішліст) — список товарів, збережений у localStorage.
 * Зберігаємо знімки товарів, щоб сторінка обраного працювала без беку.
 */
export function WishlistProvider({ children }) {
  const [items, setItems, reset] = useLocalStorage("wishlist", []);
  const { show } = useToast();

  const has = useCallback((id) => items.some((p) => p.id === id), [items]);

  const toggle = useCallback(
    (product) => {
      setItems((prev) => {
        if (prev.some((p) => p.id === product.id)) {
          show("Прибрано з обраного");
          return prev.filter((p) => p.id !== product.id);
        }
        show("Додано в обране");
        return [...prev, product];
      });
    },
    [setItems, show],
  );

  const remove = useCallback((id) => setItems((prev) => prev.filter((p) => p.id !== id)), [setItems]);

  const value = useMemo(
    () => ({ items, count: items.length, has, toggle, remove, clear: reset }),
    [items, has, toggle, remove, reset],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist має використовуватись усередині <WishlistProvider>");
  return ctx;
}
