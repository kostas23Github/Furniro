import PropTypes from "prop-types";
import { Link } from "react-router";
import { useState, useRef } from "react";
import { LuSearch } from "react-icons/lu";
import { TbHeart, TbShoppingCart, TbUserExclamation } from "react-icons/tb";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import Button from "../button/button";
import LoginModal from "../LoginModal";
import useOutsideClick from "../hooks/useOutsideClick";

function UserActions({ mobileStyles }) {
  const stylesValue = "text-2xl";
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const loginRef = useRef(null);

  // Hide the Login-Signup form modal when clicking outside of it.
  useOutsideClick(loginRef, () => setIsUserModalVisible(false));

  return (
    <ul
      className={
        "flex justify-between items-center w-[200px] lg:w-[300px] " +
        mobileStyles
      }
    >
      <li ref={loginRef} className="relative">
        <Button
          tooltipOptions={{
            text: "User Profile",
            position: "bottom",
            distance: "150",
          }}
          handleClick={() => setIsUserModalVisible(!isUserModalVisible)}
        >
          <TbUserExclamation className={stylesValue} />
        </Button>
        <LoginModal isUserModalVisible={isUserModalVisible} />
      </li>
      <li>
        <Link to={"/shop#searchProducts"}>
          <Button
            tooltipOptions={{
              text: "Search Products",
              position: "bottom",
              distance: "150",
            }}
          >
            <LuSearch className={stylesValue} />
          </Button>
        </Link>
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
        <Link to={"/cart"}>
          <Button
            tooltipOptions={{
              text: "Cart items",
              position: "bottom",
              distance: "150",
            }}
          >
            <TbShoppingCart className={stylesValue} />
          </Button>
        </Link>
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
