import { ProductCard } from "./ProductCard";
import { useProducts } from "../../hooks/useProducts";

/** Схожі товари — з тієї ж категорії, крім поточного (до 4 шт). */
export function SimilarProducts({ product }) {
  const { products } = useProducts();

  const similar = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  if (similar.length === 0) return null;

  return (
    <section className="mt-14">
      <h2 className="mb-6 text-2xl font-bold text-fg">Схожі товари</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {similar.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
