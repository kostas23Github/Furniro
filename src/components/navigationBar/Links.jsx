import { Link } from "react-router";
import PropTypes from "prop-types";
function Links({ items, placement, mobileStyles, onShowMenu }) {
  const ulClassValues =
    placement === "navBar"
      ? `flex justify-between gap-4 items-center font-medium ${mobileStyles}`
      : placement === "footer"
      ? ""
      : "";

  const linkClassValues = "hover:text-gray-500";
  const liClassValues = placement === "footer" ? "mb-2" : "";

  return (
    <ul className={ulClassValues}>
      {items.map((item) => (
        <li key={item} className={liClassValues}>
          <Link to={`/${item}`.toLowerCase()} className={linkClassValues} onClick={()=>onShowMenu(false)}>
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
  onShowMenu: PropTypes.func,
};

export default Links;
