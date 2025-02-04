import { createContext, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { PropTypes } from "prop-types";

// Create the context
const ScreenSizeContext = createContext();

// Define breakpoints - might add more!
const breakpoints = {
  mobilePortrait: { maxWidth: 450 },
  mobile: { maxWidth: 767 },
  tablet: { minWidth: 768, maxWidth: 1023 },
  laptop: { minWidth: 1024, maxWidth: 1279 },
  desktop: { minWidth: 1280, maxWidth: 1535 },
  monitor: { minWidth: 1536 },
};

// Provider Component
export default function ScreenSizeProvider({ children }) {
  const isMobilePortrait = useMediaQuery(breakpoints.mobilePortrait);
  const isMobile = useMediaQuery(breakpoints.mobile);
  const isTablet = useMediaQuery(breakpoints.tablet);
  const isLaptop = useMediaQuery(breakpoints.laptop);
  const isDesktop = useMediaQuery(breakpoints.desktop);
  const isMonitor = useMediaQuery(breakpoints.monitor);

  return (
    <ScreenSizeContext.Provider value={{ isMobilePortrait, isMobile, isTablet, isLaptop, isDesktop, isMonitor }}>
      {children}
    </ScreenSizeContext.Provider>
  );
}

ScreenSizeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to consume context
// Returns the values defined at the return statement above.
export function useScreenSize() {
  const context = useContext(ScreenSizeContext);
  if (!context) {
    throw new Error("useScreenSize must be used within a ScreenSizeProvider");
  }
  return context;
}
