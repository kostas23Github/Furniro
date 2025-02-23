import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";
import { ProductsContext } from "../../components/contexts/ProductsContext";
import Loading from "../../components/loadingAnimation/Loading";
import ErrorPage from "./ErrorPage";
import StarRating from "../../components/StarRating";
import useHover from "../../components/hooks/useHover";
import Tooltip from "../../components/button/tooltip";
import Button from "../../components/button/Button";
import { useScreenSize } from "../../components/contexts/ScreenSizeProvider";

function SingleProduct() {
  const { productId } = useParams();
  const { products, loading, error } = useContext(ProductsContext);
  const { isXS } = useScreenSize();
  const [hoverRef, isHovered] = useHover();
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [productBgColor, setProductBgColor] = useState("gold");
  const [accordionIndex, setAccordionIndex] = useState(1);

  if (loading) return <Loading />;
  if (error) return <ErrorPage />; // Add a message here.

  const product = products.find((p) => p.id === Number(productId));

  if (!product) return <ErrorPage />; // Add a message here.

  const images = product.images;
  const hasImages = images.length > 1;

  const toggleAccordion = (index) => {
    setAccordionIndex(accordionIndex === index ? null : index);
  };

  function dateFormater(isoString) {
    const date = new Date(isoString);

    return date.toLocaleString();
  }

  return (
    <div>
      <ul className="bg-gold-light-3 min-h-24 flex gap-2 justify-center items-center flex-wrap px-5 sm:px-10 lg:px-20 py-6 sm:py-8 lg:py-12">
        <li className="after:content-['>'] after:ps-2">Home</li>
        <li className="after:content-['>'] after:ps-2">Shop</li>
        <li className="font-bold">{product.title}</li>
      </ul>
      <div className="product-hero-container px-5 sm:px-10 lg:px-20 py-6 sm:py-8 lg:py-12 grid grid-cols-1 md:grid-cols-2 gap-11">
        <div className="images-container grid grid-cols-[76px_1fr] gap-8">
          {hasImages && (
            <div className="grid self-start gap-8">
              {images.map(
                (image, index) =>
                  index !== currentImgIndex && (
                    <img
                      key={index}
                      src={image}
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
            className={`bg-${productBgColor} rounded-lg shrink w-full max-w-[423px] aspect-[0.846]`}
          />
        </div>
        <div className="product-info-container md:py-6">
          <p className="text-3xl w-max mb-3 md:mb-5">{product.title}</p>
          <p className="w-max">{product.price}€</p>
          <div className="flex items-center my-3">
            <StarRating rating={product.rating} />
            <p className="ms-2 ps-4 me-2 text-grey-400 border-l-2 border-grey-200">
              {product.reviews.length}
            </p>
            <p className="text-grey-400">Customer Reviews</p>
          </div>
          <div>
            <p>{product.description}</p>
          </div>
          <div ref={hoverRef} className="w-max relative my-4">
            <p className="text-grey-400 mb-2">Color</p>
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
            {isHovered && (
              <Tooltip text="Set bg color" position="bottom" distance="120" />
            )}
          </div>
          <div className="flex gap-4 md:gap-6 lg:gap-8">
            <div className="cart-actions-container flex justify-between w-[106px] md:w-[130px] lg:w-[150px] outline outline-2 outline-gray-800 rounded-lg px-3 py-2 md:px-5 md:py-4 hover:bg-gold-light-2">
              <Button variant="text">-</Button>
              <p>1</p>
              <Button variant="text">+</Button>
            </div>
            <Button
              variant="secondary-reversed"
              extraStyles="w-[106px] md:w-[130px] lg:w-[150px] px-3 py-2 rounded-lg"
            >
              Add to Cart
            </Button>
          </div>
          <hr className="my-8 lg:my-12" />
          <div className="extra-info text-grey-400">
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
                <div className="flex">
                  <FaFacebook className="text-grey-700 text-[21px]" />
                  <AiFillInstagram className="text-grey-700 text-[21px]" />
                  <FaSquareXTwitter className="text-grey-700 text-[21px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`product-detailed-info-container-accordion px-5 sm:px-10 lg:px-20 py-6 sm:py-8 lg:py-12`}
      >
        {isXS ? (
          <ul className="accordion-details-mobile relative">
            <li key={"description-details"} className="">
              <div className="">
                <Button
                  variant="icon"
                  extraStyles={`my-2 ${
                    accordionIndex === 1 && "font-bold text-black"
                  }`}
                  onClick={() => toggleAccordion(1)}
                >
                  Description
                </Button>
                <p
                  className={`left-0 overflow-hidden ${
                    accordionIndex === 1
                      ? "max-h-[300px] transition-all duration-500"
                      : "max-h-0"
                  }`}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Tempora obcaecati blanditiis totam itaque rerum delectus
                  ducimus iste illum reiciendis.
                </p>
              </div>
            </li>
            <li key={"additional-information-details"} className="">
              <div className="">
                <Button
                  variant="icon"
                  extraStyles={`my-2 ${
                    accordionIndex === 2 && "font-bold text-black"
                  }`}
                  onClick={() => toggleAccordion(2)}
                >
                  Additional Information
                </Button>
                <p
                  className={`left-0 overflow-hidden ${
                    accordionIndex === 2
                      ? "max-h-[300px] transition-all duration-500"
                      : "max-h-0"
                  }`}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Tempora obcaecati blanditiis totam itaque rerum delectus
                  ducimus iste illum reiciendis. Laboriosam aspernatur mollitia
                  dignissimos temporibus molestias repudiandae sit consequatur
                  quod. Quod!
                </p>
              </div>
            </li>
            <li key={"reviews-details"}>
              <div className="">
                <Button
                  variant="icon"
                  extraStyles={`my-2 ${
                    accordionIndex === 3 && "font-bold text-black"
                  }`}
                  onClick={() => toggleAccordion(3)}
                >
                  Reviews [{product.reviews.length}]
                </Button>
              </div>
              {/* Max-h should have an arbitrary large value so that no content overflows, mainly the reviews section. */}
              <ul
                className={`left-0 overflow-hidden ${
                  accordionIndex === 3
                    ? "max-h-[1000px] transition-all duration-500"
                    : "max-h-0"
                }`}
              >
                {product.reviews.map((review, index) => (
                  <li
                    key={index}
                    className="mb-5 px-6 py-4 w-full border border-grey-200 rounded-md"
                  >
                    <StarRating rating={review.rating} />
                    <div className="flex gap-3 mt-1 mb-5">
                      <p>{review.reviewerName}</p>
                      <p>{dateFormater(review.date)}</p>
                    </div>
                    <p>{review.comment}</p>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        ) : (
          <>
            <ul className="accordion-header-buttons sm:flex sm:justify-evenly">
              <li key={"description-details"} className="w-1/3 text-center">
                <Button
                  variant="icon"
                  extraStyles={`my-2 ${
                    accordionIndex === 1 && "font-bold text-black"
                  }`}
                  onClick={() => toggleAccordion(1)}
                >
                  Description
                </Button>
              </li>
              <li
                key={"additional-information-details"}
                className="w-1/3 text-center"
              >
                <Button
                  variant="icon"
                  extraStyles={`my-2 ${
                    accordionIndex === 2 && "font-bold text-black"
                  }`}
                  onClick={() => toggleAccordion(2)}
                >
                  Additional Information
                </Button>
              </li>
              <li key={"reviews-details"} className="w-1/3 text-center">
                <Button
                  variant="icon"
                  extraStyles={`my-2 ${
                    accordionIndex === 3 && "font-bold text-black"
                  }`}
                  onClick={() => toggleAccordion(3)}
                >
                  Reviews [{product.reviews.length}]
                </Button>
              </li>
            </ul>
            <ul className="accordion-details sm:flex sm:justify-evenly w-full mt-4">
              {accordionIndex === 1 && (
                <li key={"description-details"}>
                  <p
                    className={`left-0 overflow-hidden ${
                      accordionIndex === 1
                        ? "max-h-[300px] transition-all duration-500"
                        : "max-h-0"
                    }`}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Tempora obcaecati blanditiis totam itaque rerum delectus
                    ducimus iste illum reiciendis.
                  </p>
                </li>
              )}
              {accordionIndex === 2 && (
                <li key={"additional-information-details"} className="">
                  <p
                    className={`left-0 overflow-hidden ${
                      accordionIndex === 2
                        ? "max-h-[300px] transition-all duration-500"
                        : "max-h-0"
                    }`}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Tempora obcaecati blanditiis totam itaque rerum delectus
                    ducimus iste illum reiciendis. Laboriosam aspernatur
                    mollitia dignissimos temporibus molestias repudiandae sit
                    consequatur quod. Quod!
                  </p>
                </li>
              )}
              {accordionIndex === 3 && (
                <li key={"reviews-details"} className="w-full">
                  <ul className="transition-max-h duration-300">
                    {product.reviews.map((review, index) => (
                      <li
                        key={index}
                        className="mb-5 px-6 py-4 w-full border border-grey-200 rounded-md"
                      >
                        <StarRating rating={review.rating} />
                        <div className="flex gap-3 mt-1 mb-5">
                          <p>{review.reviewerName}</p>
                          <p>{dateFormater(review.date)}</p>
                        </div>
                        <p>{review.comment}</p>
                      </li>
                    ))}
                  </ul>
                </li>
              )}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default SingleProduct;
