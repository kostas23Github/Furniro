import { useState } from "react";
import { LuArrowBigRight } from "react-icons/lu";
import PropTypes from "prop-types";
import Button from "./button/Button";
import { useScreenSize } from "./contexts/ScreenSizeProvider";

function Carousel({ items }) {
  const [activeCard, setActiveCard] = useState(0);
  const { isXXS } = useScreenSize();

  function carouselActions(currentIndex) {
    if (isXXS) {
      return currentIndex === activeCard ? "max-w-full" : "hidden";
    }

    let className = "shrink-0 basis-72";

    if (currentIndex === activeCard) {
      className += " scale-100";
    } else {
      className += " scale-75";
    }

    if (currentIndex < activeCard) {
      className +=
        " invisible opacity-0 pointer-events-none transition-invisible";
    }

    return className;
  }

  return (
    <div className="carousel-and-btn-container relative overflow-hidden">
      <div
        className="carousel-container relative flex items-center gap-8 transition-transform duration-300"
        style={{
          transform: !isXXS ? `translateX(-${(activeCard % items.length) * 320}px)` : null,
        }}
      >
        {items.map((product, index) => (
          <div
            key={index}
            className={`${carouselActions(index)} my-8 bg-grey-200/90 transition-transform duration-300 delay-100`}
          >
            <img
              src={product.images[0]}
              className="aspect-[0.77] drop-shadow-2xl"
            />
          </div>
        ))}
      </div>
      <Button
        variant="primary-reversed"
        extraStyles={`text-4xl absolute ${isXXS ? "right-3 top-1/2 -translate-y-1/2" : "bottom-9 left-[360px]"} border border-gold rounded-3xl p-1`}
        tooltipOptions={{
          text: "Next product",
          position: "left",
          distance: "150",
        }}
        onClick={() => setActiveCard((activeCard + 1) % items.length)}
      >
        <LuArrowBigRight />
      </Button>
    </div>
  );
}

Carousel.propTypes = {
  items: PropTypes.array.isRequired,
};

export default Carousel;
