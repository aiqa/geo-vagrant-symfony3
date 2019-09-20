import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

import Image from '../Image';
import NavList from '../NavList';
import LogoHorizontal from '../../../assets/logo-horizontal.svg';

const TopBar = ({ classes }) => {
  const [isSideBarOpen, setState] = useState(false);
  const toggleDrawer = isOpen => setState(isOpen);

  return (
    <Fragment>
      <AppBar position="static" classes={{ root: classes.appBar }}>
        <Toolbar classes={{ root: classes.toolbar }}>
          <IconButton
            aria-label="Menu button"
            onClick={() => toggleDrawer(true)}
            classes={{ root: classes.menuButton }}
          >
            <MenuIcon />
          </IconButton>
          <Image
            src={LogoHorizontal}
            alt="AIQA - Logo horizontal"
            classes={classes.logo}
          />
          <div className={classes.spacer} />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="left"
        open={isSideBarOpen}
        onClose={() => toggleDrawer(false)}
      >
        <div
          tabIndex={0}
          role="button"
          onClick={() => toggleDrawer(false)}
          onKeyDown={() => toggleDrawer()}
        >
          <NavList classes={classes} />
        </div>
      </Drawer>
    </Fragment>
  );
};

TopBar.displayName = 'TopBar';

TopBar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default TopBar;
