import { useCallback, useEffect, useState } from "react";

/**
 * Стан, синхронізований з localStorage. Використовуємо для кошика та
 * гостьового userId, щоб дані переживали перезавантаження сторінки.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // приватний режим / переповнене сховище — ігноруємо
    }
  }, [key, value]);

  const reset = useCallback(() => setValue(initialValue), [initialValue]);

  return [value, setValue, reset];
}
