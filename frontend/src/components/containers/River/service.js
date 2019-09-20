import sendRequest from '../../../helpers/service';
import { RIVER_URL } from '../../../configurations/endpoints';

/**
 * Requests server to create new River
 * @param {String} name River name
 * @returns {data} data - new created River
 */
export const createNewRiver = async (name, length) =>
  sendRequest('post', RIVER_URL, { name, length: parseInt(length) });

/**
 * Requests server to get all entries of Rivers
 * @returns {data} Array of Rivers
 */
export const getRivers = async () => sendRequest('get', RIVER_URL);

/**
 * Requests server to update specifed River
 * @param {number} riverId id of the River which we want to update
 * @param {string} name new River name
 * @returns {data} updated River
 */
export const updateRiver = async (riverId, name, length) =>
  sendRequest('put', `${RIVER_URL}/${riverId}`, {
    name,
    length: parseInt(length),
  });

/**
 * Requests server to remove specifed River
 * @param {number} riverId id of the River which we want to remove
 */
export const deleteRiver = async riverId =>
  sendRequest('delete', `${RIVER_URL}/${riverId}`);
