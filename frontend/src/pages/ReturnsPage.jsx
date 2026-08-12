import { RotateCcw, ShieldCheck, ClipboardCheck } from "lucide-react";
import { Container } from "../components/ui/Container";

const points = [
  {
    icon: RotateCcw,
    title: "Повернення 14 днів",
    text: "Якщо деталь не підійшла або не була у використанні — повернемо кошти або замінимо товар протягом 14 днів.",
  },
  {
    icon: ShieldCheck,
    title: "Гарантія на товар",
    text: "На нові запчастини діє гарантія виробника. На б/в деталі — гарантія на перевірку та встановлення.",
  },
  {
    icon: ClipboardCheck,
    title: "Як оформити",
    text: "Зв'яжіться з нами за телефоном або в месенджері, назвіть номер замовлення — і ми підкажемо наступні кроки.",
  },
];

export function ReturnsPage() {
  return (
    <Container className="py-16">
      <h1 className="text-3xl font-bold text-fg">Повернення та гарантія</h1>
      <p className="mt-3 max-w-2xl text-fg-muted">
        Ми хочемо, щоб ви отримали саме ту деталь, яка потрібна. Тому даємо час на перевірку й
        просту процедуру повернення.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {points.map((p) => (
          <div key={p.title} className="rounded-[var(--radius-card)] border border-border bg-surface p-6">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <p.icon className="h-6 w-6" />
            </span>
            <h3 className="mt-4 font-semibold text-fg">{p.title}</h3>
            <p className="mt-1 text-sm text-fg-muted">{p.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-[var(--radius-card)] border border-border bg-muted/50 p-6">
        <h2 className="text-lg font-bold text-fg">Умови повернення</h2>
        <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-fg-muted">
          <li>Товар не був у використанні та збережено товарний вигляд.</li>
          <li>Збережено упаковку, комплектацію та маркування.</li>
          <li>Є документ, що підтверджує покупку (номер замовлення).</li>
        </ul>
      </div>
    </Container>
  );
}
