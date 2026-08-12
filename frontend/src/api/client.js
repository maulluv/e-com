// Базовий HTTP-клієнт. Адреса беку береться з env (VITE_API_URL),
// з дефолтом для локальної розробки.
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

async function request(path, options) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? `Помилка запиту (${res.status})`);
  }

  return res.json();
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: "POST", body: JSON.stringify(body) }),
};
