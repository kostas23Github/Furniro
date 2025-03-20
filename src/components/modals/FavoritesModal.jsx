import { useContext } from "react";
import PropTypes from "prop-types";
import { useScreenSize } from "../contexts/ScreenSizeProvider";
import FavoritesContext from "../contexts/FavoritesContext";
import { FaTrash } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
import Button from "../button/button";
import CartContext from "../contexts/CartContext";

function FavoritesModal({ isFavoritesModalVisible }) {
  const { isXXS, isXS } = useScreenSize();
  const { favorites, removeFromFavorites } = useContext(FavoritesContext);
  const { cart, updateCart } = useContext(CartContext);

  function cartHasThisFavoriteItem(favoritesItem) {
    // Returns boolean!
    return cart.some((cartItem) => {
      return cartItem.id === favoritesItem.id;
    });
  }

  if (isFavoritesModalVisible === false) return null;

  return (
    <div
      className={`py-4 px-4 z-20 absolute ${isXXS ? "-left-24" : "-left-36"} ${
        !isXS ? "-left-60 max-w-[unset]" : "max-w-[1000%]"
      } top-10 w-80 h-max bg-slate-50 dark:bg-slate-800 outline outline-1 outline-grey-300`}
    >
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((favoritesItem) => (
            <li
              key={favoritesItem.id}
              className="pb-3 md:pb-5 mb-5 md:mb-9 border-b-2 border-grey-300 text-center"
            >
              <div className="flex justify-between mb-2 md:mb-5">
                <img
                  src={favoritesItem.images[0]}
                  className="bg-gold-light-3 w-3/5"
                />
                <div className="sm:grow my-3 flex flex-col justify-evenly items-center">
                  <Button
                    variant={"primary-reversed"}
                    extraStyles="px-4 py-2 mb-4"
                    tooltipOptions={{
                      text: "Add to cart",
                      position: "top",
                      distance: "150",
                    }}
                    disabled={cartHasThisFavoriteItem(favoritesItem)}
                    handleClick={() => {
                      updateCart(favoritesItem, "increment", +1);
                    }}
                  >
                    <FaCartArrowDown />
                  </Button>
                  <FaTrash
                    className="text-gold cursor-pointer"
                    onClick={() => removeFromFavorites(favoritesItem.id)}
                  />
                </div>
              </div>
              <p className="md:text-xl xl:text-2xl">{favoritesItem.title}</p>
              <p>{favoritesItem.price} €</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="px-3 py-2">Hey, your list is empty!</p>
      )}
    </div>
  );
}

FavoritesModal.propTypes = {
  isFavoritesModalVisible: PropTypes.bool.isRequired,
};

export default FavoritesModal;
