import { useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useScreenSize } from "./contexts/ScreenSizeProvider";
import StarRating from "./StarRating";
import Button from "./button/button";

function Accordion({ product }) {
  const { isXS } = useScreenSize();
  const [accordionIndex, setAccordionIndex] = useState(1);

  const toggleAccordion = (index) => {
    setAccordionIndex(accordionIndex === index ? null : index);
  };

  function dateFormater(isoString) {
    const date = new Date(isoString);

    return date.toLocaleString();
  }

  return (
    <div
      className="product-detailed-info-container-accordion px-5 sm:px-10 lg:px-20 py-6 sm:py-8 lg:py-12 max-w-[1200px] mx-auto"
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
                obcaecati blanditiis totam itaque rerum delectus ducimus iste
                illum reiciendis.
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
                obcaecati blanditiis totam itaque rerum delectus ducimus iste
                illum reiciendis. Laboriosam aspernatur mollitia dignissimos
                temporibus molestias repudiandae sit consequatur quod. Quod!
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
              <motion.li
                key={"description-details"}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden w-10/12 lg:w-4/5"
              >
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Tempora obcaecati blanditiis totam itaque rerum delectus
                  ducimus iste illum reiciendis.
                </p>
              </motion.li>
            )}
            {accordionIndex === 2 && (
              <motion.li
                key={"additional-information-details"}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden w-10/12 lg:w-4/5"
              >
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Doloremque quod id quo obcaecati nulla dolore nemo quaerat
                  iure exercitationem nostrum explicabo corrupti voluptas
                  perspiciatis rerum magni in tempore laboriosam architecto, at
                  atque harum! Quo voluptatibus iure, illum ad maxime cum ipsum?
                  Dicta, repudiandae. Dignissimos voluptate quod quaerat saepe,
                  labore dolorem vero in consequuntur possimus quae quo dolorum
                  accusantium perspiciatis fuga voluptatem rem dolor quasi
                  assumenda explicabo, natus sunt illum molestiae. A, ratione,
                  itaque corporis enim voluptas necessitatibus consectetur
                  adipisci quos, corrupti tempore illo sint omnis blanditiis ea
                  in iure aspernatur eligendi aperiam? Ea suscipit corrupti
                  quidem, perferendis, incidunt temporibus iusto iure harum
                  delectus eius debitis officia explicabo? Accusantium adipisci
                  eum repellat atque est magnam ullam tempora similique
                  doloribus consequatur! Qui ipsam corrupti soluta dolore omnis
                  dolorum eius quidem quia sapiente quas fuga expedita excepturi
                  inventore, dolorem autem libero laudantium facilis aliquid.
                  Totam culpa eligendi veniam in esse? Architecto ea velit
                  deserunt inventore fugit ad neque, modi veritatis suscipit
                  fugiat alias facilis dolorum quam in obcaecati, eius saepe?
                  Molestias nihil, vero ab placeat voluptatum ad distinctio unde
                  provident quisquam inventore esse velit fuga, saepe labore
                  harum fugiat numquam nostrum iure ipsum quis? Reiciendis
                  deserunt natus possimus similique ipsam vel perspiciatis
                  laborum.
                </p>
              </motion.li>
            )}
            {accordionIndex === 3 && (
              <motion.li
                key={"reviews-details"}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden w-10/12 lg:w-4/5"
              >
                <ul>
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
              </motion.li>
            )}
          </ul>
        </>
      )}
    </div>
  );
}

Accordion.propTypes = {
  product: PropTypes.object.isRequired,
};

export default Accordion;