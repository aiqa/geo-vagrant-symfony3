import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Create';
import ListItem from '@material-ui/core/ListItem';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';

const ItemsList = ({
  items,
  itemsConfig,
  classes,
  loading,
  handleEdit,
  handleDelete,
}) => {
  return (
    <Paper classes={{ root: classes.paper }}>
      <List
        disablePadding={false}
        classes={{
          root:
            itemsConfig.length === 1 ? classes.oneItemInRowList : classes.list,
        }}
      >
        {loading ? (
          <div className={classes.progressContainer}>
            <CircularProgress />
          </div>
        ) : (
          <Fragment>
            <ListItem classes={{ root: classes.listHeader }}>
              {itemsConfig.map(name => (
                <ListItemText
                  key={name}
                  classes={{
                    root:
                      itemsConfig.length === 1
                        ? classes.singleListItem
                        : classes.listItem,
                    primary: classes.listHeaderChild,
                  }}
                >
                  {name}
                </ListItemText>
              ))}

              <ListItemText
                classes={{
                  root: classes.listHeaderAction,
                  primary: classes.listHeaderChild,
                }}
              >
                actions
              </ListItemText>
            </ListItem>
            <Divider />
            <div className={classes.listOverflow}>
              {items.map(item => (
                <Fragment key={item.id}>
                  <ListItem classes={{ root: classes.listRow }}>
                    {itemsConfig.map(name => (
                      <ListItemText
                        primary={item[name]}
                        key={`item-${item.id}-${item[name]}`}
                        classes={{
                          root:
                            itemsConfig.length === 1
                              ? classes.singleListItem
                              : classes.listItem,
                        }}
                      />
                    ))}

                    <div>
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleEdit(item)}
                        classes={{ root: classes.buttonEdit }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(item.id)}
                        classes={{ root: classes.buttonDelete }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </ListItem>
                  <Divider light />
                </Fragment>
              ))}
            </div>
          </Fragment>
        )}
      </List>
    </Paper>
  );
};

ItemsList.displayName = 'ItemsList';

ItemsList.propTypes = {
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ItemsList;
