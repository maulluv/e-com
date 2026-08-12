import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { CartItem } from "../components/cart/CartItem";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../lib/format";
import { site } from "../config/site";

export function CartPage() {
  const { items, totalItems, totalPrice, clear } = useCart();

  if (items.length === 0) {
    return (
      <Container className="py-20 text-center">
        <ShoppingBag className="mx-auto h-14 w-14 text-fg-muted" />
        <h1 className="mt-4 text-2xl font-bold text-fg">Кошик порожній</h1>
        <p className="mt-2 text-fg-muted">Додайте товари з каталогу, щоб оформити замовлення.</p>
        <Link to="/catalog" className="mt-6 inline-block">
          <Button>До каталогу</Button>
        </Link>
      </Container>
    );
  }

  const freeShipLeft = site.freeShippingFrom - totalPrice;

  return (
    <Container className="py-10">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-fg">Кошик</h1>
        <button onClick={clear} className="text-sm text-fg-muted hover:text-danger">
          Очистити кошик
        </button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Товари */}
        <div className="lg:col-span-2">
          <div className="divide-y divide-border rounded-[var(--radius-card)] border border-border bg-surface px-4">
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>
        </div>

        {/* Підсумок */}
        <div className="lg:col-span-1">
          <div className="sticky top-40 rounded-[var(--radius-card)] border border-border bg-surface p-5">
            <h2 className="text-lg font-bold text-fg">Разом</h2>

            <div className="mt-4 flex items-center justify-between text-sm text-fg-muted">
              <span>Товарів</span>
              <span>{totalItems} шт</span>
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-border pt-3">
              <span className="text-fg-muted">До сплати</span>
              <span className="text-2xl font-bold text-fg">{formatPrice(totalPrice)}</span>
            </div>

            {freeShipLeft > 0 ? (
              <p className="mt-3 text-xs text-fg-muted">
                Додайте товарів ще на {formatPrice(freeShipLeft)} для безкоштовної доставки.
              </p>
            ) : (
              <p className="mt-3 text-xs text-success">Безкоштовна доставка застосується ✓</p>
            )}

            <Link to="/checkout" className="mt-5 block">
              <Button size="lg" fullWidth>
                Оформити замовлення
              </Button>
            </Link>
            <Link to="/catalog" className="mt-3 block">
              <Button variant="ghost" fullWidth>
                Продовжити покупки
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
