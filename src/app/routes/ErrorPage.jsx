import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

function ErrorPage({ defaultMessage = "Oops! Something went wrong." }) {
  const { state, pathname } = useLocation();  // Get the current URL path

  const errorMessage = state?.message || defaultMessage;
  

  return (
    <div className="text-center p-5 min-h-80 md:min-h-fit">
      <p className="my-5 text-6xl">Error</p>
      <p className="my-2">{errorMessage}</p>
      <p><strong>Attempted URL:</strong> <u>{pathname}</u></p>
    </div>
  );
}

ErrorPage.propTypes = {
  defaultMessage: PropTypes.string,
}

export default ErrorPage;
