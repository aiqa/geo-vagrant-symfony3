import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import Footer from './components/presentional/Footer';
import TopBar from './components/presentional/TopBar';
import routerConfig from './configurations/routerConfig';

const styles = () => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    minHeight: 'calc(100vh - 65px)',
    fontFamily: 'Montserrat',
  },
});

const App = ({ classes }) => {
  return (
    <div>
      <TopBar />
      <div className={classes.container}>
        <Suspense fallback={<CircularProgress />}>
          <Switch>
            {routerConfig.map(({ path, exact, component }) => (
              <Route
                key={path}
                exact={exact}
                path={path}
                render={() => component}
              />
            ))}
          </Switch>
        </Suspense>
        <Footer />
      </div>
    </div>
  );
};

App.displayName = 'App';

App.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles, { withTheme: true })(App);
