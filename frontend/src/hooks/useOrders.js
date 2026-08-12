import { useCallback, useEffect, useState } from "react";
import { ordersApi } from "../api/orders";
import { useUserId } from "./useUserId";

/**
 * Історія замовлень поточного користувача (для особистого кабінету).
 * refetch() дозволяє оновити список після оформлення нового замовлення.
 */
export function useOrders() {
  const userId = useUserId();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    ordersApi
      .listByUser(userId)
      .then(setOrders)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [userId]);

  useEffect(() => {
    load();
  }, [load]);

  return { orders, loading, error, refetch: load };
}
