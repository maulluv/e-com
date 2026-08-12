/**
 * Форматування ціни. Ціни всюди зберігаємо в копійках (ціле число),
 * а показуємо вже у гривнях через Intl.
 */
export function formatPrice(amountInCents, currency = "UAH") {
  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amountInCents / 100);
}

export function formatDate(iso) {
  return new Intl.DateTimeFormat("uk-UA", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}
