# Backend

Місце під бекенд (його пише окрема людина). Поки порожнє.

Фронт наразі працює на моках (`frontend/src/api/mock/`) і не потребує беку.

## Як підключити бек, коли буде готовий

Фронт очікує такий контракт API:

- `GET  /api/products` → `Product[]`
- `GET  /api/products/:id` → `Product`
- `GET  /api/orders?userId=<id>` → `Order[]`
- `POST /api/orders` → `Order`. Тіло:
  ```jsonc
  {
    "userId": "string",
    "items": [{ "productId": "string", "quantity": 1 }],
    "customer": { "name": "string", "phone": "string", "email": "string?" },
    "delivery": {
      "method": "np-branch | courier | pickup",
      "city": "string?",     // для np-branch / courier
      "branch": "string?",   // для np-branch
      "address": "string?"   // для courier
    },
    "payment": { "method": "cod | card | cash" },
    "comment": "string?"
  }
  ```
  Ціни й назви бек має брати зі СВОЄЇ бази товарів (не з клієнта) і рахувати `total` сам.

Форми фронта: повне оформлення — `frontend/src/pages/CheckoutPage.jsx`;
швидке замовлення (лише телефон) — `frontend/src/components/product/QuickOrderForm.jsx`.
Товар/замовлення описані структурами в `frontend/src/api/mock/`.

Картинки товарів: у `Product.imageUrl` має бути абсолютний URL, який роздає бек.

### Перемикання фронта на реальний бек

У `frontend/.env` вписати адресу беку — і все:

```
VITE_API_URL=http://localhost:4000
```

Поки цієї змінної немає — фронт автоматично використовує моки.
