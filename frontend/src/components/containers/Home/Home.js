import React from 'react';
import PropTypes from 'prop-types';

import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const Home = ({ classes }) => (
  <div className={classes.container}>
    <Typography variant="h5">HOME PAGE</Typography>
    <Typography variant="body1">
      This SPA app was created by
      <Link
        color="primary"
        target="_blank"
        rel="noopener"
        href="https://aiqa.tech"
        classes={{ root: classes.link }}
      >
        AIQA
      </Link>
      to show you a usecase of our product.
    </Typography>
  </div>
);

Home.displayName = 'Home';

Home.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Home;
