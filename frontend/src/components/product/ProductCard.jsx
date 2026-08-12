import { Link } from "react-router-dom";
import { Car, ShoppingCart } from "lucide-react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../lib/format";
import { compatibleBrands } from "../../config/vehicles";
import { cn } from "../../lib/cn";

/** Картка товару. Уся картка — посилання на сторінку товару; кнопка "Купити" не навігує. */
export function ProductCard({ product }) {
  const { addItem } = useCart();

  const handleBuy = (e) => {
    // Не переходимо на сторінку товару — просто додаємо в кошик.
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.imageUrl}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-surface/60">
            <Badge tone="neutral">Немає в наявності</Badge>
          </div>
        )}
        {/* Мітки: акція / новинка / б/в */}
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {product.sale && <Badge tone="danger">Акція</Badge>}
          {product.isNew && <Badge tone="success">Новинка</Badge>}
          {product.condition === "Б/в" && <Badge tone="neutral">Б/в</Badge>}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-baseline justify-between gap-2 text-xs">
          <span className="shrink-0 font-semibold uppercase tracking-wide text-brand">
            {product.brand}
          </span>
          <span className="min-w-0 truncate text-right text-fg-muted" title={`Арт. ${product.sku}`}>
            Арт. {product.sku}
          </span>
        </div>

        <h3 className="mt-1.5 line-clamp-2 min-h-[2.75rem] font-semibold leading-snug text-fg">
          {product.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-fg-muted">{product.description}</p>

        {/* Позначка сумісності: універсальна або перелік марок */}
        <p className="mt-2 flex items-center gap-1.5 text-xs text-fg-muted">
          <Car className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">
            {product.fits ? compatibleBrands(product.fits).join(", ") : "Універсальна"}
          </span>
        </p>

        <div className="mt-auto flex items-end justify-between gap-2 pt-4">
          <div className="flex flex-col">
            {product.sale && product.oldPrice && (
              <span className="text-xs text-fg-muted line-through">
                {formatPrice(product.oldPrice, product.currency)}
              </span>
            )}
            <span className={cn("text-lg font-bold", product.sale ? "text-brand" : "text-fg")}>
              {formatPrice(product.price, product.currency)}
            </span>
          </div>
          <Button
            size="sm"
            onClick={handleBuy}
            disabled={!product.inStock}
            aria-label={`Додати ${product.title} у кошик`}
          >
            <ShoppingCart className="h-4 w-4" />
            Купити
          </Button>
        </div>
      </div>
    </Link>
  );
}
