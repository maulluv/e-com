import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Spinner } from "../components/ui/Spinner";
import { QuickOrderForm } from "../components/product/QuickOrderForm";
import { ProductGallery } from "../components/product/ProductGallery";
import { SimilarProducts } from "../components/product/SimilarProducts";
import { RecentlyViewed } from "../components/product/RecentlyViewed";
import { useProduct } from "../hooks/useProduct";
import { usePageTitle } from "../hooks/usePageTitle";
import { useRecentlyViewed } from "../hooks/useRecentlyViewed";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { formatPrice } from "../lib/format";
import { categoryLabel, subcategoryLabel } from "../config/categories";
import { groupCompatibility } from "../config/vehicles";
import { cn } from "../lib/cn";

export function ProductPage() {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const { track } = useRecentlyViewed();
  const [qty, setQty] = useState(1);

  usePageTitle(product?.title);

  useEffect(() => {
    if (product) track(product);
  }, [product, track]);

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <Container className="py-24 text-center">
        <p className="text-fg-muted">{error ?? "Товар не знайдено"}</p>
        <Link to="/catalog" className="mt-4 inline-block">
          <Button>До каталогу</Button>
        </Link>
      </Container>
    );
  }

  const characteristics = [
    ["Артикул", product.sku],
    ["Виробник", product.brand],
    ["Стан", product.condition],
    ["Тип", product.oem ? "Оригінал" : "Аналог"],
    ["Категорія", categoryLabel(product.category)],
    ["Підкатегорія", subcategoryLabel(product.subcategory)],
  ];

  return (
    <Container className="py-8">
      {/* Хлібні крихти */}
      <nav className="flex flex-wrap items-center gap-1.5 text-sm text-fg-muted">
        <Link to="/catalog" className="hover:text-brand">Каталог</Link>
        <span>/</span>
        <Link to={`/catalog?cat=${product.category}`} className="hover:text-brand">
          {categoryLabel(product.category)}
        </Link>
        <span>/</span>
        <span className="text-fg">{product.title}</span>
      </nav>

      <Link
        to="/catalog"
        className="mt-4 inline-flex items-center gap-1.5 rounded-xl border border-border px-4 py-2 text-sm font-medium text-fg transition-colors hover:bg-muted"
      >
        <ArrowLeft className="h-4 w-4" /> Усі запчастини
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        {/* Фото */}
        <ProductGallery product={product} />

        {/* Інформація */}
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold uppercase tracking-wide text-brand">
              {product.brand}
            </span>
            <Badge tone={product.oem ? "brand" : "neutral"}>
              {product.oem ? "Оригінал" : "Аналог"}
            </Badge>
            <Badge tone="neutral">{product.condition}</Badge>
            {product.sale && <Badge tone="danger">Акція</Badge>}
            {product.isNew && <Badge tone="success">Новинка</Badge>}
            {product.inStock ? (
              <Badge tone="success" dot>В наявності</Badge>
            ) : (
              <Badge tone="danger" dot>Немає в наявності</Badge>
            )}
          </div>

          <h1 className="mt-2 text-2xl font-bold text-fg sm:text-3xl">{product.title}</h1>
          <p className="mt-1 text-sm text-fg-muted">Артикул: {product.sku}</p>

          <p className="mt-4 text-fg-muted">{product.description}</p>

          {/* Сумісність */}
          <div className="mt-5 rounded-xl border border-border bg-surface p-4">
            <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-fg">
              <CheckCircle2 className="h-4 w-4 text-success" /> Сумісність
            </p>
            {product.fits ? (
              <div className="flex flex-col gap-1.5">
                {groupCompatibility(product.fits).map((grp) => (
                  <div key={grp.brandLabel} className="text-sm">
                    <span className="font-medium text-fg">{grp.brandLabel}:</span>{" "}
                    <span className="text-fg-muted">
                      {grp.items.map((i) => `${i.genLabel} (${i.years})`).join(", ")}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-fg-muted">
                Універсальна деталь — підходить на різні авто. Уточнюйте сумісність за артикулом.
              </p>
            )}
          </div>

          {/* Ціна + кошик */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex flex-col">
              {product.sale && product.oldPrice && (
                <span className="text-sm text-fg-muted line-through">
                  {formatPrice(product.oldPrice, product.currency)}
                </span>
              )}
              <span className={`text-3xl font-bold ${product.sale ? "text-brand" : "text-fg"}`}>
                {formatPrice(product.price, product.currency)}
              </span>
            </div>

            <div className="flex items-center rounded-xl border border-border">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={qty <= 1}
                aria-label="Зменшити кількість"
                className="flex h-11 w-11 items-center justify-center text-fg-muted disabled:opacity-40"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-medium">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                aria-label="Збільшити кількість"
                className="flex h-11 w-11 items-center justify-center text-fg-muted"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <Button size="lg" onClick={() => addItem(product, qty)} disabled={!product.inStock}>
              <ShoppingCart className="h-5 w-5" /> Додати в кошик
            </Button>

            <button
              onClick={() => toggle(product)}
              aria-label={has(product.id) ? "Прибрати з обраного" : "Додати в обране"}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border text-fg-muted transition-colors hover:border-brand hover:text-brand"
            >
              <Heart className={cn("h-5 w-5", has(product.id) && "fill-brand text-brand")} />
            </button>
          </div>

          {/* Швидке замовлення */}
          <div className="mt-5">
            <QuickOrderForm product={product} />
          </div>
        </div>
      </div>

      {/* Характеристики + переваги */}
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[var(--radius-card)] border border-border bg-surface p-6">
          <h2 className="mb-4 text-lg font-bold text-fg">Характеристики</h2>
          <dl className="divide-y divide-border">
            {characteristics.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 py-2.5 text-sm">
                <dt className="text-fg-muted">{label}</dt>
                <dd className="text-right font-medium text-fg">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-[var(--radius-card)] border border-border bg-surface p-6">
          <h2 className="mb-4 text-lg font-bold text-fg">Доставка та гарантія</h2>
          <ul className="flex flex-col gap-4 text-sm">
            <li className="flex items-start gap-3">
              <Truck className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
              <span className="text-fg-muted">
                Доставка Новою Поштою по всій Україні, 1–2 дні. Відправлення в день замовлення до 15:00.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <RotateCcw className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
              <span className="text-fg-muted">Повернення протягом 14 днів, якщо деталь не підійшла.</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
              <span className="text-fg-muted">Оплата: готівкою, карткою або накладений платіж.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Схожі товари */}
      <SimilarProducts product={product} />

      {/* Нещодавно переглянуті */}
      <RecentlyViewed excludeId={product.id} />
    </Container>
  );
}
