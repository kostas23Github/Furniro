import PropTypes from "prop-types";
import Links from "./Links";
import UserActions from "./UserActions";

function MobileExpandMenu({ isOpen, onShowMenu }) {
  return (
    <div
      className={`mobile-expanded-menu absolute top-[92.8px] right-0 w-full py-12 z-20 shadow-lg bg-slate-50 ${
        !isOpen && "opacity-0 invisible pointer-events-none"
      }`}
    >
      <Links
        items={["Shop", "Contact"]}
        placement="navBar"
        mobileStyles="mb-10 mx-auto justify-center gap-4"
        onShowMenu={onShowMenu}
      />
      <UserActions mobileStyles="mx-auto" />
    </div>
  );
}

MobileExpandMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onShowMenu: PropTypes.func.isRequired,
};

export default MobileExpandMenu;
