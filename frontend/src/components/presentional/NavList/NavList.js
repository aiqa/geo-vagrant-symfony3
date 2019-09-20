import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import routes from './NavList.config';

const NavList = ({ classes }) => {
  return (
    <div className={classes.list}>
      <List>
        <ListItem>
          <Typography align="center" color="primary" variant="h5">
            Geography
          </Typography>
        </ListItem>
      </List>
      <Divider />
      <List>
        {routes.map(({ name, path, icon }) => (
          <NavLink
            exact
            key={name}
            to={path}
            className={classes.link}
            activeClassName={classes.activeLink}
          >
            <ListItem button aria-label={name}>
              <ListItemIcon classes={{ root: classes.activeLinkChild }}>
                {icon}
              </ListItemIcon>
              <ListItemText
                primary={name}
                classes={{ root: classes.activeLinkChild }}
              />
            </ListItem>
          </NavLink>
        ))}
      </List>
    </div>
  );
};

NavList.displayName = 'NavList';

NavList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default NavList;
