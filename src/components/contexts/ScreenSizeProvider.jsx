import { createContext, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { PropTypes } from "prop-types";

// Create the context
const ScreenSizeContext = createContext();

// Define breakpoints - might add more!
const breakpoints = {
  xxs: { maxWidth: 450 },
  xs: { maxWidth: 639 },
  sm: { minWidth: 640, maxWidth: 767 },
  md: { minWidth: 768, maxWidth: 1023 },
  lg: { minWidth: 1024, maxWidth: 1279 },
  xl: { minWidth: 1280, maxWidth: 1535 },
  xxl: { minWidth: 1536 },
};

// Provider Component
export default function ScreenSizeProvider({ children }) {
  const isXXS = useMediaQuery(breakpoints.xxs);
  const isXS = useMediaQuery(breakpoints.xs);
  const isSM = useMediaQuery(breakpoints.sm);
  const isMD = useMediaQuery(breakpoints.md);
  const isLG = useMediaQuery(breakpoints.lg);
  const isXL = useMediaQuery(breakpoints.xl);
  const isXXL = useMediaQuery(breakpoints.xxl);

  return (
    <ScreenSizeContext.Provider value={{ isXXS, isXS, isSM, isMD, isLG, isXL, isXXL }}>
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
