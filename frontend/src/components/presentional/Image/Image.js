import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ src, classes, alt }, props) => (
  <img src={src} alt={alt} className={classes} {...props} />
);

Image.displayName = 'Image';

Image.defaultProps = {
  classes: null,
};

Image.propTypes = {
  classes: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Image;
