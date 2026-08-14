import { Container } from "../components/ui/Container";
import { Hero } from "../components/home/Hero";
import { Features } from "../components/home/Features";
import { CategoryStrip } from "../components/home/CategoryStrip";
import { Catalog } from "../components/catalog/Catalog";
import { RecentlyViewed } from "../components/product/RecentlyViewed";

/** Головна: банер → переваги → категорії → каталог → нещодавно переглянуті. */
export function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <CategoryStrip />

      <section className="pb-12">
        <Container>
          <h2 className="mb-6 text-2xl font-bold text-fg">Популярні товари</h2>
          <Catalog controls={false} limit={8} />
          <RecentlyViewed />
        </Container>
      </section>
    </>
  );
}
