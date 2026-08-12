import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";
import { CartDrawer } from "../cart/CartDrawer";

/**
 * Каркас сторінки: хедер + контент (Outlet) + футер + висувний кошик.
 * Обгортає всі маршрути.
 */
export function Layout() {
  return (
    <div className="flex min-h-full flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
