import React from 'react';
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const Footer = ({ classes }) => (
  <footer className={classes.container}>
    <Typography>
      MIT License. <br />
      Created by
      <Link
        color="primary"
        target="_blank"
        rel="noopener"
        href="https://aiqa.tech"
        classes={{ root: classes.link }}
      >
        AIQA
      </Link>
    </Typography>
  </footer>
);

Footer.displayName = 'Footer';

Footer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Footer;
