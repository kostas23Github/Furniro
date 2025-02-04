import { useState, useEffect } from "react";

const useIsTouchDevice = () => {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(
        ("maxTouchPoints" in navigator && navigator.maxTouchPoints > 0) ||
          window.matchMedia("(pointer: coarse)").matches
      );
    };
    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  return isTouch;
};

export default useIsTouchDevice;
