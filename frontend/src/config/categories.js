// Категорії каталогу автозапчастин + підкатегорії (2-й рівень фільтра).
// id категорії збігається з полем category у товарах; id підкатегорії — з subcategory.
// icon — назва іконки з lucide-react (див. CategoryStrip / CategoryModal).
// У підкатегорії поле group (необов'язкове) вмикає групування в модалці.
export const categories = [
  {
    id: "brakes",
    label: "Гальмівна система",
    icon: "Disc3",
    subcategories: [
      { id: "brake-pads", label: "Гальмівні колодки" },
      { id: "brake-discs", label: "Гальмівні диски" },
      { id: "calipers", label: "Супорти" },
      { id: "brake-hoses", label: "Гальмівні шланги" },
      { id: "abs-sensor", label: "Датчик ABS" },
      { id: "brake-fluid", label: "Гальмівна рідина" },
    ],
  },
  {
    id: "engine",
    label: "Двигун",
    icon: "Cog",
    subcategories: [
      { id: "engine-assembly", label: "Двигун в зборі", group: "Деталі двигуна" },
      { id: "cylinder-head", label: "ГБЦ", group: "Деталі двигуна" },
      { id: "head-gasket", label: "Прокладка ГБЦ", group: "Деталі двигуна" },
      { id: "oil-pump", label: "Масляний насос", group: "Деталі двигуна" },
      { id: "seals", label: "Сальники", group: "Деталі двигуна" },
      { id: "pistons", label: "Поршні", group: "Деталі двигуна" },
      { id: "timing-kit", label: "Комплект ГРМ", group: "Ремені та ланцюги" },
      { id: "timing-belt", label: "Ремінь ГРМ", group: "Ремені та ланцюги" },
      { id: "timing-chain", label: "Ланцюг ГРМ", group: "Ремені та ланцюги" },
      { id: "rollers", label: "Ролики", group: "Ремені та ланцюги" },
      { id: "spark-plugs", label: "Свічки запалювання", group: "Запалювання" },
      { id: "ignition-coil", label: "Котушка запалювання", group: "Запалювання" },
      { id: "injectors", label: "Форсунки", group: "Паливна система" },
      { id: "fuel-pump", label: "Паливний насос", group: "Паливна система" },
    ],
  },
  {
    id: "suspension",
    label: "Підвіска",
    icon: "Spline",
    subcategories: [
      { id: "shock-absorbers", label: "Амортизатори" },
      { id: "springs", label: "Пружини" },
      { id: "stabilizer-links", label: "Стійки стабілізатора" },
      { id: "control-arms", label: "Важелі" },
      { id: "silent-blocks", label: "Сайлентблоки" },
      { id: "tie-rods", label: "Рульові тяги" },
      { id: "bearings", label: "Ступичні підшипники" },
    ],
  },
  {
    id: "filters",
    label: "Фільтри",
    icon: "Filter",
    subcategories: [
      { id: "oil-filter", label: "Масляний фільтр" },
      { id: "air-filter", label: "Повітряний фільтр" },
      { id: "cabin-filter", label: "Салонний фільтр" },
      { id: "fuel-filter", label: "Паливний фільтр" },
    ],
  },
  {
    id: "oils",
    label: "Мастила та рідини",
    icon: "Droplet",
    subcategories: [
      { id: "motor-oil", label: "Моторна олива" },
      { id: "gear-oil", label: "Трансмісійна олива" },
      { id: "antifreeze", label: "Антифриз" },
      { id: "brake-fluid-oils", label: "Гальмівна рідина" },
      { id: "power-steering-fluid", label: "Рідина ГПК" },
    ],
  },
  {
    id: "electric",
    label: "Електрика",
    icon: "BatteryCharging",
    subcategories: [
      { id: "batteries", label: "Акумулятори" },
      { id: "alternators", label: "Генератори" },
      { id: "starters", label: "Стартери" },
      { id: "lambda", label: "Лямбда-зонди" },
      { id: "sensors", label: "Датчики" },
      { id: "bulbs", label: "Лампи" },
    ],
  },
  {
    id: "tires",
    label: "Шини та диски",
    icon: "CircleDot",
    subcategories: [
      { id: "summer-tires", label: "Літні шини" },
      { id: "winter-tires", label: "Зимові шини" },
      { id: "allseason-tires", label: "Всесезонні шини" },
      { id: "alloy-wheels", label: "Литі диски" },
      { id: "steel-wheels", label: "Сталеві диски" },
    ],
  },
  {
    id: "body",
    label: "Кузов та оптика",
    icon: "CarFront",
    subcategories: [
      { id: "bumpers", label: "Бампери" },
      { id: "fenders", label: "Крила" },
      { id: "doors", label: "Двері" },
      { id: "headlights", label: "Фари" },
      { id: "taillights", label: "Ліхтарі" },
      { id: "mirrors", label: "Дзеркала" },
      { id: "wipers", label: "Щітки склоочисника" },
    ],
  },
];

/** Підпис категорії за id. */
export function categoryLabel(id) {
  return categories.find((c) => c.id === id)?.label ?? id;
}

/** Підпис підкатегорії за id (шукаємо в усіх категоріях). */
export function subcategoryLabel(id) {
  for (const c of categories) {
    const sub = c.subcategories?.find((s) => s.id === id);
    if (sub) return sub.label;
  }
  return id;
}
