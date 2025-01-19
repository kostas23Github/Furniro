import { Link } from "react-router";
import PropTypes from "prop-types";

function Links({ mobileStyles }) {
  return (
    <ul
      className={`flex justify-between items-center max-w-[230px] grow font-medium ${mobileStyles}`}
    >
      <li key={"Shop"}>
        <Link to="/shop">Shop</Link>
      </li>
      <li key={"About"}>
        <Link to="/about">About</Link>
      </li>
      <li key={"Contact"}>
        <Link to="/contact">Contact</Link>
      </li>
    </ul>
  );
}

Links.propTypes = {
  mobileStyles: PropTypes.string.isRequired,
}

export default Links;
