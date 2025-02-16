// This component can display stars based on available rating value. It can also display partial stars, taking into account decimal rating values.

import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa";

function StarRating({ rating }) {
  const totalStars = Math.ceil(rating);
  return (
    <div className="flex gap-1 w-max">
      {Array.from({ length: totalStars }).map((_, index) => {
        const fillPercentage = Math.max(0, Math.min(1, rating - index)) * 100; // Limit from 0 to 100%

        return (
          <div key={index} className="relative w-6 h-6">
            <FaStar
              className="absolute text-yellow-300 w-full h-full overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - fillPercentage}% 0 0)` }} // Dynamically fill the star
            />
          </div>
        );
      })}
    </div>
  );
}

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default StarRating;
