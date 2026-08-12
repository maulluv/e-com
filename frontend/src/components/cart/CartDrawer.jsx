import { useNavigate } from "react-router-dom";
import { ShoppingBag, X } from "lucide-react";
import { Button } from "../ui/Button";
import { IconButton } from "../ui/IconButton";
import { CartItem } from "./CartItem";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../lib/format";
import { cn } from "../../lib/cn";

/**
 * Міні-кошик — висувна панель праворуч зі списком товарів.
 * Повне оформлення відбувається на окремих сторінках /cart та /checkout.
 */
export function CartDrawer() {
  const { isOpen, close, items, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  const go = (path) => {
    close();
    navigate(path);
  };

  return (
    <>
      {/* Затемнення */}
      <div
        onClick={close}
        className={cn(
          "fixed inset-0 z-40 bg-black/40 transition-opacity",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* Панель */}
      <aside
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-surface shadow-xl transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="text-lg font-semibold text-fg">Кошик</h2>
          <IconButton label="Закрити кошик" onClick={close}>
            <X className="h-5 w-5" />
          </IconButton>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <ShoppingBag className="h-12 w-12 text-fg-muted" />
            <p className="text-fg-muted">Кошик порожній</p>
            <Button variant="outline" onClick={close}>
              До каталогу
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 divide-y divide-border overflow-y-auto px-4">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>

            <div className="border-t border-border p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-fg-muted">Разом ({totalItems})</span>
                <span className="text-xl font-bold text-fg">{formatPrice(totalPrice)}</span>
              </div>
              <Button size="lg" fullWidth onClick={() => go("/checkout")}>
                Оформити замовлення
              </Button>
              <Button variant="ghost" fullWidth onClick={() => go("/cart")} className="mt-2">
                Переглянути кошик
              </Button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
