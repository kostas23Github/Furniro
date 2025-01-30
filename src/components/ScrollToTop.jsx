import { useEffect } from 'react';
import { useLocation } from 'react-router';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top of page whenever the location changes
    window.scrollTo(0, 0);
  }, [location]);

  return null; // This component does not render anything
};

export default ScrollToTop;
