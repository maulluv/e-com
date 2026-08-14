import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ChevronDown, Heart, Menu, Phone, ShoppingCart, Truck, Wrench, X } from "lucide-react";
import { Container } from "../ui/Container";
import { IconButton } from "../ui/IconButton";
import { SearchBar } from "../catalog/SearchBar";
import { HeaderVehicle } from "../vehicle/HeaderVehicle";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { navLinks } from "./navigation";
import { site } from "../../config/site";
import { cn } from "../../lib/cn";

/**
 * Шапка сайту: верхня смуга з контактами, логотип, пошук, навігація, кошик.
 * Пункт меню з підпунктами (children) показує випадаюче підменю.
 * На мобільних навігація згортається в бургер.
 */
export function Header() {
  const { totalItems, open } = useCart();
  const { count: wishCount } = useWishlist();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");

  const submitSearch = (value) => {
    setSearch(value);
    // Пошук веде в каталог із запитом у URL.
    navigate(value ? `/catalog?q=${encodeURIComponent(value)}` : "/catalog");
  };

  return (
    <header className="sticky top-0 z-30 bg-surface/90 backdrop-blur">
      {/* Верхня смуга */}
      <div className="bg-ink text-white/80">
        <Container className="flex h-9 items-center justify-between text-xs">
          <span className="inline-flex items-center gap-1.5">
            <Truck className="h-3.5 w-3.5 text-brand" />
            Безкоштовна доставка від {(site.freeShippingFrom / 100).toLocaleString("uk-UA")} ₴
          </span>
          <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`} className="inline-flex items-center gap-1.5 hover:text-white">
            <Phone className="h-3.5 w-3.5 text-brand" />
            {site.phone}
          </a>
        </Container>
      </div>

      {/* Основний рядок */}
      <div className="border-b border-border">
        <Container className="flex h-16 items-center justify-between gap-4">
          {/* Лого */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0 })}
            className="flex items-center gap-2"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-brand-fg">
              <Wrench className="h-5 w-5" />
            </span>
            <span className="text-lg font-extrabold tracking-tight text-fg">
              {site.name}
              <span className="text-brand">{site.nameAccent}</span>
            </span>
          </Link>

          {/* Пошук (desktop) */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitSearch(search);
            }}
            className="hidden flex-1 max-w-md lg:block"
          >
            <SearchBar value={search} onChange={setSearch} />
          </form>

          {/* Дії */}
          <div className="flex items-center gap-1">
            <Link
              to="/wishlist"
              aria-label="Обране"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl text-fg transition-colors hover:bg-muted"
            >
              <Heart className="h-5 w-5" />
              {wishCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-xs font-semibold text-brand-fg">
                  {wishCount}
                </span>
              )}
            </Link>

            <IconButton label="Кошик" onClick={open}>
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-xs font-semibold text-brand-fg">
                  {totalItems}
                </span>
              )}
            </IconButton>

            <IconButton
              label="Меню"
              className="md:hidden"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </IconButton>
          </div>
        </Container>
      </div>

      {/* Нижній рядок навігації (desktop) */}
      <nav className="hidden border-b border-border bg-surface md:block">
        <Container className="flex h-12 items-center gap-1">
          <HeaderVehicle className="mr-2 hidden lg:inline-flex" />
          {navLinks.map((link) =>
            link.children ? (
              <DesktopDropdown key={link.to} link={link} />
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) => navItemClass(isActive)}
              >
                {link.label}
              </NavLink>
            ),
          )}
        </Container>
      </nav>

      {/* Мобільне меню */}
      {mobileOpen && (
        <nav className="border-b border-border bg-surface md:hidden">
          <Container className="flex flex-col py-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitSearch(search);
                setMobileOpen(false);
              }}
              className="py-2"
            >
              <SearchBar value={search} onChange={setSearch} />
            </form>

            <div className="py-2">
              <HeaderVehicle className="w-full justify-start" />
            </div>

            {navLinks.map((link) =>
              link.children ? (
                // Батьківський пункт як підпис + вкладені посилання (без дубля самого себе).
                <div key={link.to} className="py-1">
                  <NavLink
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      cn("block rounded-lg px-3 py-3 text-sm font-medium", isActive ? "text-brand" : "text-fg")
                    }
                  >
                    {link.label}
                  </NavLink>
                  <div className="ml-3 flex flex-col border-l border-border pl-2">
                    {link.children
                      .filter((c) => c.to !== link.to)
                      .map((child) => (
                        <NavLink
                          key={child.to}
                          to={child.to}
                          onClick={() => setMobileOpen(false)}
                          className={({ isActive }) =>
                            cn("rounded-lg px-3 py-2.5 text-sm", isActive ? "text-brand" : "text-fg-muted")
                          }
                        >
                          {child.label}
                        </NavLink>
                      ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn("rounded-lg px-3 py-3 text-sm font-medium", isActive ? "text-brand" : "text-fg")
                  }
                >
                  {link.label}
                </NavLink>
              ),
            )}
          </Container>
        </nav>
      )}
    </header>
  );
}

function navItemClass(isActive) {
  return cn(
    "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
    isActive ? "text-brand" : "text-fg-muted hover:text-fg",
  );
}

/** Пункт меню з випадаючим підменю (desktop). Відкривається на hover/focus. */
function DesktopDropdown({ link }) {
  return (
    <div className="group relative">
      <NavLink
        to={link.to}
        className={({ isActive }) => cn(navItemClass(isActive), "inline-flex items-center gap-1")}
      >
        {link.label}
        <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
      </NavLink>

      <div
        className={cn(
          "invisible absolute left-0 top-full z-40 min-w-56 rounded-xl border border-border bg-surface p-1 opacity-0 shadow-lg transition",
          "group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100",
        )}
      >
        {link.children.map((child) => (
          <NavLink
            key={child.to}
            to={child.to}
            end
            className={({ isActive }) =>
              cn(
                "block rounded-lg px-3 py-2 text-sm transition-colors",
                isActive ? "bg-brand/5 text-brand" : "text-fg hover:bg-muted",
              )
            }
          >
            {child.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
