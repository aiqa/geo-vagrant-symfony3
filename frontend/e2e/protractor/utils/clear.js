// eslint-disable-next-line import/no-extraneous-dependencies
const { Key } = require('protractor');

const clear = (element, length) => {
  let backspaceSeries = '';
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    backspaceSeries += Key.BACK_SPACE;
  }
  element.sendKeys(backspaceSeries);
};

module.exports = clear;
