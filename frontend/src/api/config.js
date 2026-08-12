/**
 * Поки немає беку, фронт працює на моках (api/mock/).
 * Щойно з'явиться реальний бек — досить вписати VITE_API_URL у frontend/.env,
 * і всі запити підуть на нього. Жодних змін у коді не потрібно.
 */
export const USE_MOCK = !import.meta.env.VITE_API_URL;
