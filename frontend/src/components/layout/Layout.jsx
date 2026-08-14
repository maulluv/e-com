import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";
import { CartDrawer } from "../cart/CartDrawer";
import { usePageTitle } from "../../hooks/usePageTitle";

// Заголовки статичних маршрутів. Сторінка товару виставляє свій заголовок сама.
const ROUTE_TITLES = {
  "/catalog": "Каталог запчастин",
  "/cart": "Кошик",
  "/checkout": "Оформлення замовлення",
  "/wishlist": "Обране",
  "/about": "Про нас",
  "/delivery": "Доставка й оплата",
  "/returns": "Повернення та гарантія",
  "/contacts": "Контакти",
};

/** Виставляє <title> вкладки за маршрутом (undefined → дефолтний бренд). */
function RouteTitle() {
  const { pathname } = useLocation();
  usePageTitle(ROUTE_TITLES[pathname]);
  return null;
}

/**
 * Каркас сторінки: хедер + контент (Outlet) + футер + висувний кошик.
 * Обгортає всі маршрути.
 */
export function Layout() {
  return (
    <div className="flex min-h-full flex-col">
      <ScrollToTop />
      <RouteTitle />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
