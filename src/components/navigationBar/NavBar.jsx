import { useState, useRef } from "react";
import { Link } from "react-router";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import Links from "./Links.jsx";
import UserActions from "./UserActions.jsx";
import { useScreenSize } from "../contexts/ScreenSizeProvider";
import Button from "../button/Button";
import logo from "../../assets/images/logo/Meubel_House_Logo.png";
import MobileExpandMenu from "./mobileExpandMenu.jsx";
import useOutsideClick from "../hooks/useOutsideClick.jsx";

function NavBar() {
  // Boolean of whether it is a small(<768px) width breakpoint.
  const { isXS } = useScreenSize();
  // Toggle the expansion of mobile full navigation menu.
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const menuRef = useRef(null);

  // Hide the menu when clicking outside of it
  useOutsideClick(menuRef, () => {
    if (isMenuVisible) setIsMenuVisible(false);
  });

  return isXS ? (
    <nav className="px-5 sm:px-10 lg:px-20 py-8 flex flex-wrap justify-between relative">
      <Button
        tooltipOptions={{
          text: "Home Page",
          position: "right",
          distance: "100",
        }}
      >
        <Link to="/" className="flex justify-between gap-1 items-center">
          <img src={logo} alt="Logo" className="md:w-12 md:h-8 w-8 h-6" />
          <h3 className="text-3xl font-bold md:text-logo">Funiro</h3>
        </Link>
      </Button>
      {isMenuVisible ? (
        <Button
          variant="icon"
          extraStyles="text-4xl"
          tooltipOptions={{
            text: "Hide menu",
            position: "left",
            distance: "150",
          }}
          onClick={() => setIsMenuVisible(!isMenuVisible)}
        >
          <IoCloseSharp />
        </Button>
      ) : (
        <Button
          variant="icon"
          extraStyles="text-4xl"
          tooltipOptions={{
            text: "Show menu",
            position: "left",
            distance: "150",
          }}
          onClick={() => setIsMenuVisible(!isMenuVisible)}
        >
          <GiHamburgerMenu />
        </Button>
      )}
      {isMenuVisible && (
        <div ref={menuRef} className="w-full sm">
          <MobileExpandMenu
            isMenuVisible={isMenuVisible}
            onShowMenu={setIsMenuVisible} // This prop is drilled first to this component & then to the Links component bc each Link in the MobileExpandMenu must be able to modify this state(its grandparent's), so that when a Link is clicked this menu becomes invisible.
          />
        </div>
      )}
    </nav>
  ) : (
    <nav className="px-5 sm:px-10 lg:px-20 py-8 flex justify-between">
      <Link to="/" className="flex justify-between gap-1 items-center">
        <img src={logo} alt="Logo" className="md:w-12 md:h-8 w-8 h-6" />
        <h3 className="text-3xl font-bold md:text-logo">Funiro</h3>
      </Link>
      <Links items={["Shop", "About", "Contact"]} placement="navBar" />
      <UserActions />
    </nav>
  );
}

export default NavBar;
