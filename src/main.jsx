import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./index.css";
import App from "./App.jsx";
import ProductsProvider from "./components/contexts/ProductsProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <ProductsProvider>
        <ScrollToTop />
        <App />
      </ProductsProvider>
    </HashRouter>
  </StrictMode>
);
