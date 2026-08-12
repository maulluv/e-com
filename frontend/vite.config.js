import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Tailwind v4 підключається як Vite-плагін — окремого tailwind.config не потрібно,
// токени дизайну живуть у src/index.css (@theme).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
  },
});
