// Способи доставки та оплати для оформлення замовлення.
// Змінюєш варіанти — тільки тут. icon — назва іконки з lucide-react.
export const deliveryMethods = [
  {
    id: "np-branch",
    label: "Відділення Нової Пошти",
    note: "Доставка 1–2 дні, оплата за тарифами перевізника",
    icon: "Truck",
    fields: ["city", "branch"],
  },
  {
    id: "courier",
    label: "Кур'єр Нової Пошти",
    note: "Доставка за вашою адресою",
    icon: "PackageCheck",
    fields: ["city", "address"],
  },
  {
    id: "pickup",
    label: "Самовивіз",
    note: "Забрати із нашого магазину",
    icon: "Store",
    fields: [],
  },
];

export const paymentMethods = [
  { id: "cod", label: "Накладений платіж", note: "Оплата при отриманні", icon: "Banknote" },
  { id: "card", label: "Оплата карткою", note: "Visa / Mastercard", icon: "CreditCard" },
  { id: "cash", label: "Готівка при самовивозі", icon: "Wallet" },
];

export function deliveryLabel(id) {
  return deliveryMethods.find((m) => m.id === id)?.label ?? id;
}

export function paymentLabel(id) {
  return paymentMethods.find((m) => m.id === id)?.label ?? id;
}
