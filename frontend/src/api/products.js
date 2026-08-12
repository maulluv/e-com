import { api } from "./client";
import { USE_MOCK } from "./config";
import { mockProducts } from "./mock/mockProducts";

export const productsApi = {
  list: () => (USE_MOCK ? Promise.resolve(mockProducts) : api.get("/api/products")),

  getById: (id) => {
    if (USE_MOCK) {
      const product = mockProducts.find((p) => p.id === id);
      return product
        ? Promise.resolve(product)
        : Promise.reject(new Error("Товар не знайдено"));
    }
    return api.get(`/api/products/${id}`);
  },
};
