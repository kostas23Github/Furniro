import Button from "../button/Button";
import { IoCloseSharp } from "react-icons/io5";
import PropTypes from "prop-types";
import Backdrop from "../Backdrop";

function FormModal({ setIsModalOpen, message }) {
  return (
    <>
      <Backdrop setIsModalOpen={setIsModalOpen}/>
      <div className="fixed top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 z-50 aspect-video bg-slate-100 px-6 py-4 ring ring-gold/60 rounded-md shadow-lg shadow-gold flex justify-between items-center gap-8">
        <span>{message}</span>
        <Button
          variant="icon"
          extraStyles="text-4xl block mx-auto p-2"
          tooltipOptions={{
            text: "Close",
            position: "bottom",
            distance: "100",
          }}
        >
          <IoCloseSharp onClick={() => setIsModalOpen(false)} />
        </Button>
      </div>
    </>
  );
}

FormModal.propTypes = {
  setIsModalOpen: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default FormModal;
