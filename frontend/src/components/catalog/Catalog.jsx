import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronDown, ListFilter, SlidersHorizontal, X } from "lucide-react";
import { useProducts } from "../../hooks/useProducts";
import { useVehicle } from "../../context/VehicleContext";
import { ProductCard } from "../product/ProductCard";
import { Spinner } from "../ui/Spinner";
import { Drawer } from "../ui/Drawer";
import { SearchBar } from "./SearchBar";
import { CategoryModal } from "./CategoryModal";
import { Filters } from "./Filters";
import { SortSelect } from "./SortSelect";
import { VehicleSelect } from "../vehicle/VehicleSelect";
import { categoryLabel, subcategoryLabel } from "../../config/categories";

const EMPTY_FACETS = {
  conditions: [],
  brands: [],
  types: [],
  onlyInStock: false,
  priceMin: "",
  priceMax: "",
};

/**
 * Каталог із фільтрами:
 *  - авто (марка/модель/рік) — з контексту, обирається в модалці;
 *  - категорія + підкатегорія — модалка, стан у URL (?cat=&sub=);
 *  - текстовий пошук (?q=);
 *  - фасети (стан / тип / виробник / наявність / ціна) — бічна панель.
 *
 * controls=false → лише сітка (для блоку "Популярні" на головній).
 */
