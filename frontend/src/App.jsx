import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { VehicleProvider } from "./context/VehicleContext";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/HomePage";
import { CatalogPage } from "./pages/CatalogPage";
import { ProductPage } from "./pages/ProductPage";
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
    <VehicleProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </VehicleProvider>
  );
}
