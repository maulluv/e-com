import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Скидає прокрутку на початок сторінки при переході на інший маршрут.
 * SPA за замовчуванням зберігає позицію прокрутки — через це посилання
 * "відкривалися" десь посередині. Реагуємо на зміну pathname (не на ?query),
 * щоб фільтри/пошук у каталозі не смикали сторінку вгору.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
