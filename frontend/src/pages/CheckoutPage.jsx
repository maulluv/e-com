import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Banknote,
  CheckCircle2,
  CreditCard,
  PackageCheck,
  ShoppingBag,
  Store,
  Truck,
  Wallet,
} from "lucide-react";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { useCart } from "../context/CartContext";
import { useUserId } from "../hooks/useUserId";
import { useVehicle } from "../context/VehicleContext";
import { ordersApi } from "../api/orders";
import { formatPrice } from "../lib/format";
import { deliveryMethods, paymentMethods } from "../config/checkout";

const icons = { Truck, PackageCheck, Store, Banknote, CreditCard, Wallet };

export function CheckoutPage() {
  const { items, totalPrice, clear } = useCart();
  const userId = useUserId();
  const { vehicle } = useVehicle();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    delivery: "np-branch",
    city: "",
    branch: "",
    address: "",
    payment: "cod",
    comment: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  const activeDelivery = deliveryMethods.find((m) => m.id === form.delivery);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const delivery = { method: form.delivery };
      if (activeDelivery.fields.includes("city")) delivery.city = form.city;
      if (activeDelivery.fields.includes("branch")) delivery.branch = form.branch;
      if (activeDelivery.fields.includes("address")) delivery.address = form.address;

      const created = await ordersApi.create({
        userId,
        items: items.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
        customer: { name: form.name, phone: form.phone, email: form.email || undefined },
        delivery,
        payment: { method: form.payment },
        comment: [form.comment, vehicle && `Авто: ${vehicle.brandLabel} ${vehicle.genLabel}`]
          .filter(Boolean)
          .join(". "),
      });
      setOrder(created);
      clear();
      window.scrollTo({ top: 0 });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Успішне замовлення
  if (order) {
    return (
      <Container className="py-16">
        <div className="mx-auto max-w-lg rounded-[var(--radius-card)] border border-border bg-surface p-8 text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-success" />
          <h1 className="mt-4 text-2xl font-bold text-fg">Замовлення прийнято!</h1>
          <p className="mt-2 text-fg-muted">
            Номер замовлення <span className="font-semibold text-fg">#{order.id}</span>. Ми
            зателефонуємо вам найближчим часом для підтвердження.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/catalog">
              <Button variant="outline">Продовжити покупки</Button>
            </Link>
            <Link to="/">
              <Button>На головну</Button>
            </Link>
          </div>
        </div>
      </Container>
    );
  }

  // Порожній кошик
  if (items.length === 0) {
    return (
      <Container className="py-20 text-center">
        <ShoppingBag className="mx-auto h-14 w-14 text-fg-muted" />
        <p className="mt-4 text-fg-muted">Кошик порожній — нема що оформлювати.</p>
        <Link to="/catalog" className="mt-6 inline-block">
          <Button>До каталогу</Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold text-fg">Оформлення замовлення</h1>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Форма */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Контакти */}
          <Section title="Контактні дані">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Ім'я та прізвище" name="name" value={form.name} onChange={set("name")} required />
              <Input label="Телефон" name="phone" type="tel" placeholder="+380..." value={form.phone} onChange={set("phone")} required />
              <Input label="Email (необов'язково)" name="email" type="email" value={form.email} onChange={set("email")} wrapperClassName="sm:col-span-2" />
            </div>
          </Section>

          {/* Доставка */}
          <Section title="Доставка">
            <div className="flex flex-col gap-3">
              {deliveryMethods.map((m) => (
                <RadioCard
                  key={m.id}
                  name="delivery"
                  option={m}
                  checked={form.delivery === m.id}
                  onChange={() => setForm((f) => ({ ...f, delivery: m.id }))}
                />
              ))}
            </div>

            {/* Поля залежно від способу доставки */}
            {activeDelivery.fields.length > 0 && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {activeDelivery.fields.includes("city") && (
                  <Input label="Місто" name="city" value={form.city} onChange={set("city")} required />
                )}
                {activeDelivery.fields.includes("branch") && (
                  <Input label="Відділення №" name="branch" placeholder="Напр. Відділення №5" value={form.branch} onChange={set("branch")} required />
                )}
                {activeDelivery.fields.includes("address") && (
                  <Input label="Адреса" name="address" placeholder="Вулиця, будинок, кв." value={form.address} onChange={set("address")} required wrapperClassName="sm:col-span-2" />
                )}
              </div>
            )}
          </Section>

          {/* Оплата */}
          <Section title="Оплата">
            <div className="flex flex-col gap-3">
              {paymentMethods.map((m) => (
                <RadioCard
                  key={m.id}
                  name="payment"
                  option={m}
                  checked={form.payment === m.id}
                  onChange={() => setForm((f) => ({ ...f, payment: m.id }))}
                />
              ))}
            </div>
          </Section>

          {/* Коментар */}
          <Section title="Коментар до замовлення">
            <Textarea name="comment" value={form.comment} onChange={set("comment")} placeholder="Побажання, уточнення сумісності тощо" />
          </Section>
        </div>

        {/* Підсумок */}
        <div className="lg:col-span-1">
          <div className="sticky top-40 rounded-[var(--radius-card)] border border-border bg-surface p-5">
            <h2 className="text-lg font-bold text-fg">Ваше замовлення</h2>

            <ul className="mt-4 divide-y divide-border">
              {items.map((i) => (
                <li key={i.product.id} className="flex justify-between gap-3 py-2.5 text-sm">
                  <span className="text-fg">
                    {i.product.title} <span className="text-fg-muted">× {i.quantity}</span>
                  </span>
                  <span className="shrink-0 font-medium text-fg">
                    {formatPrice(i.product.price * i.quantity, i.product.currency)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <span className="text-fg-muted">Разом</span>
              <span className="text-2xl font-bold text-fg">{formatPrice(totalPrice)}</span>
            </div>

            {error && <p className="mt-3 text-sm text-danger">{error}</p>}

            <Button type="submit" size="lg" fullWidth disabled={submitting} className="mt-5">
              {submitting ? "Оформлюємо..." : "Підтвердити замовлення"}
            </Button>
            <p className="mt-3 text-center text-xs text-fg-muted">
              Натискаючи кнопку, ви погоджуєтесь з умовами магазину
            </p>
          </div>
        </div>
      </form>
    </Container>
  );
}

function Section({ title, children }) {
  return (
    <section className="rounded-[var(--radius-card)] border border-border bg-surface p-5 sm:p-6">
      <h2 className="mb-4 text-lg font-bold text-fg">{title}</h2>
      {children}
    </section>
  );
}

/** Клікабельна картка-радіо для вибору доставки/оплати. */
function RadioCard({ name, option, checked, onChange }) {
  const Icon = icons[option.icon];
  return (
    <label
      className={
        "flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors " +
        (checked ? "border-brand bg-brand/5" : "border-border hover:bg-muted")
      }
    >
      <input type="radio" name={name} checked={checked} onChange={onChange} className="sr-only" />
      <span
        className={
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg " +
          (checked ? "bg-brand text-brand-fg" : "bg-muted text-fg-muted")
        }
      >
        {Icon && <Icon className="h-5 w-5" />}
      </span>
      <span className="flex-1">
        <span className="block font-medium text-fg">{option.label}</span>
        {option.note && <span className="block text-sm text-fg-muted">{option.note}</span>}
      </span>
      <span
        className={
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 " +
          (checked ? "border-brand" : "border-border")
        }
      >
        {checked && <span className="h-2.5 w-2.5 rounded-full bg-brand" />}
      </span>
    </label>
  );
}
