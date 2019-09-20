import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2BB673',
      background: '#ffffff',
      contrastText: '#424243',
      warning: '#F05A28',
      dividers: '#e5e5e5',
    },
    secondary: {
      main: '#2BB673',
      background: '#ffffff',
      contrastText: '#989898',
    },
    lightGrey: {
      main: '#bfc1c4',
    },
    background: {
      default: '#fbfbfb',
    },
  },
  spacing: {
    unit: 8,
  },
  typography: {
    fontSize: 12,
    useNextVariants: true,
    fontFamily: 'Montserrat',
  },
});

export default theme;
