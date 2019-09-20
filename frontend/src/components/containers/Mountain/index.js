import { withStyles } from '@material-ui/core/styles';
import Mountain from './Mountain';

const styles = theme => ({
  container: {
    minHeight: 'calc(100vh - 120px)',
    display: 'flex',
    alignItems: 'center',
    flexFlow: 'column nowrap',
  },
  title: {
    marginTop: 20,
    marginBottom: 20,
  },
  formTitle: {
    marginLeft: 10,
    '@media screen and (max-width: 780px)': {
      marginLeft: 0,
      textAlign: 'center',
    },
  },
  paper: {
    padding: 80,
    marginBottom: 20,
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '@media screen and (max-width: 780px)': {
      flexDirection: 'column',
    },
  },
  input: {
    width: 200,
    marginLeft: 10,
    marginRight: 10,
    '@media screen and (max-width: 780px)': {
      marginTop: 10,
      marginBottom: 10,
    },
  },
  inputDialog: {
    width: 200,
    margin: 10,
  },
  button: {
    marginLeft: 10,
    marginRight: 10,
    color: theme.palette.primary.background,
    '@media screen and (max-width: 780px)': {
      marginTop: 10,
      marginBottom: 10,
    },
  },
  notFound: {
    marginTop: 20,
  },
  dialogTitle: {
    marginLeft: 10,
  },
  dialogAction: {
    paddingBottom: 20,
    marginRight: 20,
  },
});

export default withStyles(styles)(Mountain);
