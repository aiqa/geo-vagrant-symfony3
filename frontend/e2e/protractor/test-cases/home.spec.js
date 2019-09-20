const { element, by, browser } = require('protractor');
const Drawer = require('../page-objects/Drawer');

describe('Home Page', () => {
  beforeEach(() => {
    browser.get(browser.baseUrl);
  });

  it('should have correct title', () => {
    expect(browser.getTitle()).toEqual('AIQA - geography');
  });

  it('should open the drawer', () => {
    Drawer.openDrawer();

    const drawerTitle = element(
      by.xpath('//h5[contains(text(), "Geography")]'),
    );
    const homeButtonLabel = element(
      by.xpath('//span[contains(text(), "Home")]'),
    );
    const citiesButtonLabel = element(
      by.xpath('//span[contains(text(), "Cities")]'),
    );
    const riversButtonLabel = element(
      by.xpath('//span[contains(text(), "Rivers")]'),
    );
    const mountainsButtonLabel = element(
      by.xpath('//span[contains(text(), "Mountains")]'),
    );

    expect(drawerTitle.isDisplayed()).toBeTruthy();
    expect(homeButtonLabel.isDisplayed()).toBeTruthy();
    expect(citiesButtonLabel.isDisplayed()).toBeTruthy();
    expect(riversButtonLabel.isDisplayed()).toBeTruthy();
    expect(mountainsButtonLabel.isDisplayed()).toBeTruthy();
  });
});
