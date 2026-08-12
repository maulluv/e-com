import { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { useCart } from "../../context/CartContext";
import { useUserId } from "../../hooks/useUserId";
import { ordersApi } from "../../api/orders";
import { formatPrice } from "../../lib/format";

/**
 * Форма оформлення замовлення. Поки без авторизації — збираємо лише
 * ім'я, телефон і коментар. Замовлення йде на бек, який згодом
 * сповіщатиме власника в Telegram.
 */
export function CheckoutForm({ onSuccess, onBack }) {
  const { items, totalPrice, clear } = useCart();
  const userId = useUserId();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await ordersApi.create({
        userId,
        items: items.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
        customer: { name, phone, comment: comment || undefined },
      });
      clear();
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Ім'я"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ваше ім'я"
        required
      />
      <Input
        label="Телефон"
        name="phone"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="+380..."
        required
      />
      <Textarea
        label="Коментар (необов'язково)"
        name="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Побажання до замовлення"
      />

      {error && <p className="text-sm text-danger">{error}</p>}

      <div className="flex items-center justify-between text-sm">
        <span className="text-fg-muted">До сплати</span>
        <span className="text-lg font-bold text-fg">{formatPrice(totalPrice)}</span>
      </div>

      <Button type="submit" size="lg" fullWidth disabled={submitting}>
        {submitting ? "Оформлюємо..." : "Підтвердити замовлення"}
      </Button>
      <Button type="button" variant="ghost" onClick={onBack} disabled={submitting}>
        Назад до кошика
      </Button>
    </form>
  );
}
