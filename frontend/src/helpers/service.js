import axios from 'axios';

/**
 * Wrapper for axios async function to handle request and keep code DRY
 * @param {string} type Type of request (get, put, post, delete)
 * @param {string} url Requested url
 * @param {Object} payload Date for request payload
 * @returns {data}} from response
 */
const sendRequest = async (type, url, payload) => {
  try {
    const { status, data } = await axios[type](url, payload);
    return status && { data };
  } catch (error) {
    throw error;
  }
};

export default sendRequest;
