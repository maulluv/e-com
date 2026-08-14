import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";
import { CartProvider } from "./context/CartContext";
import { VehicleProvider } from "./context/VehicleContext";
import { WishlistProvider } from "./context/WishlistContext";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/HomePage";
import { CatalogPage } from "./pages/CatalogPage";
import { ProductPage } from "./pages/ProductPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { WishlistPage } from "./pages/WishlistPage";
import { AboutPage } from "./pages/AboutPage";
import { DeliveryPage } from "./pages/DeliveryPage";
import { ReturnsPage } from "./pages/ReturnsPage";
import { ContactsPage } from "./pages/ContactsPage";
import { NotFoundPage } from "./pages/NotFoundPage";

// Маршрути. Усі сторінки живуть під спільним Layout (хедер/футер/кошик).
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/catalog", element: <CatalogPage /> },
      { path: "/product/:id", element: <ProductPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/checkout", element: <CheckoutPage /> },
      { path: "/wishlist", element: <WishlistPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/delivery", element: <DeliveryPage /> },
      { path: "/returns", element: <ReturnsPage /> },
      { path: "/contacts", element: <ContactsPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export function App() {
  return (
    <ToastProvider>
      <VehicleProvider>
        <WishlistProvider>
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
        </WishlistProvider>
      </VehicleProvider>
    </ToastProvider>
  );
}
