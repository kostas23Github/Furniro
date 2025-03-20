import PropTypes from "prop-types";
import { Link } from "react-router";
import { useState, useRef } from "react";
import { LuSearch } from "react-icons/lu";
import { TbHeart, TbShoppingCart, TbUserExclamation } from "react-icons/tb";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import Button from "../button/button";
import LoginModal from "../modals/LoginModal";
import useOutsideClick from "../hooks/useOutsideClick";
import FavoritesModal from "../modals/FavoritesModal";

function UserActions({ mobileStyles }) {
  const [isUserLoginModalVisible, setIsUserLoginModalVisible] = useState(false);
  const [isFavoritesModalVisible, setIsFavoritedModalVisible] = useState(false);
  const loginRef = useRef(null);
  const favoritesRef = useRef(null);
  
  const stylesValue = "text-2xl";

  // Hide the Login-Signup form modal when clicking outside of it.
  useOutsideClick(loginRef, () => setIsUserLoginModalVisible(false));
  // Do the same for favorites modal.
  useOutsideClick(favoritesRef, () => setIsFavoritedModalVisible(false));

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
          handleClick={() =>
            setIsUserLoginModalVisible(!isUserLoginModalVisible)
          }
        >
          <TbUserExclamation className={stylesValue} />
        </Button>
        <LoginModal isUserModalVisible={isUserLoginModalVisible} />
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
      <li ref={favoritesRef} className="relative">
        <Button
          tooltipOptions={{
            text: "Favorites",
            position: "bottom",
            distance: "150",
          }}
          handleClick={() =>
            setIsFavoritedModalVisible(!isFavoritesModalVisible)
          }
        >
          <TbHeart className={stylesValue} />
        </Button>
        <FavoritesModal isFavoritesModalVisible={isFavoritesModalVisible} />
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
