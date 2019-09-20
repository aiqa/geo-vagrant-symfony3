/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withSnackbar } from 'notistack';

import {
  getMountains,
  createNewMountain,
  updateMountain,
  deleteMountain,
} from './service';
import sort from '../../../helpers/sort';
import Form from '../../presentional/Form';
import ItemsList from '../../presentional/ItemsList';
import { mountainDialog } from '../../../configurations/dialogs';
import { mountainListConfig } from '../../../configurations/lists';
import DialogEdit from '../../presentional/DialogEdit/DialogEdit';

const CLEAR_FORMS_STATE = {
  selectedMountain: {},
  newMountainName: '',
  mountainName: '',
  newMountainHeight: '',
  mountainHeight: '',
};

@withSnackbar
class mountain extends Component {
  static displayName = 'mountain';
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    enqueueSnackbar: PropTypes.func.isRequired,
  };

  state = {
    loading: true,
    actionLoading: false,
    displayDialog: false,
    selectedMountain: {},
    newMountainName: '',
    newMountainHeight: '',
    mountainName: '',
    mountainHeight: '',
    mountains: [],
  };

  async componentDidMount() {
    const { data } = await getMountains();
    this.setState({ mountains: data, loading: false });
  }

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  handleEdit = async () => {
    const { selectedMountain, newMountainName, newMountainHeight } = this.state;
    const { enqueueSnackbar } = this.props;

    try {
      this.handleActionLoading();
      const { data } = await updateMountain(
        selectedMountain.id,
        newMountainName,
        newMountainHeight,
      );
      await this.updateMountainEntry(data);
      enqueueSnackbar('Success!', { variant: 'success' });
      this.handleActionLoading();
    } catch (error) {
      enqueueSnackbar('Error', { variant: 'error' });
      this.handleActionLoading();
    }
  };

  handleOpenDialog = selectedMountain => {
    this.handleSetForms(selectedMountain);
    this.handleDisplayDialog();
  };

  handleSetForms = selectedMountain =>
    this.setState({
      selectedMountain,
      newMountainName: selectedMountain.name,
      newMountainHeight: selectedMountain.height,
    });

  handleDisplayDialog = () =>
    this.setState(prevState => ({
      displayDialog: !prevState.displayDialog,
    }));

  handleDelete = async mountainId => {
    const { enqueueSnackbar } = this.props;

    try {
      this.handleActionLoading();
      await deleteMountain(mountainId);
      await this.removeMountainEntry(mountainId);
      enqueueSnackbar('Success!', { variant: 'success' });
      this.handleActionLoading();
    } catch (error) {
      enqueueSnackbar('Error', { variant: 'error' });
      this.handleActionLoading();
    }
  };

  handleSubmit = async event => {
    const { mountainName, mountainHeight } = this.state;
    const { enqueueSnackbar } = this.props;
    event.preventDefault();

    try {
      this.handleActionLoading();
      const { data } = await createNewMountain(mountainName, mountainHeight);
      await this.addMountainEntry(data);
      enqueueSnackbar('Success!', { variant: 'success' });
      this.handleActionLoading();
    } catch (error) {
      enqueueSnackbar('Error', { variant: 'error' });
      this.handleActionLoading();
    }
  };

  handleActionLoading = () =>
    this.setState(prevState => ({ actionLoading: !prevState.actionLoading }));

  addMountainEntry = async newMountain =>
    this.setState(prevState => ({
      ...CLEAR_FORMS_STATE,
      mountains: sort([...prevState.mountains, newMountain]),
    }));

  updateMountainEntry = async updatedMountain =>
    this.setState(prevState => ({
      ...CLEAR_FORMS_STATE,
      mountains: sort(
        prevState.mountains.map(mountain =>
          mountain.id === updatedMountain.id ? updatedMountain : mountain,
        ),
      ),
    }));

  removeMountainEntry = async mountainId =>
    this.setState(prevState => ({
      mountains: sort(
        prevState.mountains.filter(mountain => mountain.id !== mountainId),
      ),
    }));

  render() {
    const {
      mountains,
      loading,
      mountainName,
      actionLoading,
      displayDialog,
      mountainHeight,
      newMountainName,
      newMountainHeight,
    } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Typography variant="h4" classes={{ root: classes.title }}>
          Mountains
        </Typography>
        <Paper classes={{ root: classes.paper }}>
          <Typography variant="h6" classes={{ root: classes.formTitle }}>
            Add new mountain
          </Typography>
          <Form handleSubmit={this.handleSubmit} classes={classes.form}>
            <TextField
              type="text"
              id="mountainName"
              name="mountainName"
              label="Mountain name"
              value={mountainName}
              classes={{ root: classes.input }}
              onChange={this.handleChange}
            />
            <TextField
              type="number"
              id="mountainHeight"
              name="mountainHeight"
              label="Mountain height"
              value={mountainHeight}
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
        ) : !mountains.length ? (
          <Typography variant="h6" classes={{ root: classes.notFound }}>
            No mountains found.
          </Typography>
        ) : (
          <ItemsList
            items={mountains}
            loading={actionLoading}
            itemsConfig={mountainListConfig}
            handleEdit={this.handleOpenDialog}
            handleDelete={this.handleDelete}
          />
        )}
        <DialogEdit
          classes={classes}
          open={displayDialog}
          firstValue={newMountainName}
          secondValue={newMountainHeight}
          formsConfig={mountainDialog}
          handleEdit={this.handleEdit}
          handleChange={this.handleChange}
          handleClose={this.handleDisplayDialog}
        />
      </div>
    );
  }
}

export default mountain;
