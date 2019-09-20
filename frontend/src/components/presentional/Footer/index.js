import { withStyles } from '@material-ui/core/styles';
import Footer from './Footer';

const styles = () => ({
  container: {
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    textAlign: 'center',
  },
  link: {
    marginLeft: 3,
  },
});

export default withStyles(styles)(Footer);
