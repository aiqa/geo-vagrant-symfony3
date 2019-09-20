import { withStyles } from '@material-ui/core/styles';

import TopBar from './TopBar';

const styles = theme => ({
  container: {
    border: `1px solid ${theme.palette.primary.main}`,
  },
  appBar: {
    background: `${theme.palette.primary.background}`,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    height: '1.7rem',
    width: 'auto',
    marginLeft: -50,
    '@media screen and (max-width: 599px)': {
      marginLeft: 0,
    },
  },
  spacer: {
    '@media screen and (max-width: 599px)': {
      display: 'none',
    },
  },
  list: {
    width: 250,
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.contrastText,

    '&:link': {
      textDecoration: 'none',
    },

    '&:hover': {
      textDecoration: 'none',
      color: theme.palette.primary.main,
    },

    '&:visited': {
      textDecoration: 'none',
    },
  },
  activeLink: {
    color: theme.palette.primary.main,
  },
  activeLinkChild: {
    color: 'inherit',
  },
});

export default withStyles(styles)(TopBar);
