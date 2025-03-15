// Routing, handling page routing - entry point for my app.

import { Routes, Route } from "react-router-dom";
import Layout from "./app/Layout";
import Home from "./app/routes/Home";
import Shop from "./app/routes/Shop";
import SingleProduct from "./app/routes/SingleProduct";
import Contact from "./app/routes/Contact";
import Cart from "./app/routes/Cart";
import Checkout from "./app/routes/Checkout";
import ErrorPage from "./app/routes/ErrorPage";
import PaymentOptions from "./app/routes/PaymentOptions";
import Returns from "./app/routes/Returns";
import PurchaseSecurity from "./app/routes/PurchaseSecurity";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route
          path="shop/:productId"
          element={<SingleProduct />}
        />
        <Route path="contact" element={<Contact />} />
        <Route path="cart" element={<Cart />} />
        <Route path="cart/checkout" element={<Checkout />} />
        <Route path="Payment Options" element={<PaymentOptions />} />
        <Route path="Returns" element={<Returns />} />
        <Route path="Purchase Security" element={<PurchaseSecurity />} />
        <Route path="404" element={<ErrorPage message="The page you are looking for doesn't exist."/>} /> {/*Match the redirect */}
        <Route path="error" element={<ErrorPage />} /> {/* Match the redirect */}
        <Route
          path="*"
          element={<ErrorPage message="Please check the URL." />}
        />
      </Route>
    </Routes>
  );
}

export default App;
