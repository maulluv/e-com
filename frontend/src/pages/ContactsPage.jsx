import { useState } from "react";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Container } from "../components/ui/Container";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { Button } from "../components/ui/Button";
import { useToast } from "../context/ToastContext";
import { site } from "../config/site";

const contactItems = [
  { icon: Phone, label: "Телефон", value: site.phone },
  { icon: Mail, label: "Email", value: site.email },
  { icon: MapPin, label: "Регіон", value: site.city },
  { icon: Clock, label: "Графік", value: "Пн–Сб, 9:00–19:00" },
];

export function ContactsPage() {
  const { show } = useToast();
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Поки без беку — показуємо підтвердження. Пізніше піде на бек/у Telegram.
    show("Повідомлення надіслано");
    setSent(true);
    setForm({ name: "", phone: "", message: "" });
  };

  return (
    <Container className="py-16">
      <h1 className="text-3xl font-bold text-fg">Контакти</h1>
      <p className="mt-3 max-w-2xl text-fg-muted">
        Зателефонуйте або напишіть — допоможемо підібрати запчастину за маркою авто чи VIN-кодом.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {/* Контактна інформація */}
        <div className="grid gap-4 self-start sm:grid-cols-2">
          {contactItems.map((c) => (
            <div
              key={c.label}
              className="flex items-center gap-3 rounded-[var(--radius-card)] border border-border bg-surface p-5"
            >
              <c.icon className="h-5 w-5 shrink-0 text-brand" />
              <div>
                <p className="text-sm text-fg-muted">{c.label}</p>
                <p className="font-medium text-fg">{c.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Форма зворотного зв'язку */}
        <div className="rounded-[var(--radius-card)] border border-border bg-surface p-6">
          <h2 className="text-lg font-bold text-fg">Напишіть нам</h2>
          <p className="mt-1 text-sm text-fg-muted">Залиште запит — ми зв'яжемося з вами.</p>

          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
            <Input label="Ім'я" name="name" value={form.name} onChange={set("name")} required />
            <Input
              label="Телефон"
              name="phone"
              type="tel"
              placeholder="+380..."
              value={form.phone}
              onChange={set("phone")}
              required
            />
            <Textarea
              label="Повідомлення"
              name="message"
              value={form.message}
              onChange={set("message")}
              placeholder="Яка деталь потрібна, марка й рік авто…"
            />
            <Button type="submit" size="lg" fullWidth>
              Надіслати
            </Button>
            {sent && (
              <p className="text-center text-sm text-success">
                Дякуємо! Ми зв'яжемося з вами найближчим часом.
              </p>
            )}
          </form>
        </div>
      </div>
    </Container>
  );
}
