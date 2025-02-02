import PropTypes from "prop-types";

function Tooltip({ text = "hello", position = "bottom", distance = "80" }) {
  // Add tooltip to most buttons.
  const positionStyles = {
    top: {
      tooltip: {
        bottom: `${distance}%`,
        left: "50%",
        transform: "translateX(-50%)",
      },
      arrowStyles:
        "absolute left-1/2 -bottom-4 transform -translate-x-1/2 border-8 border-transparent border-t-grey-800/80",
    },
    bottom: {
      tooltip: {
        top: `${distance}%`,
        left: "50%",
        transform: "translateX(-50%)",
      },
      arrowStyles:
        "absolute left-1/2 -top-4 transform -translate-x-1/2 border-8 border-transparent border-b-grey-800/90",
    },
    right: {
      tooltip: {
        left: `${distance}%`,
        top: "50%",
        transform: "translateY(-50%)",
      },
      arrowStyles:
        "absolute top-1/2 right-full transform -translate-y-1/2 border-8 border-transparent border-r-grey-800/90",
    },
    left: {
      tooltip: {
        right: `${distance}%`,
        top: "50%",
        transform: "translateY(-50%)",
      },
      arrowStyles:
        "absolute top-1/2 left-full transform -translate-y-1/2 border-8 border-transparent border-l-grey-800/90",
    },
  };
  return (
    <span
      className="absolute bg-grey-800/90 text-white text-sm leading-none font-medium px-3 py-2 rounded shadow-lg shadow-grey-500 z-10 cursor-default pointer-events-none text-nowrap"
      style={positionStyles[position].tooltip}
    >
      {text}
      <div className={positionStyles[position].arrowStyles}></div>
    </span>
  );
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  position: PropTypes.oneOf(["top", "right", "bottom", "left"]),
  distance: PropTypes.string,
};

export default Tooltip;
