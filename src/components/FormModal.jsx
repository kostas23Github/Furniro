import Button from "./button/button";
import { IoCloseSharp } from "react-icons/io5";
import PropTypes from "prop-types";
import Backdrop from "./Backdrop";

function FormModal({ modalOpen }) {
  return (
    <>
      <Backdrop onClickModal={modalOpen}/>
      <div className="fixed top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 z-50 aspect-video bg-slate-100 px-6 py-4 ring ring-gold/60 rounded-md shadow-lg shadow-gold flex justify-between items-center gap-8">
        <span>Your email is submitted.</span>
        <Button
          variant="icon"
          extraStyles="text-4xl block mx-auto p-2"
          tooltipOptions={{
            text: "Close",
            position: "bottom",
            distance: "100",
          }}
        >
          <IoCloseSharp onClick={() => modalOpen(false)} />
        </Button>
      </div>
    </>
  );
}

FormModal.propTypes = {
  modalOpen: PropTypes.func.isRequired,
};

export default FormModal;
