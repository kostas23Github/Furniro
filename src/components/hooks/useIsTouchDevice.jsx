import { useState, useEffect } from "react";

const useIsTouchDevice = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        ("maxTouchPoints" in navigator && navigator.maxTouchPoints > 0) ||
          window.matchMedia("(pointer: coarse)").matches
      );
    };
    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  return isTouchDevice;
};

export default useIsTouchDevice;
