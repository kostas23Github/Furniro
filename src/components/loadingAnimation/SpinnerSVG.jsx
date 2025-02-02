import PropTypes from "prop-types";

function SpinnerSVG({ mode = "light", size = "100" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      width={size}
      height={size}
      style={{
        shapeRendering: "auto",
        display: "block",
        background: "transparent",
      }}
      // To account for NavBar Height, for placing the SVG in the middle of the screen.
      className="-translate-y-[46.4px]"
    >
      <circle
        strokeLinecap="round"
        fill="none"
        strokeDasharray="50"
        stroke={mode === "light" ? "#3A3A3A" : "#FCF8F3"}
        strokeWidth="8"
        r="32"
        cy="50"
        cx="50"
      >
        <animateTransform
          values="0 50 50;360 50 50"
          keyTimes="0;1"
          dur="2s"
          repeatCount="indefinite"
          type="rotate"
          attributeName="transform"
        />
      </circle>
    </svg>
  );
}

export default SpinnerSVG;

SpinnerSVG.propTypes = {
  mode: PropTypes.string,
  size: PropTypes.string,
}