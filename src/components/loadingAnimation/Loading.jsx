import SpinnerSVG from "./SpinnerSVG";
import { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";
// 92.8px is the height of the NavBar
function Loading() {
    const { theme } = useContext(ThemeContext);

  return (
    <div className="bg-slate-50 dark:bg-slate-700 h-[calc(100vh-92.8px)] flex justify-center items-center">
      <SpinnerSVG mode={theme} size="100" />
    </div>
  );
}

export default Loading;
