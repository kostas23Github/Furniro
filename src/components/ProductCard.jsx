import { useState } from "react";
import PropTypes from "prop-types";
import { FaStar, FaShareAlt, FaCartArrowDown } from "react-icons/fa";
import { TbHeart } from "react-icons/tb";
import { LuArrowBigLeft, LuArrowBigRight } from "react-icons/lu";
import { IoCloseSharp } from "react-icons/io5";
import Button from "./button/Button";

function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [visibleSide, setVisibleSide] = useState("frontSide");
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div
      className="card-container w-full h-full flex flex-col border rounded-lg border-gray text-right relative hover:cursor-pointer"
      onMouseEnter={() => {
        if (visibleSide === "frontSide") setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Each product card has 2 sides. The front which shows the main product info and the back with more details & images. */}
      {visibleSide === "frontSide" && (
        <div className="card-frontSide grow flex flex-col">
          <div className="image-container relative p-4">
            <img
              className="w-full max-w-[285px] h-[301px] mx-auto"
              src={product.images[0]}
              alt={product.thumbnail}
            />
            <div className="absolute top-4 right-4 w-10 h-10 text-center leading-[38px] text-white rounded-full bg-red">
              -{Math.round(product.discountPercentage)}%
            </div>
          </div>
          <div className="card-info grow px-4 pb-6 bg-grey-200 rounded-b-lg">
            <div className="card-title">
              <h5 className="my-2">{product.title}</h5>
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
                >
                  <FaCartArrowDown />
                </Button>
                <Button
                  variant={"primary-reversed"}
                  extraStyles="px-4 py-2 mb-4"
                  onClick={(e) => {
                    e.stopPropagation(); // Won't bubble up the DOM tree, mainly its parent element which onClick -> setVisibleDetails(false), essentialy canceling this handler.
                    setVisibleSide("backSide");
                  }}
                >
                  Details
                </Button>
              </div>
              <div className="flex justify-between gap-4">
                <Button
                  variant={"link"}
                  extraStyles="flex gap-1 justify-between items-center"
                >
                  <FaShareAlt />
                  Share
                </Button>
                <Button
                  variant={"link"}
                  extraStyles="flex gap-1 justify-between items-center"
                >
                  <TbHeart />
                  Like
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
      {visibleSide === "backSide" && (
        <div className="card-backSide">
          <Button
            variant={"icon"}
            extraStyles="text-4xl block mx-auto p-2"
            titleText="Close details"
            onClick={() => setVisibleSide("frontSide")}
          >
            <IoCloseSharp />
          </Button>
          <div className="more-images-container relative p-4 flex justify-center items-center">
            <Button
              variant={"icon"}
              extraStyles="text-4xl"
              disabled={
                product.images.length === 1
              } /* Only one image exist so the buttons are not necessary. */
              titleText="Previous image"
              onClick={() => {
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
              disabled={product.images.length === 1}
              titleText="Next image"
              onClick={() => {
                if (product.images.length > 0) {
                  setActiveSlide((activeSlide + 1) % product.images.length);
                }
              }}
            >
              <LuArrowBigRight />
            </Button>
          </div>
          <div>
            <p className="text-center grow px-4 pb-6 bg-grey-200 rounded-b-lg">
              {product.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    discountPercentage: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
