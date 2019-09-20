/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import { withSnackbar } from 'notistack';
import sort from '../../../helpers/sort';
import Form from '../../presentional/Form';
import ItemsList from '../../presentional/ItemsList';
import { cityDialog } from '../../../configurations/dialogs';
import { cityListConfig } from '../../../configurations/lists';
import DialogEdit from '../../presentional/DialogEdit/DialogEdit';
import { getCities, deleteCity, updateCity, createNewCity } from './service';

const CLEAR_FORMS_STATE = {
  selectedCity: {},
  newCityName: '',
  newCityPopulation: '',
  cityName: '',
  cityPopulation: '',
};

@withSnackbar
class City extends Component {
  static displayName = 'City';

  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    enqueueSnackbar: PropTypes.func.isRequired,
  };

  state = {
    loading: true,
    actionLoading: false,
    displayDialog: false,
    selectedCity: {},
    newCityName: '',
    newCityPopulation: '',
    cityName: '',
    cityPopulation: '',
    cities: [],
  };

  async componentDidMount() {
    const { data } = await getCities();
    this.setState({ cities: data, loading: false });
  }

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  handleOpenDialog = selectedCity => {
    this.handleSetForms(selectedCity);
    this.handleDisplayDialog();
  };

  handleSetForms = selectedCity =>
    this.setState({
      selectedCity,
      newCityName: selectedCity.name,
      newCityPopulation: selectedCity.population,
    });

  handleDisplayDialog = () =>
    this.setState(prevState => ({
      displayDialog: !prevState.displayDialog,
    }));

  handleEdit = async () => {
    const { selectedCity, newCityName, newCityPopulation } = this.state;
    const { enqueueSnackbar } = this.props;

    try {
      this.handleActionLoading();
      const { data } = await updateCity(
        selectedCity.id,
        newCityName,
        newCityPopulation,
      );
      await this.updateCityEntry(data);
      await this.setState({ ...CLEAR_FORMS_STATE });
      enqueueSnackbar('Success!', { variant: 'success' });
      this.handleActionLoading();
    } catch (error) {
      enqueueSnackbar('Error', { variant: 'error' });
      this.handleActionLoading();
    }
  };

  handleDelete = async CityId => {
    const { enqueueSnackbar } = this.props;

    try {
      this.handleActionLoading();
      await deleteCity(CityId);
      await this.removeCityEntry(CityId);
      enqueueSnackbar('Success!', { variant: 'success' });
      this.handleActionLoading();
    } catch (error) {
      enqueueSnackbar('Error', { variant: 'error' });
      this.handleActionLoading();
    }
  };

  handleSubmit = async event => {
    const { cityName, cityPopulation } = this.state;
    const { enqueueSnackbar } = this.props;
    event.preventDefault();

    try {
      this.handleActionLoading();
      const { data } = await createNewCity(cityName, cityPopulation);
      await this.addCityEntry(data);
      enqueueSnackbar('Success!', { variant: 'success' });
      this.handleActionLoading();
    } catch (error) {
      enqueueSnackbar('Error', { variant: 'error' });
      this.handleActionLoading();
    }
  };

  handleActionLoading = () =>
    this.setState(prevState => ({ actionLoading: !prevState.actionLoading }));

  addCityEntry = async newCity =>
    this.setState(prevState => ({
      ...CLEAR_FORMS_STATE,
      cities: sort([...prevState.cities, newCity]),
    }));

  updateCityEntry = async updatedCity =>
    this.setState(prevState => ({
      ...CLEAR_FORMS_STATE,
      cities: sort(
        prevState.cities.map(city =>
          city.id === updatedCity.id ? updatedCity : city,
        ),
      ),
    }));

  removeCityEntry = async cityId =>
    this.setState(prevState => ({
      cities: sort(prevState.cities.filter(city => city.id !== cityId)),
    }));

  render() {
    const {
      cities,
      loading,
      cityName,
      cityPopulation,
      newCityName,
      newCityPopulation,
      actionLoading,
      displayDialog,
    } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Typography variant="h4" classes={{ root: classes.title }}>
          Cities
        </Typography>
        <Paper classes={{ root: classes.paper }}>
          <Typography variant="h6" classes={{ root: classes.formTitle }}>
            Add new city
          </Typography>
          <Form handleSubmit={this.handleSubmit} classes={classes.form}>
            <TextField
              type="text"
              id="cityName"
              name="cityName"
              label="City name"
              value={cityName}
              classes={{ root: classes.input }}
              onChange={this.handleChange}
            />
            <TextField
              type="number"
              id="cityPopulation"
              name="cityPopulation"
              label="City population"
              value={cityPopulation}
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
        ) : !cities.length ? (
          <Typography variant="h6" classes={{ root: classes.notFound }}>
            No cities found.
          </Typography>
        ) : (
          <ItemsList
            items={cities}
            loading={actionLoading}
            itemsConfig={cityListConfig}
            handleEdit={this.handleOpenDialog}
            handleDelete={this.handleDelete}
          />
        )}
        <DialogEdit
          classes={classes}
          open={displayDialog}
          firstValue={newCityName}
          secondValue={newCityPopulation}
          formsConfig={cityDialog}
          handleEdit={this.handleEdit}
          handleChange={this.handleChange}
          handleClose={this.handleDisplayDialog}
        />
      </div>
    );
  }
}

export default City;
