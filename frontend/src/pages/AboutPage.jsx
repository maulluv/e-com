import { ShieldCheck, Truck, Wrench, PackageCheck } from "lucide-react";
import { Container } from "../components/ui/Container";

const points = [
  { icon: PackageCheck, title: "Великий асортимент", text: "Запчастини для більшості популярних марок авто." },
  { icon: ShieldCheck, title: "Тільки перевірене", text: "Оригінал та якісні аналоги від відомих виробників." },
  { icon: Truck, title: "Швидка доставка", text: "Відправляємо по всій Україні Новою Поштою." },
  { icon: Wrench, title: "Допомога з підбором", text: "Підкажемо потрібну деталь за VIN або даними авто." },
];

export function AboutPage() {
  return (
    <Container className="py-16">
      <h1 className="text-3xl font-bold text-fg">Про нас</h1>
      <p className="mt-4 max-w-2xl text-fg-muted">
        Ми — магазин автозапчастин. Допомагаємо власникам авто швидко знаходити потрібні деталі
        за чесною ціною: від витратних матеріалів до вузлів підвіски й двигуна. Повний текст про
        компанію додамо згодом — зараз наповнюємо каталог.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {points.map((p) => (
          <div key={p.title} className="flex items-start gap-4 rounded-[var(--radius-card)] border border-border bg-surface p-6">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <p.icon className="h-6 w-6" />
            </span>
            <div>
              <h3 className="font-semibold text-fg">{p.title}</h3>
              <p className="mt-1 text-sm text-fg-muted">{p.text}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
