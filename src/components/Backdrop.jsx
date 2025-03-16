import PropTypes from "prop-types";

// This Backdrop component serves as an underneeth layer of pop-up menus/modals, that hides all other content and can close the pop-up upon clicking it. As its name suggests shifts focus from the rest of the page to the pop-up.
function Backdrop({ setIsModalOpen }) {
  return (
    <div
      className="fixed h-svh w-full inset-0 backdrop-blur-sm"
      onClick={() => setIsModalOpen(false)}
    ></div>
  );
}

Backdrop.propTypes = {
  setIsModalOpen: PropTypes.func.isRequired,
};

export default Backdrop;
