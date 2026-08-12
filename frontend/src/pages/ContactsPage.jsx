import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Container } from "../components/ui/Container";
import { site } from "../config/site";

export function ContactsPage() {
  return (
    <Container className="py-16">
      <h1 className="text-3xl font-bold text-fg">Контакти</h1>
      <p className="mt-3 max-w-2xl text-fg-muted">
        Зателефонуйте або напишіть — допоможемо підібрати запчастину за маркою авто чи VIN-кодом.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-3 rounded-[var(--radius-card)] border border-border bg-surface p-5">
          <Phone className="h-5 w-5 text-brand" />
          <div>
            <p className="text-sm text-fg-muted">Телефон</p>
            <p className="font-medium text-fg">{site.phone}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-[var(--radius-card)] border border-border bg-surface p-5">
          <Mail className="h-5 w-5 text-brand" />
          <div>
            <p className="text-sm text-fg-muted">Email</p>
            <p className="font-medium text-fg">{site.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-[var(--radius-card)] border border-border bg-surface p-5">
          <MapPin className="h-5 w-5 text-brand" />
          <div>
            <p className="text-sm text-fg-muted">Регіон</p>
            <p className="font-medium text-fg">{site.city}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-[var(--radius-card)] border border-border bg-surface p-5">
          <Clock className="h-5 w-5 text-brand" />
          <div>
            <p className="text-sm text-fg-muted">Графік</p>
            <p className="font-medium text-fg">Пн–Сб, 9:00–19:00</p>
          </div>
        </div>
      </div>
    </Container>
  );
}
