// Declare all different obj instances & based on the variant and other props declare its style.
// Refer to this prompt from yesterday ->
// "Which styles do they usually conditionally apply to the button element bc in an e-commerce one can have multiple different buttons"

import PropTypes from "prop-types";
import Tooltip from "./tooltip";
import useHover from "../hooks/useHover";
import useIsTouchDevice from "../hooks/useIsTouchDevice";

function Button({
  variant = "icon",
  type = "button",
  extraStyles = "",
  handleClick,
  disabled,
  tooltipOptions,
  children,
  ...rest
}) {
  // { ...rest } currently supports external event handlers.

  const [hoverRef, isHovered] = useHover();

  // Detect so to disable tooltip pop ups.
  const isTouchDevice = useIsTouchDevice();

  // Main button categories for regular & hover states.
  const variantClass = {
    primary: {
      regular: "bg-gold text-white ring-gold ring-2",
      hover: "bg-gold-light-2 text-gold outline outline-2 outline-gold",
    },
    "primary-reversed": {
      regular: "bg-slate-50 text-gold outline outline-2 outline-gold",
      hover: "bg-gold-light-2 text-gold outline outline-2 outline-gold",
    },
    secondary: {
      regular: "bg-grey-800 text-white ring-grey-800 ring-2",
      hover: "bg-slate-50 outline outline-2 outline-grey-800",
    },
    "secondary-reversed": {
      regular: "outline outline-2 outline-grey-800 dark:outline-grey-100",
      hover: "outline outline-2 outline-grey-800 dark:outline-grey-400",
    },
    text: /* Plain text button */ {
      regular: "text-grey-500 italic dark:text-white",
      hover: "text-grey-300 italic",
    },
    icon: /* Icon button */ {
      regular: "text-grey-800 dark:text-white",
      hover: "text-grey-400 dark:text-grey-400",
    },
    link: /* Icon button */ {
      regular: "text-white dark:text-gray-800",
      hover: "text-gray-300",
    },
  };

  // Apply proper styles based on hover state.
  const variantState =
    isHovered && !disabled
      ? variantClass[variant].hover
      : variantClass[variant].regular;

  if (!extraStyles.includes("absolute")) {
    extraStyles += " relative";
  }

  return (
    <button
      type={type}
      ref={hoverRef}
      className={`${variantState} ${extraStyles} inline-block ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={handleClick}
      disabled={disabled}
      {...rest}
    >
      {children}
      {!isTouchDevice && !disabled && isHovered && tooltipOptions && (
        <Tooltip {...tooltipOptions} />
      )}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf([
    "primary",
    "primary-reversed",
    "secondary",
    "secondary-reversed",
    "text",
    "icon",
    "link",
  ]),
  type: PropTypes.string,
  extraStyles: PropTypes.string,
  handleClick: PropTypes.func,
  disabled: PropTypes.bool,
  tooltipOptions: PropTypes.object,
  children: PropTypes.node.isRequired, // React node
};

export default Button;
