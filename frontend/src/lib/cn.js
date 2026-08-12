/**
 * Дрібний хелпер для склеювання класів (умовних теж).
 *
 *   cn("btn", isActive && "btn--active", undefined) // "btn btn--active"
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
