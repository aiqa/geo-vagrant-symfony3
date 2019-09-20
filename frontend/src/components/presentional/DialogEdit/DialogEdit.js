import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

const DialogEdit = ({
  open,
  handleClose,
  classes,
  handleEdit,
  handleChange,
  firstValue,
  secondValue,
  formsConfig,
}) => {
  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleEdit();
      handleClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle
        id="form-dialog-title"
        classes={{ root: classes.dialogTitle }}
      >
        Edit entry
      </DialogTitle>
      <DialogContent>
        {formsConfig.map((field, index) => (
          <TextField
            key={field.id}
            type={field.type}
            id={field.id}
            name={field.name}
            label={field.label}
            value={index === 0 ? firstValue : secondValue}
            classes={{ root: classes.inputDialog }}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        ))}
      </DialogContent>
      <DialogActions classes={{ root: classes.dialogAction }}>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          aria-label="submit-edit"
          onClick={() => {
            handleEdit();
            handleClose();
          }}
          classes={{ root: classes.button }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DialogEdit.displayName = 'DialogEdit';

DialogEdit.defaultProps = {
  secondValue: null,
};

DialogEdit.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  firstValue: PropTypes.string.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  formsConfig: PropTypes.arrayOf(PropTypes.object).isRequired,
  secondValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default DialogEdit;
