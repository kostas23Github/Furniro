// Contains all pages' common NavBar & Footer components.

import { Outlet } from "react-router";
import ProductsProvider from "../components/contexts/ProductsProvider";
import ScreenSizeProvider from "../components/contexts/ScreenSizeProvider";
import NavBar from "../components/navigationBar/NavBar";
import Footer from "../components/Footer";

// Apply global(root) styles here!
function Layout() {
  return (
    <ScreenSizeProvider>
      <ProductsProvider>
        <div className="bg-slate-50 dark:bg-slate-700 subpixel-antialiased flex flex-col dark:text-slate-50">
          <NavBar />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </ProductsProvider>
    </ScreenSizeProvider>
  );
}

export default Layout;
