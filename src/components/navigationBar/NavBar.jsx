import { useState } from "react";
import { Link } from "react-router";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import Links from "./Links.jsx";
import UserActions from "./UserActions.jsx";
import { useScreenSize } from "../contexts/ScreenSizeProvider";
import Button from "../button/button.jsx";
import logo from "../../assets/images/logo/Meubel_House_Logo.png";

function NavBar() {
  // Boolean of whether it is a small(<768px) width breakpoint.
  const { isMobile } = useScreenSize();
  // Toggle the expansion of mobile full navigation menu.
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  return isMobile ? (
    <nav className="px-5 sm:px-10 lg:px-20 py-8 flex justify-between relative">
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
      {/* By changing its class I hide the element. */}
      <div
        className={`mobile-expanded-menu absolute top-[92.8px] right-0 w-full px-4 py-12 z-20 shadow-lg bg-slate-50 ${
          !isMenuVisible && "opacity-0 invisible pointer-events-none"
        }`}
      >
        <Links
          items={["Shop", "About", "Contact"]}
          placement="navBar"
          mobileStyles="mb-10 mx-auto"
        />
        <UserActions mobileStyles="mx-auto" />
      </div>
    </nav>
  ) : (
    <nav className="px-5 sm:px-10 lg:px-20 py-8 flex justify-between">
      <Link to="/" className="flex justify-between gap-1 items-center">
        <img src={logo} alt="Logo" className="md:w-12 md:h-8 w-8 h-6" />
        <h3 className="text-3xl font-bold md:text-logo">Funiro</h3>
        {/* custom font-size */}
      </Link>
      <Links items={["Shop", "About", "Contact"]} placement="navBar" />
      <UserActions />
    </nav>
  );
}

export default NavBar;
