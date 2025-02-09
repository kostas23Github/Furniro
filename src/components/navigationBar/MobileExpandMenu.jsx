import PropTypes from "prop-types";
import Links from "./Links";
import UserActions from "./UserActions";

function MobileExpandMenu({ isMenuVisible, onShowMenu }) {
  return (
    <div
      className={`mobile-expanded-menu absolute top-[92.8px] right-0 w-full px-4 py-12 z-20 shadow-lg bg-slate-50 ${
        !isMenuVisible && "opacity-0 invisible pointer-events-none"
      }`}
    >
      <Links
        items={["Shop", "About", "Contact"]}
        placement="navBar"
        mobileStyles="mb-10 mx-auto"
        onShowMenu={onShowMenu}
      />
      <UserActions mobileStyles="mx-auto" />
    </div>
  );
}

MobileExpandMenu.propTypes = {
  isMenuVisible: PropTypes.bool.isRequired,
  onShowMenu: PropTypes.func.isRequired,
};

export default MobileExpandMenu;
