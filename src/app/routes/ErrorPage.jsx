import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

function ErrorPage({ message }) {
  const location = useLocation();  // Get the current URL path

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>404 - Page Not Found</h1>
      <p>{message || "Oops! The page you're looking for doesn't exist."}</p>
      <p><strong>Attempted URL:</strong> {location.pathname}</p>
    </div>
  );
}

ErrorPage.propTypes = {
  message: PropTypes.string,
}

export default ErrorPage;
