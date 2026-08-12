import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { VehicleProvider } from "./context/VehicleContext";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/HomePage";
import { CatalogPage } from "./pages/CatalogPage";
import { ProductPage } from "./pages/ProductPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactsPage } from "./pages/ContactsPage";
import { AccountPage } from "./pages/AccountPage";
import { NotFoundPage } from "./pages/NotFoundPage";

// Маршрути. Усі сторінки живуть під спільним Layout (хедер/футер/кошик).
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/catalog", element: <CatalogPage /> },
      { path: "/product/:id", element: <ProductPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/contacts", element: <ContactsPage /> },
      { path: "/account", element: <AccountPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export function App() {
  return (
    <VehicleProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </VehicleProvider>
  );
}
