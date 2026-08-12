import { mockProducts } from "./mockProducts";

/**
 * ТИМЧАСОВА заміна беку для замовлень: зберігає їх у localStorage.
 * Повторює логіку майбутнього беку — ціни/назви бере з каталогу, а не з клієнта,
 * і рахує total сам. Коли з'явиться реальний бек, цей модуль не використовується.
 */
const STORAGE_KEY = "mock-orders";

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function writeAll(orders) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export const mockOrderStore = {
  async listByUser(userId) {
    return readAll()
      .filter((o) => o.userId === userId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },

  async create(payload) {
    const items = payload.items.map((line) => {
      const product = mockProducts.find((p) => p.id === line.productId);
      if (!product) throw new Error(`Товар не знайдено: ${line.productId}`);
      return {
        productId: product.id,
        title: product.title,
        price: product.price,
        quantity: line.quantity,
      };
    });

    const order = {
      id: crypto.randomUUID().slice(0, 8),
      userId: payload.userId,
      items,
      total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      currency: "UAH",
      customer: payload.customer,
      delivery: payload.delivery ?? null,
      payment: payload.payment ?? null,
      comment: payload.comment ?? "",
      status: "new",
      createdAt: new Date().toISOString(),
    };

    writeAll([...readAll(), order]);
    return order;
  },
};
