// Routing, handling page routing - entry point for my app.

import { Routes, Route } from "react-router";
import Layout from "./app/Layout";
import Home from "./app/routes/Home";
import Shop from "./app/routes/Shop";
import About from "./app/routes/About";
import Contact from "./app/routes/Contact";
import ErrorPage from "./app/routes/ErrorPage";

function App() {
  return (
    <Routes>
      {/* Add not found/404/etc routes/pages. */}
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<ErrorPage />} />   
      </Route>
    </Routes>
  );
}

export default App;
