// Declare all different obj instances & based on the variant and other props declare its style.
// Refer to this prompt from yesterday ->
// "Which styles do they usually conditionally apply to the button element bc in an e-commerce one can have multiple different buttons"

import { useState } from "react";
import PropTypes from "prop-types";
import Tooltip from "./tooltip";

function Button({
  variant = "icon",
  extraStyles = "",
  disabled,
  tooltipOptions,
  children,
  ...rest
}) {
  // { ...rest } currently supports external event handlers.

  const [isHovered, setIsHovered] = useState(false);

  // Main button categories for regular & hover states.
  const variantClass = {
    primary: {
      regular: "bg-gold text-white",
      hover: "bg-transparent text-gold ring-gold ring-2 ring-inset",
    },
    "primary-reversed": {
      regular: "bg-transparent text-gold ring-gold ring-2 ring-inset",
      hover: "bg-gold text-white",
    },
    secondary: {
      regular: "bg-grey-800 text-white",
      hover: "bg-slate-50 text-grey-800 ring-grey-500 ring-2 ring-inset",
    },
    "secondary-reversed": {
      regular: "bg-slate-50 text-grey-800 ring-grey-500 ring-2 ring-inset",
      hover: "bg-grey-800 text-white",
    },
    text: /* Plain text button */ {
      regular: "text-grey-500 italic",
      hover: "text-grey-300 italic",
    },
    icon: /* Icon button */ {
      regular: "text-gray-800",
      hover: "text-gray-500",
    },
    link: /* Icon button */ {
      regular: "text-white",
      hover: "text-gray-300",
    },
  };

  // Apply proper styles based on hover state.
  const variantState = isHovered
    ? variantClass[variant].hover
    : variantClass[variant].regular;

  if (!extraStyles.includes("absolute")) {
    extraStyles += " relative";
  }

  return (
    <button
      className={`${variantState} ${extraStyles} inline-block ${
        disabled ? "opacity-50" : ""
      }`}
      disabled={disabled}
      {...rest}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered && tooltipOptions && <Tooltip {...tooltipOptions} />}
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
  extraStyles: PropTypes.string,
  disabled: PropTypes.bool,
  tooltipOptions: PropTypes.object,
  children: PropTypes.node.isRequired, // React node
};

export default Button;
