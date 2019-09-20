import React from 'react';
import PropTypes from 'prop-types';

const Form = ({ handleSubmit, children, classes }, props) => (
  <form onSubmit={handleSubmit} className={classes} {...props}>
    {children}
  </form>
);

Form.displayName = 'Form';

Form.defaultProps = {
  classes: null,
};

Form.propTypes = {
  classes: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Form;
