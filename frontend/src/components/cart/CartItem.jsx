import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../lib/format";

/** Один рядок у кошику: картинка, назва, керування кількістю, видалення. */
export function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;

  return (
    <div className="flex gap-3 py-4">
      <img
        src={product.imageUrl}
        alt={product.title}
        className="h-20 w-20 shrink-0 rounded-lg border border-border object-cover"
      />

      <div className="flex flex-1 flex-col">
        <div className="flex justify-between gap-2">
          <h4 className="text-sm font-medium text-fg">{product.title}</h4>
          <button
            onClick={() => removeItem(product.id)}
            aria-label="Видалити з кошика"
            className="text-fg-muted transition-colors hover:text-danger"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <span className="mt-0.5 text-sm text-fg-muted">
          {formatPrice(product.price, product.currency)}
        </span>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center rounded-lg border border-border">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              disabled={quantity <= 1}
              aria-label="Зменшити кількість"
              className="flex h-8 w-8 items-center justify-center text-fg-muted disabled:opacity-40"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-8 text-center text-sm font-medium">{quantity}</span>
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              aria-label="Збільшити кількість"
              className="flex h-8 w-8 items-center justify-center text-fg-muted"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          <span className="text-sm font-semibold text-fg">
            {formatPrice(product.price * quantity, product.currency)}
          </span>
        </div>
      </div>
    </div>
  );
}
