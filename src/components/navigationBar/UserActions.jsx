import PropTypes from "prop-types";
import { LuSearch } from "react-icons/lu";
import { TbHeart, TbShoppingCart, TbUserExclamation } from "react-icons/tb";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

// Interactivity to be added!
function UserActions({ mobileStyles }) {
  const stylesValue = "text-2xl";
  return (
    <div
      className={"flex justify-between items-center w-[300px] " + mobileStyles}
    >
      <TbUserExclamation className={stylesValue} />
      <LuSearch className={stylesValue} />
      <TbHeart className={stylesValue} />
      <TbShoppingCart className={stylesValue} />
      {<MdOutlineLightMode className={stylesValue} /> || (
        <MdOutlineDarkMode className={stylesValue} />
      )}
    </div>
  );
}

UserActions.propTypes = {
  mobileStyles: PropTypes.string.isRequired,
}


export default UserActions;
