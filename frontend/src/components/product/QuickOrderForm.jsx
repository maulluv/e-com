import { useState } from "react";
import { Phone, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/Button";
import { useUserId } from "../../hooks/useUserId";
import { useVehicle } from "../../context/VehicleContext";
import { ordersApi } from "../../api/orders";

/**
 * Швидке замовлення: клієнт лишає телефон — і ми оформлюємо замовлення
 * на цей товар (1 шт) та передзвонюємо. Використовує той самий API,
 * що й звичайне оформлення (у майбутньому — сповіщення власнику в Telegram).
 */
export function QuickOrderForm({ product }) {
  const userId = useUserId();
  const { vehicle } = useVehicle();
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await ordersApi.create({
        userId,
        items: [{ productId: product.id, quantity: 1 }],
        customer: {
          name: "Швидке замовлення",
          phone,
          comment: vehicle
            ? `Авто: ${vehicle.brandLabel} ${vehicle.genLabel} (${vehicle.years})`
            : undefined,
        },
      });
      setDone(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-success/30 bg-success/5 p-4">
        <CheckCircle2 className="h-6 w-6 shrink-0 text-success" />
        <p className="text-sm text-fg">
          Дякуємо! Ми зателефонуємо вам найближчим часом, щоб підтвердити замовлення.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-muted/50 p-4">
      <p className="mb-3 text-sm font-semibold text-fg">Швидке замовлення</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-muted" />
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Ваш номер телефону"
            className="h-11 w-full rounded-xl border border-border bg-surface pl-10 pr-3 text-sm text-fg placeholder:text-fg-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </div>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Надсилаємо..." : "Передзвоніть мені"}
        </Button>
      </form>
      {error && <p className="mt-2 text-sm text-danger">{error}</p>}
    </div>
  );
}
