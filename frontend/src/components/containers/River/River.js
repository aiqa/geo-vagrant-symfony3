/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import { withSnackbar } from 'notistack';
import { getRivers, deleteRiver, updateRiver, createNewRiver } from './service';
import sort from '../../../helpers/sort';
import Form from '../../presentional/Form';
import ItemsList from '../../presentional/ItemsList';
import { riverDialog } from '../../../configurations/dialogs';
import { riverListConfig } from '../../../configurations/lists';
import DialogEdit from '../../presentional/DialogEdit/DialogEdit';

const CLEAR_FORMS_STATE = {
  selectedRiver: {},
  newRiverName: '',
  riverName: '',
  newRiverLength: '',
  riverLength: '',
};

@withSnackbar
class River extends Component {
  static displayName = 'River';
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    enqueueSnackbar: PropTypes.func.isRequired,
  };

  state = {
    loading: true,
    actionLoading: false,
    displayDialog: false,
    selectedRiver: {},
    newRiverName: '',
    newRiverLength: '',
    riverName: '',
    riverLength: '',
    rivers: [],
  };

  async componentDidMount() {
    const { data } = await getRivers();
    this.setState({ rivers: data, loading: false });
  }

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  handleEdit = async () => {
    this.handleActionLoading();
    const { selectedRiver, newRiverName, newRiverLength } = this.state;
    const { enqueueSnackbar } = this.props;

    try {
      const { data } = await updateRiver(
        selectedRiver.id,
        newRiverName,
        newRiverLength,
      );
      await this.updateRiverEntry(data);
      enqueueSnackbar('Success!', { variant: 'success' });
      this.handleActionLoading();
    } catch (error) {
      enqueueSnackbar('Error', { variant: 'error' });
      this.handleActionLoading();
    }
  };

  handleOpenDialog = selectedRiver => {
    this.handleSetForms(selectedRiver);
    this.handleDisplayDialog();
  };

  handleSetForms = selectedRiver =>
    this.setState({
      selectedRiver,
      newRiverName: selectedRiver.name,
      newRiverLength: selectedRiver.length,
    });

  handleDisplayDialog = () =>
    this.setState(prevState => ({
      displayDialog: !prevState.displayDialog,
    }));

  handleDelete = async RiverId => {
    const { enqueueSnackbar } = this.props;

    try {
      this.handleActionLoading();
      await deleteRiver(RiverId);
      await this.removeRiverEntry(RiverId);
      enqueueSnackbar('Success!', { variant: 'success' });
      this.handleActionLoading();
    } catch (error) {
      enqueueSnackbar('Error', { variant: 'error' });
      this.handleActionLoading();
    }
  };

  handleSubmit = async event => {
    const { riverName, riverLength } = this.state;
    const { enqueueSnackbar } = this.props;
    event.preventDefault();

    try {
      this.handleActionLoading();
      const { data } = await createNewRiver(riverName, riverLength);
      await this.addRiverEntry(data);
      enqueueSnackbar('Success!', { variant: 'success' });
      this.handleActionLoading();
    } catch (error) {
      enqueueSnackbar('Error', { variant: 'error' });
      this.handleActionLoading();
    }
  };

  handleActionLoading = () =>
    this.setState(prevState => ({ actionLoading: !prevState.actionLoading }));

  addRiverEntry = async newRiver =>
    this.setState(prevState => ({
      ...CLEAR_FORMS_STATE,
      rivers: sort([...prevState.rivers, newRiver]),
    }));

  updateRiverEntry = async updatedRiver =>
    this.setState(prevState => ({
      ...CLEAR_FORMS_STATE,
      rivers: sort(
        prevState.rivers.map(River =>
          River.id === updatedRiver.id ? updatedRiver : River,
        ),
      ),
    }));

  removeRiverEntry = async RiverId =>
    this.setState(prevState => ({
      rivers: sort(prevState.rivers.filter(River => River.id !== RiverId)),
    }));

  render() {
    const {
      rivers,
      loading,
      riverName,
      actionLoading,
      displayDialog,
      riverLength,
      newRiverName,
      newRiverLength,
    } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Typography variant="h4" classes={{ root: classes.title }}>
          Rivers
        </Typography>
        <Paper classes={{ root: classes.paper }}>
          <Typography variant="h6" classes={{ root: classes.formTitle }}>
            Add new river
          </Typography>
          <Form handleSubmit={this.handleSubmit} classes={classes.form}>
            <TextField
              type="text"
              id="riverName"
              name="riverName"
              label="River name"
              value={riverName}
              classes={{ root: classes.input }}
              onChange={this.handleChange}
            />
            <TextField
              type="number"
              id="riverLength"
              name="riverLength"
              label="River length"
              value={riverLength}
              classes={{ root: classes.input }}
              onChange={this.handleChange}
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              classes={{ root: classes.button }}
            >
              Submit
            </Button>
          </Form>
        </Paper>
        {loading ? (
          <CircularProgress />
        ) : !rivers.length ? (
          <Typography variant="h6" classes={{ root: classes.notFound }}>
            No rivers found.
          </Typography>
        ) : (
          <ItemsList
            items={rivers}
            loading={actionLoading}
            itemsConfig={riverListConfig}
            handleEdit={this.handleOpenDialog}
            handleDelete={this.handleDelete}
          />
        )}
        <DialogEdit
          classes={classes}
          open={displayDialog}
          firstValue={newRiverName}
          secondValue={newRiverLength}
          formsConfig={riverDialog}
          handleEdit={this.handleEdit}
          handleChange={this.handleChange}
          handleClose={this.handleDisplayDialog}
        />
      </div>
    );
  }
}

export default River;