export function Catalog({ controls = true, limit }) {
  const { products, loading, error } = useProducts();
  const { vehicle } = useVehicle();
  const [params, setParams] = useSearchParams();
  const [catModalOpen, setCatModalOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [facets, setFacets] = useState(EMPTY_FACETS);

  const activeCat = params.get("cat") ?? "all";
  const activeSub = params.get("sub") ?? "";
  const query = params.get("q") ?? "";
  const sort = params.get("sort") ?? "popular";

  const setParam = (updates) => {
    const next = new URLSearchParams(params);
    for (const [key, value] of Object.entries(updates)) {
      if (value && value !== "all") next.set(key, value);
      else next.delete(key);
    }
    setParams(next, { replace: true });
  };

  const selectCategory = (catId, subId) => {
    setParam({ cat: catId, sub: subId ?? "" });
    setCatModalOpen(false);
  };

  // Фасети
  const toggleFacet = (key, value) =>
    setFacets((f) => ({
      ...f,
      [key]: f[key].includes(value) ? f[key].filter((v) => v !== value) : [...f[key], value],
    }));
  const setStock = (value) => setFacets((f) => ({ ...f, onlyInStock: value }));
  const setPrice = (field, value) => setFacets((f) => ({ ...f, [field]: value }));
  const resetFacets = () => setFacets(EMPTY_FACETS);

  // 1) базовий зріз: категорія + підкатегорія + авто + текст (без фасетів)
  const prefiltered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const byCat = activeCat === "all" || p.category === activeCat;
      const bySub = !activeSub || p.subcategory === activeSub;
      const byText = !q || `${p.title} ${p.brand} ${p.sku}`.toLowerCase().includes(q);
      // Без fits — універсальний; інакше має підходити обраному поколінню авто.
      const byVehicle = !vehicle || !p.fits || p.fits.includes(vehicle.genId);
      return byCat && bySub && byText && byVehicle;
    });
  }, [products, activeCat, activeSub, query, vehicle]);

  // Опції фасетів з лічильниками — рахуємо на базовому зрізі.
  const facetOptions = useMemo(() => {
    const count = (keyFn) => {
      const map = new Map();
      for (const p of prefiltered) {
        const key = keyFn(p);
        if (key == null) continue;
        map.set(key, (map.get(key) ?? 0) + 1);
      }
      return [...map].map(([value, count]) => ({ value, count }));
    };
    return {
      conditions: count((p) => p.condition),
      types: count((p) => (p.oem ? "Оригінал" : "Аналог")),
      brands: count((p) => p.brand).sort((a, b) => a.value.localeCompare(b.value)),
    };
  }, [prefiltered]);

  // 2) застосовуємо фасети
  const filtered = useMemo(() => {
    return prefiltered.filter((p) => {
      const priceUah = p.price / 100;
      const byCondition = !facets.conditions.length || facets.conditions.includes(p.condition);
      const byBrand = !facets.brands.length || facets.brands.includes(p.brand);
      const byType =
        !facets.types.length || facets.types.includes(p.oem ? "Оригінал" : "Аналог");
      const byStock = !facets.onlyInStock || p.inStock;
      const byMin = facets.priceMin === "" || priceUah >= Number(facets.priceMin);
      const byMax = facets.priceMax === "" || priceUah <= Number(facets.priceMax);
      return byCondition && byBrand && byType && byStock && byMin && byMax;
    });
  }, [prefiltered, facets]);

  // 3) сортування / добірка (популярні = типовий порядок)
  const sorted = useMemo(() => {
    const list = [...filtered];
    switch (sort) {
      case "cheap":
        return list.sort((a, b) => a.price - b.price);
      case "expensive":
        return list.sort((a, b) => b.price - a.price);
      case "sale":
        return list.filter((p) => p.sale);
      case "new":
        return list.filter((p) => p.isNew);
      default:
        return list;
    }
  }, [filtered, sort]);

  const visible = limit ? sorted.slice(0, limit) : sorted;

  const activeFacetCount =
    facets.conditions.length +
    facets.brands.length +
    facets.types.length +
    (facets.onlyInStock ? 1 : 0) +
    (facets.priceMin ? 1 : 0) +
    (facets.priceMax ? 1 : 0);
  const hasActiveFacets = activeFacetCount > 0;

  const grid = loading ? (
    <div className="flex justify-center py-20">
      <Spinner className="h-8 w-8" />
    </div>
  ) : error ? (
    <p className="py-20 text-center text-danger">Не вдалося завантажити товари: {error}</p>
  ) : visible.length === 0 ? (
    <p className="py-20 text-center text-fg-muted">
      Нічого не знайдено. Спробуйте змінити фільтри або пошуковий запит.
    </p>
  ) : (
    <div
      className={
        controls
          ? "grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4"
          : "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
      }
    >
      {visible.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );

  // Блок на головній — лише сітка.
  if (!controls) return grid;

  const filtersNode = (
    <Filters
      conditionOptions={facetOptions.conditions}
      brandOptions={facetOptions.brands}
      typeOptions={facetOptions.types}
      selected={facets}
      onToggle={toggleFacet}
      onStock={setStock}
      onPrice={setPrice}
      onReset={resetFacets}
      hasActive={hasActiveFacets}
    />
  );

  return (
    <div className="flex flex-col gap-5">
      <SearchBar value={query} onChange={(v) => setParam({ q: v })} />

      {/* Фільтри-кнопки: авто та категорія */}
      <div className="grid gap-3 sm:grid-cols-2">
        <VehicleSelect />
        <button
          onClick={() => setCatModalOpen(true)}
          className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-left text-fg transition-colors hover:bg-muted"
        >
          <span className="flex items-center gap-2.5">
            <ListFilter className="h-5 w-5 text-fg-muted" />
            <span className="font-medium">
              {activeCat === "all" ? "Категорії" : categoryLabel(activeCat)}
            </span>
          </span>
          <ChevronDown className="h-5 w-5 text-fg-muted" />
        </button>
      </div>

      {/* Активні фільтри категорії */}
      {activeCat !== "all" && (
        <div className="flex flex-wrap items-center gap-2">
          <FilterChip label={categoryLabel(activeCat)} onClear={() => setParam({ cat: "", sub: "" })} />
          {activeSub && (
            <FilterChip label={subcategoryLabel(activeSub)} onClear={() => setParam({ sub: "" })} />
          )}
        </div>
      )}

      <div className="flex gap-6">
        {/* Бічна панель фасетів (desktop) */}
        <aside className="hidden w-60 shrink-0 lg:block">
          <div className="sticky top-40">{filtersNode}</div>
        </aside>

        {/* Товари */}
        <div className="min-w-0 flex-1">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFiltersOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-fg transition-colors hover:bg-muted lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" /> Фільтри
                {hasActiveFacets && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-xs font-semibold text-brand-fg">
                    {activeFacetCount}
                  </span>
                )}
              </button>
              <SortSelect value={sort} onChange={(id) => setParam({ sort: id === "popular" ? "" : id })} />
            </div>
            <span className="text-sm text-fg-muted">Знайдено: {sorted.length}</span>
          </div>

          {grid}
        </div>
      </div>

      <CategoryModal open={catModalOpen} onClose={() => setCatModalOpen(false)} onSelect={selectCategory} />

      {/* Фасети в drawer (mobile) */}
      <Drawer open={filtersOpen} onClose={() => setFiltersOpen(false)} title="Фільтри" side="left">
        {filtersNode}
      </Drawer>
    </div>
  );
}

/** Чип активного фільтра категорії з кнопкою скидання. */
function FilterChip({ label, onClear }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand bg-brand/5 py-1 pl-3 pr-1.5 text-sm font-medium text-fg">
      {label}
      <button
        onClick={onClear}
        aria-label={`Прибрати ${label}`}
        className="flex h-5 w-5 items-center justify-center rounded-full text-fg-muted hover:bg-muted hover:text-danger"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </span>
  );
}
