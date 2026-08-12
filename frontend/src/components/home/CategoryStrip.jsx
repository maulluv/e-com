import { Link } from "react-router-dom";
import {
  Disc3,
  Cog,
  Spline,
  Filter,
  Droplet,
  BatteryCharging,
  CircleDot,
  CarFront,
} from "lucide-react";
import { Container } from "../ui/Container";
import { categories } from "../../config/categories";

// Мапимо назву іконки з config/categories.js на компонент lucide.
const iconMap = { Disc3, Cog, Spline, Filter, Droplet, BatteryCharging, CircleDot, CarFront };

/** Плитка категорій на головній. Клік → каталог із відповідним фільтром. */
export function CategoryStrip() {
  return (
    <section className="py-12">
      <Container>
        <h2 className="mb-6 text-2xl font-bold text-fg">Категорії</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {categories.map((c) => {
            const Icon = iconMap[c.icon] ?? Cog;
            return (
              <Link
                key={c.id}
                to={`/catalog?cat=${c.id}`}
                className="group flex flex-col items-center gap-3 rounded-[var(--radius-card)] border border-border bg-surface p-6 text-center transition-all hover:border-brand hover:shadow-md"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-brand-fg">
                  <Icon className="h-7 w-7" />
                </span>
                <span className="text-sm font-medium text-fg">{c.label}</span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
