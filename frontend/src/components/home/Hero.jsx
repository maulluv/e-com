import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Truck, Wrench } from "lucide-react";
import { Container } from "../ui/Container";
import { site } from "../../config/site";

/**
 * Головний банер: темний "індустріальний" фон з теплим червоним світінням,
 * великий заголовок і заклик до дії. Дизайн-референс — hero-секції з 21st.dev.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      {/* Тепле червоне світіння */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, #e11d2f 0%, transparent 70%)" }}
      />

      <Container className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-white/80">
            <Wrench className="h-4 w-4 text-brand" />
            {site.tagline}
          </span>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl">
            Автозапчастини, яким
            <span className="text-brand"> можна довіряти</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">
            Оригінальні деталі та надійні аналоги для будь-якого авто. Швидка доставка по всій Україні.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/catalog"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 font-medium text-brand-fg transition-colors hover:bg-brand-hover"
            >
              Перейти до каталогу
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/contacts"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 px-6 font-medium text-white transition-colors hover:bg-white/10"
            >
              Підбір за авто
            </Link>
          </div>

          {/* Швидкі переваги */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/70">
            <span className="inline-flex items-center gap-2">
              <Truck className="h-4 w-4 text-brand" /> Доставка 1–2 дні
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-brand" /> Гарантія на товар
            </span>
            <span className="inline-flex items-center gap-2">
              <Wrench className="h-4 w-4 text-brand" /> Допомога з підбором
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
