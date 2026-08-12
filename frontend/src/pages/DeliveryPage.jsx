import { Truck, CreditCard, Banknote, PackageCheck } from "lucide-react";
import { Container } from "../components/ui/Container";

const delivery = [
  { icon: Truck, title: "Нова Пошта", text: "Відділення та поштомати по всій Україні. Доставка 1–2 дні." },
  { icon: PackageCheck, title: "Кур'єр Нової Пошти", text: "Доставка за адресою у більшості міст." },
];

const payment = [
  { icon: Banknote, title: "Накладений платіж", text: "Оплата під час отримання у відділенні." },
  { icon: CreditCard, title: "Онлайн-оплата", text: "Карткою Visa / Mastercard при оформленні." },
  { icon: Banknote, title: "Готівка / безготівка", text: "Для самовивозу та юридичних осіб." },
];

export function DeliveryPage() {
  return (
    <Container className="py-16">
      <h1 className="text-3xl font-bold text-fg">Доставка й оплата</h1>
      <p className="mt-3 max-w-2xl text-fg-muted">
        Відправляємо замовлення в день оформлення, якщо воно зроблене до 15:00. Наявність та точну
        вартість доставки менеджер підтверджує при обробці замовлення.
      </p>

      <h2 className="mt-10 text-xl font-bold text-fg">Способи доставки</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {delivery.map((d) => (
          <InfoCard key={d.title} {...d} />
        ))}
      </div>

      <h2 className="mt-10 text-xl font-bold text-fg">Способи оплати</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {payment.map((p) => (
          <InfoCard key={p.title} {...p} />
        ))}
      </div>
    </Container>
  );
}

function InfoCard({ icon: Icon, title, text }) {
  return (
    <div className="flex items-start gap-4 rounded-[var(--radius-card)] border border-border bg-surface p-6">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
        <Icon className="h-6 w-6" />
      </span>
      <div>
        <h3 className="font-semibold text-fg">{title}</h3>
        <p className="mt-1 text-sm text-fg-muted">{text}</p>
      </div>
    </div>
  );
}
