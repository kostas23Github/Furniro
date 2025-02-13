// Routing, handling page routing - entry point for my app.

import { Routes, Route } from "react-router-dom";
import Layout from "./app/Layout";
import Home from "./app/routes/Home";
import Shop from "./app/routes/Shop";
import About from "./app/routes/About";
import Contact from "./app/routes/Contact";
import ErrorPage from "./app/routes/ErrorPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="404" element={<ErrorPage />} /> Match the redirect
        <Route path="*" element={<ErrorPage message="Page not found. Please check the URL."/>} />   
      </Route>
    </Routes>
  );
}

export default App;
