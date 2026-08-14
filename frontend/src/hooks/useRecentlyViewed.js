import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

const LIMIT = 8;

/**
 * Нещодавно переглянуті товари (знімки у localStorage).
 * track(product) додає товар на початок списку (без дублів, максимум LIMIT).
 */
export function useRecentlyViewed() {
  const [items, setItems] = useLocalStorage("recently-viewed", []);

  const track = useCallback(
    (product) => {
      setItems((prev) => [product, ...prev.filter((p) => p.id !== product.id)].slice(0, LIMIT));
    },
    [setItems],
  );

  return { items, track };
}
