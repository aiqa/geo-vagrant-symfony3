import sendRequest from '../../../helpers/service';
import { CITY_URL } from '../../../configurations/endpoints';

/**
 * Requests server to create new City
 * @param {String} name City name
 * @param {number | string} population City population
 * @returns {data} data - new created City
 */
export const createNewCity = async (name, population) =>
  sendRequest('post', CITY_URL, {
    name,
    population: parseInt(population, 10),
  });

/**
 * Requests server to get all entries of Cities
 * @returns {data} Array of Cities
 */
export const getCities = async () => sendRequest('get', CITY_URL);

/**
 * Requests server to update specifed City
 * @param {number} cityId id of the City which we want to update
 * @param {string} name new City name
 * @param {number | string} population new City population
 * @returns {data} updated City
 */
export const updateCity = async (cityId, name, population) =>
  sendRequest('put', `${CITY_URL}/${cityId}`, {
    name,
    population: parseInt(population, 10),
  });

/**
 * Requests server to remove specifed City
 * @param {number} cityId id of the City which we want to remove
 */
export const deleteCity = async cityId =>
  sendRequest('delete', `${CITY_URL}/${cityId}`);
