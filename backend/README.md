# Backend

Місце під бекенд (його пише окрема людина). Поки порожнє.

Фронт наразі працює на моках (`frontend/src/api/mock/`) і не потребує беку.

## Як підключити бек, коли буде готовий

Фронт очікує такий контракт API:

- `GET  /api/products` → `Product[]`
- `GET  /api/products/:id` → `Product`
- `GET  /api/orders?userId=<id>` → `Order[]`
- `POST /api/orders` (тіло: `{ userId, items: [{ productId, quantity }], customer }`) → `Order`

Типи `Product` / `Order` / `CustomerInfo` — у `frontend/src/types/index.ts`.

Картинки товарів: у `Product.imageUrl` має бути абсолютний URL, який роздає бек.

### Перемикання фронта на реальний бек

У `frontend/.env` вписати адресу беку — і все:

```
VITE_API_URL=http://localhost:4000
```

Поки цієї змінної немає — фронт автоматично використовує моки.
