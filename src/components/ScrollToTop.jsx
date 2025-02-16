import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0); // Scroll to top if no hash fragment
    }
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;
