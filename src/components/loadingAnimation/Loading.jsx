import SpinnerSVG from "./SpinnerSVG";

// 92.8px is the height of the NavBar
function Loading() {
  return (
    <div className="bg-slate-50 h-[calc(100vh-92.8px)] flex justify-center items-center">
      <SpinnerSVG mode="light" size="100" />
    </div>
  );
}

export default Loading;
