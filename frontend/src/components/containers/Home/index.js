import { withStyles } from '@material-ui/core/styles';
import Home from './Home';

const styles = () => ({
  container: {
    minHeight: 'calc(100vh - 120px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexFlow: 'column nowrap',
  },
  link: {
    marginLeft: 3,
    marginRight: 3,
  },
});

export default withStyles(styles)(Home);
