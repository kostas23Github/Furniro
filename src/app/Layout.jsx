// Contains all pages' common NavBar & Footer components.

import { Outlet } from "react-router";
import ProductsProvider from "../components/contexts/ProductsProvider";
import ScreenSizeProvider from "../components/contexts/ScreenSizeProvider";
import NavBar from "../components/navigationBar/navBar";

// Apply global(root) styles here!
function Layout() {
  return (
    <ScreenSizeProvider>
      <ProductsProvider>
        <div className="bg-slate-50 subpixel-antialiased">
          <NavBar />
          <main className="">
            <Outlet />
          </main>
          {/* <Footer /> */}
        </div>
      </ProductsProvider>
    </ScreenSizeProvider>
  );
}

export default Layout;
