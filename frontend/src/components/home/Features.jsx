import { Truck, ShieldCheck, RotateCcw, Headset } from "lucide-react";
import { Container } from "../ui/Container";

// Смуга переваг магазину — типовий елемент e-commerce під логотипом.
const features = [
  { icon: Truck, title: "Доставка по Україні", text: "Нова Пошта, 1–2 дні" },
  { icon: ShieldCheck, title: "Гарантія якості", text: "Оригінал та перевірені аналоги" },
  { icon: RotateCcw, title: "Повернення 14 днів", text: "Якщо деталь не підійшла" },
  { icon: Headset, title: "Підбір за VIN", text: "Допоможемо обрати запчастину" },
];

export function Features() {
  return (
    <section className="border-b border-border bg-surface">
      <Container className="grid grid-cols-2 gap-6 py-8 lg:grid-cols-4">
        {features.map((f) => (
          <div key={f.title} className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <f.icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-fg">{f.title}</p>
              <p className="text-sm text-fg-muted">{f.text}</p>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
