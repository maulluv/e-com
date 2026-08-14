import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useToast } from "./ToastContext";

const CartContext = createContext(null);

/**
 * Кошик як контекст + хук (замість глобального стору).
 * Дані персистяться в localStorage, тож зберігаються між сесіями.
 *
 * Позиція кошика: { product, quantity }.
 */
export function CartProvider({ children }) {
  const [items, setItems, resetItems] = useLocalStorage("cart", []);
  const [isOpen, setIsOpen] = useState(false);
  const { show } = useToast();

  const addItem = useCallback(
    (product, quantity = 1) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.product.id === product.id);
        if (existing) {
          return prev.map((i) =>
            i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i,
          );
        }
        return [...prev, { product, quantity }];
      });
      show("Додано в кошик");
    },
    [setItems, show],
  );

  const removeItem = useCallback(
    (productId) => {
      setItems((prev) => prev.filter((i) => i.product.id !== productId));
    },
    [setItems],
  );

  const updateQuantity = useCallback(
    (productId, quantity) => {
      if (quantity < 1) return;
      setItems((prev) =>
        prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i)),
      );
    },
    [setItems],
  );

  const value = useMemo(() => {
    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
    return {
      items,
      totalItems,
      totalPrice,
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      addItem,
      removeItem,
      updateQuantity,
      clear: resetItems,
    };
  }, [items, isOpen, addItem, removeItem, updateQuantity, resetItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/** Доступ до кошика з будь-якого компонента. */
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart має використовуватись усередині <CartProvider>");
  return ctx;
}
