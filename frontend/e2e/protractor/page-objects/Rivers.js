// eslint-disable-next-line import/no-extraneous-dependencies
const { browser, element, by } = require('protractor');

class Rivers {
  static isVisible() {
    expect(browser.getCurrentUrl()).toEqual(`${browser.baseUrl}/river`);
  }

  /**
   * Types river name into input and returns it
   * @param {string} name
   * @returns this
   */
  static fillRiverName(name) {
    const input = element(by.id('riverName'));
    input.clear().sendKeys(name);
    return this;
  }

  /**
   * Types river length into input and returns it
   * @param {number} length
   * @returns this
   */
  static fillRiverLength(length) {
    const input = element(by.id('riverLength'));
    input.clear().sendKeys(length);
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
   * Types river name into input and returns it
   * @param {string} name
   * @returns this
   */
  static fillNewRiverName(name) {
    element(by.id('newRiverName'))
      .clear()
      .sendKeys(name);
    return this;
  }

  /**
   * Types river length into input and returns it
   * @param {number} length
   * @returns this
   */
  static fillNewRiverLength(length) {
    element(by.id('newRiverLength'))
      .clear()
      .sendKeys(length);
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

module.exports = Rivers;
