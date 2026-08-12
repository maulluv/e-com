// Пункти головного меню. Пункт із children — випадаюче підменю.
export const navLinks = [
  { label: "Головна", to: "/" },
  { label: "Каталог", to: "/catalog" },
  {
    label: "Про нас",
    to: "/about",
    children: [
      { label: "Про нас", to: "/about" },
      { label: "Доставка й оплата", to: "/delivery" },
      { label: "Повернення та гарантія", to: "/returns" },
    ],
  },
  { label: "Контакти", to: "/contacts" },
];
