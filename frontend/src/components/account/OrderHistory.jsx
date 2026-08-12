import { Badge } from "../ui/Badge";
import { Spinner } from "../ui/Spinner";
import { useOrders } from "../../hooks/useOrders";
import { formatDate, formatPrice } from "../../lib/format";

// Підписи та кольори статусів замовлення.
const statusLabels = {
  new: { label: "Нове", tone: "brand" },
  processing: { label: "В обробці", tone: "neutral" },
  done: { label: "Виконано", tone: "success" },
  cancelled: { label: "Скасовано", tone: "danger" },
};

/** Список замовлень користувача — єдиний вміст особистого кабінету. */
export function OrderHistory() {
  const { orders, loading, error } = useOrders();

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner className="h-7 w-7" />
      </div>
    );
  }

  if (error) {
    return <p className="py-16 text-center text-danger">Помилка: {error}</p>;
  }

  if (orders.length === 0) {
    return (
      <div className="rounded-[var(--radius-card)] border border-dashed border-border py-16 text-center text-fg-muted">
        У вас поки немає замовлень.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {orders.map((order) => {
        const status = statusLabels[order.status];
        return (
          <div key={order.id} className="rounded-[var(--radius-card)] border border-border bg-surface p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
              <div>
                <span className="font-semibold text-fg">Замовлення #{order.id}</span>
                <span className="ml-2 text-sm text-fg-muted">{formatDate(order.createdAt)}</span>
              </div>
              <Badge tone={status.tone}>{status.label}</Badge>
            </div>

            <ul className="divide-y divide-border py-2">
              {order.items.map((item) => (
                <li key={item.productId} className="flex justify-between py-2 text-sm">
                  <span className="text-fg">
                    {item.title} <span className="text-fg-muted">× {item.quantity}</span>
                  </span>
                  <span className="text-fg">{formatPrice(item.price * item.quantity, order.currency)}</span>
                </li>
              ))}
            </ul>

            <div className="flex justify-between border-t border-border pt-3 text-sm font-semibold">
              <span>Разом</span>
              <span>{formatPrice(order.total, order.currency)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
