// eslint-disable-next-line import/no-extraneous-dependencies
const { browser, element, by } = require('protractor');

class Mountains {
  static isVisible() {
    expect(browser.getCurrentUrl()).toEqual(`${browser.baseUrl}/mountain`);
  }

  /**
   * Types mountain name into input and returns it
   * @param {string} name
   * @returns this
   */
  static fillMountainName(name) {
    const input = element(by.id('mountainName'));
    input.clear().sendKeys(name);
    return this;
  }

  /**
   * Types mountain height into input and returns it
   * @param {number} height
   * @returns this
   */
  static fillMountainHeight(height) {
    const input = element(by.id('mountainHeight'));
    input.clear().sendKeys(height);
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
   * Types mountain name into input and returns it
   * @param {string} name
   * @returns this
   */
  static fillNewMountainName(name) {
    element(by.id('newMountainName'))
      .clear()
      .sendKeys(name);
    return this;
  }

  /**
   * Types mountain height into input and returns it
   * @param {number} height
   * @returns this
   */
  static fillNewMountainHeight(height) {
    element(by.id('newMountainHeight'))
      .clear()
      .sendKeys(height);
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

module.exports = Mountains;
