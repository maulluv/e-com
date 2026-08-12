/**
 * Дерево авто для фільтра "Виберіть авто": марка → модель → покоління (рік).
 * Поки це мок-дані. Коли з'явиться бек — прийдуть звідти тим самим форматом.
 */
export const vehicleBrands = [
  {
    id: "vw",
    label: "Volkswagen",
    models: [
      {
        id: "golf",
        label: "Golf",
        generations: [
          { id: "golf-8", label: "Golf 8", years: "2019–…" },
          { id: "golf-7", label: "Golf 7", years: "2012–2020" },
          { id: "golf-6", label: "Golf 6", years: "2008–2012" },
        ],
      },
      {
        id: "passat",
        label: "Passat",
        generations: [
          { id: "passat-b8", label: "Passat B8", years: "2014–…" },
          { id: "passat-b7", label: "Passat B7", years: "2010–2014" },
          { id: "passat-b6", label: "Passat B6", years: "2005–2010" },
        ],
      },
      {
        id: "jetta",
        label: "Jetta",
        generations: [
          { id: "jetta-7", label: "Jetta 7", years: "2019–…" },
          { id: "jetta-6", label: "Jetta 6", years: "2010–2019" },
          { id: "jetta-5", label: "Jetta 5", years: "2005–2010" },
        ],
      },
      {
        id: "tiguan",
        label: "Tiguan",
        generations: [
          { id: "tiguan-2", label: "Tiguan II", years: "2016–…" },
          { id: "tiguan-1", label: "Tiguan I", years: "2007–2016" },
        ],
      },
    ],
  },
  {
    id: "audi",
    label: "Audi",
    models: [
      {
        id: "a4",
        label: "A4",
        generations: [
          { id: "a4-b9", label: "A4 B9", years: "2015–…" },
          { id: "a4-b8", label: "A4 B8", years: "2007–2015" },
        ],
      },
      {
        id: "a6",
        label: "A6",
        generations: [
          { id: "a6-c8", label: "A6 C8", years: "2018–…" },
          { id: "a6-c7", label: "A6 C7", years: "2011–2018" },
        ],
      },
      {
        id: "q5",
        label: "Q5",
        generations: [
          { id: "q5-2", label: "Q5 II", years: "2016–…" },
          { id: "q5-1", label: "Q5 I", years: "2008–2016" },
        ],
      },
    ],
  },
  {
    id: "skoda",
    label: "Škoda",
    models: [
      {
        id: "octavia",
        label: "Octavia",
        generations: [
          { id: "octavia-a8", label: "Octavia A8", years: "2019–…" },
          { id: "octavia-a7", label: "Octavia A7", years: "2013–2020" },
          { id: "octavia-a5", label: "Octavia A5", years: "2004–2013" },
        ],
      },
      {
        id: "fabia",
        label: "Fabia",
        generations: [
          { id: "fabia-4", label: "Fabia IV", years: "2021–…" },
          { id: "fabia-3", label: "Fabia III", years: "2014–2021" },
        ],
      },
      {
        id: "superb",
        label: "Superb",
        generations: [
          { id: "superb-3", label: "Superb III", years: "2015–…" },
          { id: "superb-2", label: "Superb II", years: "2008–2015" },
        ],
      },
    ],
  },
  {
    id: "bmw",
    label: "BMW",
    models: [
      {
        id: "3",
        label: "3 Series",
        generations: [
          { id: "3-g20", label: "3 (G20)", years: "2018–…" },
          { id: "3-f30", label: "3 (F30)", years: "2011–2019" },
          { id: "3-e90", label: "3 (E90)", years: "2005–2012" },
        ],
      },
      {
        id: "5",
        label: "5 Series",
        generations: [
          { id: "5-g30", label: "5 (G30)", years: "2016–…" },
          { id: "5-f10", label: "5 (F10)", years: "2010–2017" },
        ],
      },
      {
        id: "x5",
        label: "X5",
        generations: [
          { id: "x5-g05", label: "X5 (G05)", years: "2018–…" },
          { id: "x5-f15", label: "X5 (F15)", years: "2013–2018" },
        ],
      },
    ],
  },
  {
    id: "toyota",
    label: "Toyota",
    models: [
      {
        id: "corolla",
        label: "Corolla",
        generations: [
          { id: "corolla-e210", label: "Corolla (E210)", years: "2018–…" },
          { id: "corolla-e170", label: "Corolla (E170)", years: "2013–2018" },
        ],
      },
      {
        id: "camry",
        label: "Camry",
        generations: [
          { id: "camry-xv70", label: "Camry (XV70)", years: "2017–…" },
          { id: "camry-xv50", label: "Camry (XV50)", years: "2011–2017" },
        ],
      },
      {
        id: "rav4",
        label: "RAV4",
        generations: [
          { id: "rav4-xa50", label: "RAV4 (XA50)", years: "2018–…" },
          { id: "rav4-xa40", label: "RAV4 (XA40)", years: "2012–2018" },
        ],
      },
    ],
  },
];
