import { ProductCard } from "./ProductCard";
import { useRecentlyViewed } from "../../hooks/useRecentlyViewed";

/** Нещодавно переглянуті товари (до 4 шт). excludeId — прибрати поточний товар. */
export function RecentlyViewed({ excludeId }) {
  const { items } = useRecentlyViewed();
  const list = items.filter((p) => p.id !== excludeId).slice(0, 4);

  if (list.length === 0) return null;

  return (
    <section className="mt-14">
      <h2 className="mb-6 text-2xl font-bold text-fg">Нещодавно переглянуті</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
