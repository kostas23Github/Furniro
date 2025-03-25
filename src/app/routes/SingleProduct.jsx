import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { IoLogoFacebook } from "react-icons/io";
import { IoLogoTwitter } from "react-icons/io";
import { IoLogoInstagram } from "react-icons/io";
import ProductsContext from "../../components/contexts/ProductsContext";
import Loading from "../../components/loadingAnimation/Loading";
import ErrorPage from "./ErrorPage";
import StarRating from "../../components/StarRating";
import useHover from "../../components/hooks/useHover";
import Tooltip from "../../components/button/tooltip";
import Button from "../../components/button/Button";
import Accordion from "../../components/Accordion";
import Hero from "../../components/Hero";
import shopHeroBg from "../../assets/images/hero-bg/Shop-hero-bg.png";
import CartContext from "../../components/contexts/CartContext";
import useIsTouchDevice from "../../components/hooks/useIsTouchDevice";

function SingleProduct() {
  const { productId } = useParams();
  const { products, loading, error } = useContext(ProductsContext);
  const isTouchDevice = useIsTouchDevice();
  const [hoverRef, isHovered] = useHover();
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [productBgColor, setProductBgColor] = useState("gold");
  const { cart, updateCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  if (loading) return <Loading />;

  // Find the currently displayed product among all products.
  const product = products.find((p) => p.id === Number(productId));

  if (error || !product) return <ErrorPage />; // Add a message here.

  const images = product.images;
  const hasImages = images.length > 0;

  // Find the currently displayed product among all cart products. If absent get the currently displayed product.
  const cartItem = cart.find((p) => p.id === Number(productId)) || product;

  // Add a limiter to the quantity based on available stock.
  function handleQuantity(by) {
    return setQuantity((prevQuantity) => {
      if (by === -1) {
        if (prevQuantity > 1) {
          return prevQuantity - 1;
        } else {
          return prevQuantity;
        }
      } else if (by === +1) {
        if (prevQuantity === product.stock) {
          return prevQuantity;
        } else {
          return prevQuantity + 1;
        }
      } else {
        return prevQuantity;
      }
    });
  }

  return (
    <div>
      <Hero
        ancestors={["Home", "Shop"]}
        currentPage={product.title}
        hasImage={shopHeroBg}
      />
      <div className="product-hero-container px-5 sm:px-10 lg:px-20 py-6 sm:py-8 lg:py-12 grid grid-cols-1 md:grid-cols-2 gap-11 max-w-[1200px] mx-auto">
        <div className="images-container grid grid-cols-[76px_1fr] gap-8">
          {hasImages && (
            <div className="grid self-start gap-8">
              {images.map(
                (image, index) =>
                  index !== currentImgIndex && (
                    <img
                      key={index}
                      src={image}
                      loading="lazy"
                      className="bg-gold-light-2 hover:bg-gold-light-3 rounded-sm w-[76px] h-20 cursor-pointer"
                      onClick={() => setCurrentImgIndex(index)}
                    />
                  )
              )}
            </div>
          )}
          <img
            src={images[currentImgIndex]}
            alt={product.title}
            loading="lazy"
            className={`bg-${productBgColor} rounded-lg shrink w-full max-w-[350px] aspect-[0.846]`}
          />
        </div>
        <div className="product-info-container md:py-6">
          <p className="text-3xl w-max mb-3 md:mb-5">{product.title}</p>
          <p className="w-max">{product.price}€</p>
          <div className="flex items-center my-3">
            <StarRating rating={product.rating} />
            <p className="ms-2 ps-4 me-2 text-grey-400 dark:text-grey-100 border-l-2 border-grey-200">
              {product.reviews.length}
            </p>
            <p className="text-grey-400 dark:text-grey-100">Customer Reviews</p>
          </div>
          <div>
            <p>{product.description}</p>
          </div>
          <div ref={hoverRef} className="w-max relative my-4">
            <p className="text-grey-400 dark:text-grey-100 mb-2">Color</p>
            <div className="flex gap-2 lg:gap-3">
              <div
                className="bg-purple-600 w-8 h-8 rounded-full cursor-pointer"
                onClick={() => setProductBgColor("purple-600")}
              ></div>
              <div
                className="bg-slate-800 w-8 h-8 rounded-full cursor-pointer"
                onClick={() => setProductBgColor("slate-800")}
              ></div>
              <div
                className="bg-gold w-8 h-8 rounded-full cursor-pointer"
                onClick={() => setProductBgColor("gold")}
              ></div>
            </div>
            {!isTouchDevice && isHovered && (
              <Tooltip text="Set bg color" position="bottom" distance="120" />
            )}
          </div>
          <div className="flex gap-4 md:gap-6 lg:gap-8">
            <div className="cart-actions-container flex justify-between w-[106px] md:w-[130px] lg:w-[150px] outline outline-2 outline-grey-800 dark:outline-grey-100 rounded-lg px-3 py-2 md:px-5 md:py-4">
              <Button variant="text" handleClick={() => handleQuantity(-1)}>
                -
              </Button>
              <span>{quantity}</span>
              <Button variant="text" handleClick={() => handleQuantity(+1)}>
                +
              </Button>
            </div>
            <Button
              variant="secondary-reversed"
              extraStyles="w-[106px] md:w-[130px] lg:w-[150px] px-3 py-2 rounded-lg"
              handleClick={() => updateCart(cartItem, "increment", quantity)}
              addedToCartState={true}
            >
              Add to Cart
            </Button>
          </div>
          <hr className="my-8 lg:my-12" />
          <div className="extra-info text-grey-400 dark:text-grey-100">
            <div className="flex mb-1">
              <p className="w-32">SKU</p>
              <div className="flex">
                <span className="me-3">:</span>
                <span>{product.sku}</span>
              </div>
            </div>
            <div className="flex mb-1">
              <p className="w-32">Category</p>
              <div className="flex">
                <span className="me-3">:</span>
                <span>{product.category}</span>
              </div>
            </div>
            <div className="flex mb-1">
              <p className="w-32">Tags</p>
              <div>
                <span className="me-3">:</span>
                {product.tags.map((tag, index) => (
                  <span key={index}>
                    {tag}
                    {index < product.tags.length - 1 && ", "}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex mb-1">
              <p className="w-32">Share</p>
              <div className="flex items-center">
                <span className="me-3">:</span>
                <div className="text-grey-700 dark:text-grey-200 flex gap-2">
                  <IoLogoFacebook className="text-3xl p-1 rounded-sm w-max bg-grey-200 hover:bg-blue-500 hover:text-slate-50 dark:text-black" />
                  <IoLogoInstagram className="text-3xl p-1 rounded-sm w-max bg-grey-200 hover:bg-instagram hover:text-slate-50 dark:text-black" />
                  <IoLogoTwitter className="text-3xl p-1 rounded-sm w-max bg-grey-200 hover:bg-sky-500 hover:text-slate-50 dark:text-black" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Accordion product={product} />
    </div>
  );
}

export default SingleProduct;
