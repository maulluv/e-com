import { useState } from "react";
import { CheckCircle2, ShoppingBag, X } from "lucide-react";
import { Button } from "../ui/Button";
import { IconButton } from "../ui/IconButton";
import { CartItem } from "./CartItem";
import { CheckoutForm } from "./CheckoutForm";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../lib/format";
import { cn } from "../../lib/cn";

/**
 * Висувна панель кошика (праворуч) з трьома станами:
 * список товарів → форма оформлення → підтвердження.
 * view: "cart" | "checkout" | "done"
 */
export function CartDrawer() {
  const { isOpen, close, items, totalItems, totalPrice } = useCart();
  const [view, setView] = useState("cart");

  const handleClose = () => {
    close();
    // Скидаємо стан після анімації закриття.
    setTimeout(() => setView("cart"), 200);
  };

  return (
    <>
      {/* Затемнення */}
      <div
        onClick={handleClose}
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
        {/* Шапка панелі */}
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="text-lg font-semibold text-fg">
            {view === "checkout" ? "Оформлення" : view === "done" ? "Готово" : "Кошик"}
          </h2>
          <IconButton label="Закрити кошик" onClick={handleClose}>
            <X className="h-5 w-5" />
          </IconButton>
        </div>

        {/* Успіх */}
        {view === "done" ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <CheckCircle2 className="h-16 w-16 text-success" />
            <div>
              <p className="text-lg font-semibold text-fg">Замовлення прийнято!</p>
              <p className="mt-1 text-sm text-fg-muted">
                Ми зв'яжемося з вами найближчим часом для підтвердження.
              </p>
            </div>
            <Button onClick={handleClose}>Продовжити покупки</Button>
          </div>
        ) : items.length === 0 ? (
          /* Порожній кошик */
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <ShoppingBag className="h-12 w-12 text-fg-muted" />
            <p className="text-fg-muted">Кошик порожній</p>
            <Button variant="outline" onClick={handleClose}>
              До каталогу
            </Button>
          </div>
        ) : view === "checkout" ? (
          /* Форма оформлення */
          <div className="flex-1 overflow-y-auto p-4">
            <CheckoutForm onSuccess={() => setView("done")} onBack={() => setView("cart")} />
          </div>
        ) : (
          /* Список товарів */
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
              <Button size="lg" fullWidth onClick={() => setView("checkout")}>
                Оформити замовлення
              </Button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
