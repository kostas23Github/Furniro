import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { FaStar, FaCartArrowDown } from "react-icons/fa";
import { TbHeart, TbHeartFilled } from "react-icons/tb";
import { LuArrowBigLeft, LuArrowBigRight } from "react-icons/lu";
import { IoCloseSharp } from "react-icons/io5";
import Button from "./button/button";
import useHover from "./hooks/useHover";
import CartContext from "./contexts/CartContext";
import FavoritesContext from "./contexts/FavoritesContext";
import AuthContext from "./contexts/AuthContext";

const ProductCard = ({ product }) => {
  const { user } = useContext(AuthContext);
  const { favorites, addToFavorites, removeFromFavorites } =
    useContext(FavoritesContext);
  const { cart, updateCart } = useContext(CartContext);
  const [hoverRef, isHovered] = useHover();
  const [visibleSide, setVisibleSide] = useState("frontSide");
  const [activeSlide, setActiveSlide] = useState(0);

  const isFavorite = favorites.some((fav) => fav.id === product.id);

  function handleFavorites(e) {
    e.preventDefault();
    isFavorite ? removeFromFavorites(product.id) : addToFavorites(product);
  }

  const cartQuantity =
    cart.find((item) => item.id === product.id)?.quantity || 0;

  return (
    <div
      ref={hoverRef}
      className="card-container w-full h-full flex flex-col border rounded-lg border-gray text-right relative hover:cursor-pointer"
    >
      {/* Each product card has 2 sides. The front, which shows the main product info and the back, with more details & images. */}
      {visibleSide === "frontSide" && (
        <div className="card-frontSide grow flex flex-col">
          <div className="image-container relative p-4">
            <img
              className="w-full max-w-[285px] h-[301px] mx-auto"
              src={product.images[0]}
              alt={product.thumbnail}
              loading="lazy"
            />
            <div className="absolute top-4 right-4 w-10 h-10 text-center leading-[38px] text-white rounded-full bg-red">
              -{Math.round(product.discountPercentage)}%
            </div>
            {product.stock - cartQuantity < 2 && (
              <div className="absolute top-10 left-10 text-center text-white rounded-full bg-red px-6 py-4 -rotate-12">
                {product.stock - cartQuantity === 1 ? (
                  <p>Last Item</p>
                ) : product.stock - cartQuantity === 0 ? (
                  <p className="">Out of stock</p>
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
          <div className="card-info grow px-4 py-6 bg-gold-light-3 rounded-b-lg">
            <div className="card-title">
              <h5 className="mb-2">{product.title}</h5>
              <p>{product.brand}</p>
            </div>
            <div className="card-values">
              <div className="card-price">
                <p>
                  <b>{product.price}€</b> from{" "}
                  {Math.round(
                    product.price / ((100 - product.discountPercentage) / 100)
                  )}
                  €
                </p>
              </div>
              <div className="card-rating flex justify-end items-center gap-1">
                <p>{product.rating} / 5</p>
                <FaStar className="text-yellow-200" />
              </div>
            </div>
          </div>
          {isHovered && (
            <div className="card-frontSide-hovered absolute top-0 left-0 z-10 bg-grey-800/75 rounded-lg w-full h-full flex flex-col justify-center items-center">
              <div className="action-btns flex gap-3">
                <Button
                  variant={"primary-reversed"}
                  extraStyles="px-4 py-2 mb-4"
                  tooltipOptions={{
                    text: "Add to cart",
                    position: "top",
                    distance: "150",
                  }}
                  disabled={
                    product.stock === 0 || cartQuantity >= product.stock
                  }
                  handleClick={(e) => {
                    e.preventDefault();
                    updateCart(product, "increment", +1);
                  }}
                >
                  <FaCartArrowDown />
                </Button>
                <Button
                  variant={"primary-reversed"}
                  extraStyles="px-4 py-2 mb-4"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation(); // Won't bubble up the DOM tree, mainly its parent element which onClick -> setVisibleDetails(false), essentialy canceling this handler.
                    setVisibleSide("backSide");
                  }}
                >
                  Details
                </Button>
              </div>
              {/* Add 2 states to this button, toggle favorites */}
              <Button
                variant={"link"}
                extraStyles="flex gap-1 justify-between items-center"
                disabled={product.stock === 0}
                onClick={(e) => handleFavorites(e)}
              >
                {user ? (
                  isFavorite ? (
                    <TbHeartFilled className="text-rose-600" />
                  ) : (
                    <TbHeart />
                  )
                ) : (
                  <TbHeart
                    onClick={() =>
                      alert(
                        "You must first login to be able to add products to your favorites list!"
                      )
                    }
                  />
                )}
                Add to Favorites
              </Button>
            </div>
          )}
        </div>
      )}
      {visibleSide === "backSide" && (
        <div className="card-backSide">
          <Button
            variant={"icon"}
            extraStyles="text-4xl block mx-auto p-2"
            tooltipOptions={{
              text: "Close",
              position: "bottom",
              distance: "100",
            }}
            onClick={(e) => {
              e.preventDefault();
              setVisibleSide("frontSide");
            }}
          >
            <IoCloseSharp />
          </Button>
          <div className="more-images-container p-4 flex justify-center items-center">
            <Button
              variant={"icon"}
              extraStyles="text-4xl"
              disabled={
                product.images.length === 1
              } /* Only one image exist so the buttons are not necessary. */
              tooltipOptions={{
                text: "Previous page",
                position: "right",
                distance: "150",
              }}
              onClick={(e) => {
                e.preventDefault();
                setActiveSlide(
                  activeSlide === 0
                    ? product.images.length - 1
                    : activeSlide - 1
                );
              }}
            >
              <LuArrowBigLeft />
            </Button>
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`slide-${index} w-full max-w-[285px] h-[301px] mx-auto ${
                  activeSlide === index ? "flex" : "hidden"
                }`}
              >
                <img src={image} alt={product.thumbnail} />
              </div>
            ))}
            <Button
              variant={"icon"}
              extraStyles="text-4xl"
              tooltipOptions={{
                text: "Next page",
                position: "left",
                distance: "150",
              }}
              disabled={product.images.length === 1}
              onClick={(e) => {
                e.preventDefault();
                if (product.images.length > 0) {
                  setActiveSlide((activeSlide + 1) % product.images.length);
                }
              }}
            >
              <LuArrowBigRight />
            </Button>
          </div>
          <div>
            <p className="text-center grow px-4 py-6 bg-gold-light-3 rounded-b-lg">
              {product.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    discountPercentage: PropTypes.number.isRequired,
    stock: PropTypes.number,
    rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    brand: PropTypes.string,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
