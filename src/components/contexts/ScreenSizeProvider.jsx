import { createContext, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { PropTypes } from "prop-types";

// Create the context
const ScreenSizeContext = createContext();

// Define breakpoints - might add more!
const breakpoints = {
  mobile: { maxWidth: 767 },
  tablet: { minWidth: 768, maxWidth: 1023 },
  desktop: { minWidth: 1024 },
};

// Provider Component
export default function ScreenSizeProvider({ children }) {
  const isMobile = useMediaQuery(breakpoints.mobile);
  const isTablet = useMediaQuery(breakpoints.tablet);
  const isDesktop = useMediaQuery(breakpoints.desktop);

  return (
    <ScreenSizeContext.Provider value={{ isMobile, isTablet, isDesktop }}>
      {children}
    </ScreenSizeContext.Provider>
  );
}

ScreenSizeProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

// Custom hook to consume context
// Returns the values defined at the return statement above.
export function useScreenSize() {
  const context = useContext(ScreenSizeContext);
  if (!context) {
    throw new Error("useScreenSize must be used within a ScreenSizeProvider");
  }
  return context;
}