import sendRequest from '../../../helpers/service';
import { MOUNTAIN_URL } from '../../../configurations/endpoints';

/**
 * Requests server to create new Mountain
 * @param {String} name Mountain name
 * @returns {data} data - new created Mountain
 */
export const createNewMountain = async (name, height) =>
  sendRequest('post', MOUNTAIN_URL, { name, height: parseInt(height) });

/**
 * Requests server to get all entries of Mountains
 * @returns {data} Array of Mountains
 */
export const getMountains = async () => sendRequest('get', MOUNTAIN_URL);

/**
 * Requests server to update specifed Mountain
 * @param {number} mountainId id of the Mountain which we want to update
 * @param {string} name new Mountain name
 * @returns {data} updated Mountain
 */
export const updateMountain = async (mountainId, name, height) =>
  sendRequest('put', `${MOUNTAIN_URL}/${mountainId}`, {
    name,
    height: parseInt(height),
  });

/**
 * Requests server to remove specifed Mountain
 * @param {number} mountainId id of the Mountain which we want to remove
 */
export const deleteMountain = async mountainId =>
  sendRequest('delete', `${MOUNTAIN_URL}/${mountainId}`);
