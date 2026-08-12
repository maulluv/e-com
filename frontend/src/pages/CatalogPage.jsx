import { Container } from "../components/ui/Container";
import { Catalog } from "../components/catalog/Catalog";

/** Сторінка каталогу — той самий каталог із пошуком і фільтром. */
export function CatalogPage() {
  return (
    <Container className="py-10">
      <h1 className="mb-6 text-3xl font-bold text-fg">Каталог запчастин</h1>
      <Catalog />
    </Container>
  );
}
