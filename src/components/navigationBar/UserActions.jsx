import PropTypes from "prop-types";
import { LuSearch } from "react-icons/lu";
import { TbHeart, TbShoppingCart, TbUserExclamation } from "react-icons/tb";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import Button from "../button/button";

// Interactivity to be added!
function UserActions({ mobileStyles }) {
  const stylesValue = "text-2xl";

  return (
    <ul
      className={"flex justify-between items-center w-[300px] " + mobileStyles}
    >
      <li>
        <Button
          tooltipOptions={{
            text: "User Profile",
            position: "bottom",
            distance: "150",
          }}
        >
          <TbUserExclamation className={stylesValue} />
        </Button>
      </li>
      <li>
        <Button
          tooltipOptions={{
            text: "Search Products",
            position: "bottom",
            distance: "150",
          }}
        >
          <LuSearch className={stylesValue} />
        </Button>
        {/* <Tooltip text="Search Products" position="bottom" /> */}
      </li>
      <li>
        <Button
          tooltipOptions={{
            text: "Favorites",
            position: "bottom",
            distance: "150",
          }}
        >
          <TbHeart className={stylesValue} />
        </Button>
        {/* <Tooltip text="Favorites" position="bottom" distance="150" /> */}
      </li>
      <li>
        <Button
          tooltipOptions={{
            text: "Cart items",
            position: "bottom",
            distance: "150",
          }}
        >
          <TbShoppingCart className={stylesValue} />
        </Button>
        {/* <Tooltip text="Cart items" position="bottom" distance="150" /> */}
      </li>
      <li>
        <Button
          tooltipOptions={{
            text: "Mode",
            position: "bottom",
            distance: "150",
          }}
        >
          {<MdOutlineLightMode className={stylesValue} /> || (
            <MdOutlineDarkMode className={stylesValue} />
          )}
        </Button>
      </li>
    </ul>
  );
}

UserActions.propTypes = {
  mobileStyles: PropTypes.string,
};

export default UserActions;
