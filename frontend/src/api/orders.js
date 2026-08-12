import { api } from "./client";
import { USE_MOCK } from "./config";
import { mockOrderStore } from "./mock/mockOrderStore";

// payload: { userId, items: [{ productId, quantity }], customer: { name, phone, comment? } }
export const ordersApi = {
  listByUser: (userId) =>
    USE_MOCK
      ? mockOrderStore.listByUser(userId)
      : api.get(`/api/orders?userId=${encodeURIComponent(userId)}`),

  create: (payload) =>
    USE_MOCK ? mockOrderStore.create(payload) : api.post("/api/orders", payload),
};
