import { withStyles } from '@material-ui/core/styles';
import ItemsList from './ItemsList';

const styles = theme => ({
  paper: {
    padding: 0,
  },
  list: {
    minWidth: 700,
    maxWidth: 700,
    minHeight: 100,
    padding: 0,
  },
  oneItemInRowList: {
    minWidth: 480,
    maxWidth: 480,
    minHeight: 100,
    padding: 0,
  },
  progressContainer: {
    width: '100%',
    hight: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listHeader: {
    textTransform: 'capitalize',
  },
  listHeaderChild: {
    color: theme.palette.primary.main,
  },
  listRow: {
    '&:hover': {
      backgroundColor: '#f2f2f2',
    },
  },
  listItem: {
    '&:nth-child(1), &:nth-child(2)': {
      maxWidth: 284,
      width: 284,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
  singleListItem: {
    maxWidth: 360,
    width: 350,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  listOverflow: {
    overflowY: 'auto',
    overflowX: 'hidden',
    maxHeight: 420,
  },
  buttonEdit: {
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: `${theme.palette.primary.main}14`,
    },
  },
  buttonDelete: {
    '&:hover': {
      color: theme.palette.primary.warning,
      backgroundColor: `${theme.palette.primary.warning}14`,
    },
  },
});

export default withStyles(styles)(ItemsList);
