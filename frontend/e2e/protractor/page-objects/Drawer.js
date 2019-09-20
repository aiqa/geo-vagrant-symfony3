// eslint-disable-next-line import/no-extraneous-dependencies
const { element, by, browser } = require('protractor');

class Drawer {
  static openDrawer() {
    element(by.xpath('//button[@aria-label="Menu button"]')).click();
    browser.sleep(500);
  }

  static toHome() {
    this.openDrawer();
    element(by.xpath('//div[@aria-label="home"]')).click();
  }

  static toCities() {
    this.openDrawer();
    element(by.xpath('//div[@aria-label="Cities"]')).click();
  }

  static toRivers() {
    this.openDrawer();
    element(by.xpath('//div[@aria-label="Rivers"]')).click();
  }

  static toMountains() {
    this.openDrawer();
    element(by.xpath('//div[@aria-label="Mountains"]')).click();
  }
}

module.exports = Drawer;
