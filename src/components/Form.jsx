import PropTypes from "prop-types";

function Form({ children }) {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return <form onSubmit={handleSubmit}>{children}</form>;
}

Form.propTypes = {
  children: PropTypes.node.isRequired, // React node
};

export default Form;
