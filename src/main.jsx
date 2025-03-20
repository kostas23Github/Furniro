import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./index.css";
import App from "./App.jsx";
import ProductsProvider from "./components/contexts/ProductsProvider.jsx";
import CartProvider from "./components/contexts/CartProvider.jsx";
import AuthProvider from "./components/contexts/AuthProvider.jsx";
import FavoritesProvider from "./components/contexts/FavoritesProvider.jsx";
import ThemeProvider from "./components/contexts/ThemeProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <ThemeProvider>
        <ProductsProvider>
          <AuthProvider>
            <CartProvider>
              <FavoritesProvider>
                <ScrollToTop />
                <App />
              </FavoritesProvider>
            </CartProvider>
          </AuthProvider>
        </ProductsProvider>
      </ThemeProvider>
    </HashRouter>
  </StrictMode>
);
