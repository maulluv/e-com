import { Link } from "react-router-dom";
import { Instagram, Send, Mail, Phone, MapPin, Wrench } from "lucide-react";
import { Container } from "../ui/Container";
import { categories } from "../../config/categories";
import { site } from "../../config/site";

/**
 * Футер у типовому e-commerce стилі: бренд, популярні категорії,
 * інформація та контакти + нижній рядок з копірайтом.
 */
export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <Container className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
        {/* Бренд */}
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-brand-fg">
              <Wrench className="h-5 w-5" />
            </span>
            <span className="text-lg font-extrabold tracking-tight text-fg">
              {site.name}
              <span className="text-brand">{site.nameAccent}</span>
            </span>
          </Link>
          <p className="mt-3 text-sm text-fg-muted">
            Магазин автозапчастин: оригінальні деталі та надійні аналоги для будь-якого авто.
          </p>
        </div>

        {/* Категорії */}
        <div>
          <h3 className="text-sm font-semibold text-fg">Категорії</h3>
          <ul className="mt-3 space-y-2">
            {categories.slice(0, 6).map((c) => (
              <li key={c.id}>
                <Link to={`/catalog?cat=${c.id}`} className="text-sm text-fg-muted hover:text-brand">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Інформація */}
        <div>
          <h3 className="text-sm font-semibold text-fg">Інформація</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/about" className="text-fg-muted hover:text-brand">Про нас</Link>
            </li>
            <li>
              <Link to="/contacts" className="text-fg-muted hover:text-brand">Контакти</Link>
            </li>
            <li>
              <Link to="/delivery" className="text-fg-muted hover:text-brand">Доставка й оплата</Link>
            </li>
            <li>
              <Link to="/returns" className="text-fg-muted hover:text-brand">Повернення та гарантія</Link>
            </li>
          </ul>
        </div>

        {/* Контакти */}
        <div>
          <h3 className="text-sm font-semibold text-fg">Контакти</h3>
          <ul className="mt-3 space-y-2 text-sm text-fg-muted">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> {site.phone}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> {site.email}
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> {site.city}
            </li>
          </ul>
          <div className="mt-4 flex gap-2">
            <a href="#" aria-label="Telegram" className="text-fg-muted hover:text-brand">
              <Send className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Instagram" className="text-fg-muted hover:text-brand">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-fg-muted sm:flex-row">
          <span>© {new Date().getFullYear()} {site.name}{site.nameAccent}. Усі права захищено.</span>
          <span>Політика конфіденційності · Умови користування</span>
        </Container>
      </div>
    </footer>
  );
}
