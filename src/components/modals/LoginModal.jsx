import PropTypes from "prop-types";
import LoginForm from "../form/LoginForm";
import { useScreenSize } from "../contexts/ScreenSizeProvider";

function LoginModal({ isUserModalVisible }) {
  const { isXXS, isXS } = useScreenSize();

  if (isUserModalVisible === false) return null;

  return (
    <div
      className={`z-20 absolute ${isXXS ? "-left-0" : ""} ${
        !isXS ? "-left-36 max-w-[unset]" : "max-w-[1000%] "
      } top-10 w-80 h-max bg-slate-50 outline outline-2 outline-grey-300`}
    >
      <LoginForm isXS={isXS} />
    </div>
  );
}

LoginModal.propTypes = {
  isUserModalVisible: PropTypes.bool.isRequired,
};

export default LoginModal;
