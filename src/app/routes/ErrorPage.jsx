import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

function ErrorPage({ message }) {
  const location = useLocation();  // Get the current URL path

  return (
    <div className="text-center p-5 min-h-80 md:min-h-fit">
      <h1 className="my-5">404 - Page Not Found</h1>
      <p className="my-2">{message || "Oops! The page you're looking for doesn't exist."}</p>
      <p><strong>Attempted URL:</strong> <u>{location.pathname}</u></p>
    </div>
  );
}

ErrorPage.propTypes = {
  message: PropTypes.string,
}

export default ErrorPage;
