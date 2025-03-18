import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import Links from "./Links.jsx";
import UserActions from "./UserActions.jsx";
import { useScreenSize } from "../contexts/ScreenSizeProvider";
import Button from "../button/button";
import logo from "../../assets/images/logo/Meubel_House_Logo.png";
import MobileExpandMenu from "./MobileExpandMenu.jsx";
import useOutsideClick from "../hooks/useOutsideClick.jsx";

function NavBar() {
  // Boolean of whether it is a small(<768px) width breakpoint.
  const { isXS } = useScreenSize();
  // Toggle the expansion of mobile full navigation menu.
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  const menuRef = useRef(null);

  // Hide the navbar menu when clicking outside of it.
  useOutsideClick(menuRef, () => {
    if (isOpen) setIsOpen(false);
  });

  // Close navbar menu when route changes.
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

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
      {isOpen ? (
        <Button
          variant="icon"
          extraStyles="text-4xl"
          tooltipOptions={{
            text: "Hide menu",
            position: "left",
            distance: "150",
          }}
          onClick={() => setIsOpen(!isOpen)}
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
          onClick={() => setIsOpen(!isOpen)}
        >
          <GiHamburgerMenu />
        </Button>
      )}
      {isOpen && (
        <div ref={menuRef} className="w-full">
          <MobileExpandMenu
            isOpen={isOpen}
            onShowMenu={setIsOpen} // This prop is drilled first to this component & then to the Links component bc each Link in the MobileExpandMenu must be able to modify this state(its grandparent's), so that when a Link is clicked this menu becomes invisible.
          />
        </div>
      )}
    </nav>
  ) : (
    <nav className="px-5 sm:px-10 lg:px-20 py-8 flex justify-between max-w-[1200px] mx-auto w-full">
      <Link to="/" className="flex justify-between gap-1 items-center">
        <img src={logo} alt="Logo" className="md:w-12 md:h-8 w-8 h-6" />
        <h3 className="text-3xl font-bold md:text-logo">Funiro</h3>
      </Link>
      <Links
        items={["Shop", "Contact"]}
        placement="navBar"
      />
      <UserActions />
    </nav>
  );
}

export default NavBar;
