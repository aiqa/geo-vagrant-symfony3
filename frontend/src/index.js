import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';

import './assets/favicon.ico';
import App from './App';

import theme from './configurations/theme';

ReactDOM.render(
  <Router>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={4}
        transitionDuration={{ exit: 380, enter: 400 }}
        autoHideDuration={3000}
      >
        <App />
      </SnackbarProvider>
    </MuiThemeProvider>
  </Router>,
  document.getElementById('root'),
);
