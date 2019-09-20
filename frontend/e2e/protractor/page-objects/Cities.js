/* eslint-disable max-len */
// eslint-disable-next-line import/no-extraneous-dependencies
const { browser, element, by } = require('protractor');

class Cities {
  static isVisible() {
    expect(browser.getCurrentUrl()).toEqual(`${browser.baseUrl}/city`);
  }

  /**
   * Types city name into input and returns it
   * @param {string} name
   * @returns this
   */
  static fillCityName(name) {
    const input = element(by.id('cityName'));
    input.clear().sendKeys(name);
    return this;
  }

  /**
   * Types city population into input and returns it
   * @param {number} population
   * @returns this
   */
  static fillCityPopulation(population) {
    const input = element(by.id('cityPopulation'));
    input.clear().sendKeys(population);
    return this;
  }

  static submit() {
    element(by.css('button[type="submit"]')).click();
  }

  static edit(name) {
    element(
      by.xpath(
        `(//span[contains(text(), "${name}")]/parent::div/parent::li//button)[1]`,
      ),
    ).click();
  }

  /**
   * Types city name into input and returns it
   * @param {string} name
   * @returns this
   */
  static fillNewCityName(name) {
    element(by.id('newCityName'))
      .clear()
      .sendKeys(name);
    return this;
  }

  /**
   * Types city population into input and returns it
   * @param {number} population
   * @returns this
   */
  static fillNewCityPopulation(population) {
    element(by.id('newCityPopulation'))
      .clear()
      .sendKeys(population);
    return this;
  }

  static submitEdited() {
    element(by.xpath('(//button[@aria-label="submit-edit"])')).click();
  }

  /**
   * Removes entry with passed name
   * @param {string} name
   */
  static delete(name) {
    element(
      by.xpath(
        `(//span[contains(text(), "${name}")]/parent::div/parent::li//button)[2]`,
      ),
    ).click();
  }

  static async isSuccess() {
    expect(await element(by.id('client-snackbar')).isDisplayed()).toBeTruthy();
  }
}

module.exports = Cities;
