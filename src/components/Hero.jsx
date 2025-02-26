import PropTypes from "prop-types";

function Hero({ ancestors, currentPage, hasImage }) {
  return (
    <div
      style={{
        backgroundImage: `url(${hasImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <ul className={`${hasImage ? "h-36" : "min-h-24"} flex gap-2 justify-center items-center flex-wrap px-5 sm:px-10 lg:px-20 py-6 sm:py-8 lg:py-12`}>
        {ancestors.map((ancestor, index) => (
          <li key={index} className="after:content-['>'] after:ps-2">
            {ancestor}
          </li>
        ))}
        <li className="font-bold">{currentPage}</li>
      </ul>
    </div>
  );
}

Hero.propTypes = {
  ancestors: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentPage: PropTypes.string.isRequired,
  hasImage: PropTypes.string,
};

export default Hero;
