import PropTypes from "prop-types";
import { useScreenSize } from "../contexts/ScreenSizeProvider";

function FavoritesModal({ isFavoritesModalVisible }) {
  const { isXXS, isXS } = useScreenSize();

  if (isFavoritesModalVisible === false) return null;

  return (
    <div
      className={`z-20 absolute ${isXXS ? "-left-20" : ""} ${
        !isXS ? "-left-36 max-w-[unset]" : "max-w-[1000%] "
      } top-10 w-80 h-max bg-slate-50 outline outline-2 outline-grey-300`}
    >
      Hello
    </div>
  );
}

FavoritesModal.propTypes = {
  isFavoritesModalVisible: PropTypes.bool.isRequired,
};

export default FavoritesModal;
