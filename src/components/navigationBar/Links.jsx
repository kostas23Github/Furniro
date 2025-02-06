import { Link } from "react-router";
import PropTypes from "prop-types";
function Links({ items, placement, mobileStyles }) {
  const ulClassValues =
    placement === "navBar"
      ? `flex justify-between items-center max-w-[230px] grow font-medium ${mobileStyles}`
      : placement === "footer"
      ? ""
      : "";

  const linkClassValues = "hover:text-gray-500";

  return (
    <ul className={ulClassValues}>
      {items.map((item) => (
        <li key={item}>
          <Link to={`/${item}`} className={linkClassValues}>
            {item}
          </Link>
        </li>
      ))}
    </ul>
  );
}

Links.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  placement: PropTypes.oneOf(["navBar", "footer"]).isRequired,
  mobileStyles: PropTypes.string,
};

export default Links;
