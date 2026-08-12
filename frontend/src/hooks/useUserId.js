import { useLocalStorage } from "./useLocalStorage";

/**
 * Тимчасовий ідентифікатор "гостя". Поки немає авторизації, він дозволяє
 * прив'язувати замовлення до конкретного браузера й показувати історію.
 * Коли зробимо логін/реєстрацію — замінимо на реальний userId з бекенду.
 */
export function useUserId() {
  const [userId] = useLocalStorage("userId", crypto.randomUUID());
  return userId;
}
