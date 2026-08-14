import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { ProductCard } from "../components/product/ProductCard";
import { useWishlist } from "../context/WishlistContext";

export function WishlistPage() {
  const { items, clear } = useWishlist();

  if (items.length === 0) {
    return (
      <Container className="py-20 text-center">
        <Heart className="mx-auto h-14 w-14 text-fg-muted" />
        <h1 className="mt-4 text-2xl font-bold text-fg">Обране порожнє</h1>
        <p className="mt-2 text-fg-muted">Додавайте товари сердечком, щоб не загубити.</p>
        <Link to="/catalog" className="mt-6 inline-block">
          <Button>До каталогу</Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-10">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-fg">Обране</h1>
        <button onClick={clear} className="text-sm text-fg-muted hover:text-danger">
          Очистити
        </button>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Container>
  );
}
