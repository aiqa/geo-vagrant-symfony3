const { browser, element, by, ExpectedConditions } = require('protractor');
const { generateNumber, generateString } = require('../utils/generators');
const Drawer = require('../page-objects/Drawer');
const Mountains = require('../page-objects/Mountains');
const clear = require('../utils/clear');

describe('Mountains page', () => {
  let name;
  let newName;
  let height;
  let newHeight;

  beforeEach(() => {
    browser.get(browser.baseUrl);
    Drawer.toMountains();

    name = generateString();
    newName = generateString();
    height = generateNumber();
    newHeight = generateNumber();

    while (name === newName || height === newHeight) {
      newName = generateString();
      newHeight = generateNumber();
    }
  });

  it('should be visible', () => {
    Mountains.isVisible();
  });

  it('CRUD test', async () => {
    let elName;
    let elHeight;

    const EC = ExpectedConditions;
    const snackbar = await element(by.id('client-snackbar'));

    /**
     * CREATE ACTIONS
     */
    Mountains.fillMountainName(name);
    Mountains.fillMountainHeight(height);

    elName = await element(by.id('mountainName')).getAttribute('value');
    elHeight = await element(by.id('mountainHeight')).getAttribute('value');

    expect(elName).toEqual(name);
    expect(elHeight).toEqual(height.toString());

    Mountains.submit();

    browser.sleep(1500);

    await browser.wait(EC.visibilityOf(await snackbar, 10000));
    await Mountains.isSuccess();

    /**
     * READ ACTIONS
     */
    elName = await element(by.xpath(`//span[contains(text(), "${name}")]`));
    elHeight = await element(
      by.xpath(`//li//span[contains(text(), "${height}")]`),
    );

    await browser.wait(EC.visibilityOf(await elName), 10000);

    await browser
      .actions()
      .mouseMove(elName)
      .perform();

    await browser.wait(EC.visibilityOf(await elName), 10000);

    expect(elName.isDisplayed()).toBeTruthy();
    expect(elHeight.isDisplayed()).toBeTruthy();

    /**
     * UPDATE ACTIONS
     */
    Mountains.edit(name);

    browser.sleep(1500);

    const dialogHeader = await element(
      by.xpath('//h2[contains(text(), "Edit entry")]'),
    );

    await browser.wait(EC.visibilityOf(await dialogHeader), 10000);

    await expect(dialogHeader.isDisplayed()).toBeTruthy();

    elName = await element(by.id('newMountainName'));
    elHeight = await element(by.id('newMountainHeight'));

    expect(await elName.getAttribute('value')).toEqual(name);
    expect(await elHeight.getAttribute('value')).toEqual(height.toString());

    elName.click();
    browser.sleep(300);

    let val = await elName.getAttribute('value');
    let len = val.length;

    await clear(elName, len);
    await elName.sendKeys(newName);
    browser.sleep(300);

    elHeight.click();
    browser.sleep(300);

    val = await elHeight.getAttribute('value');
    len = val.toString().length;

    await clear(elHeight, len);
    await elHeight.sendKeys(newHeight);
    browser.sleep(300);

    expect(await elName.getAttribute('value')).toEqual(newName);
    expect(await elHeight.getAttribute('value')).toEqual(newHeight.toString());

    Mountains.submitEdited();

    browser.sleep(1500);

    await browser.wait(EC.visibilityOf(snackbar, 10000));
    await Mountains.isSuccess();

    /**
     * READ ACTIONS
     */
    elName = await element(by.xpath(`//span[contains(text(), "${newName}")]`));
    elHeight = await element(
      by.xpath(`//span[contains(text(), "${newHeight}")]`),
    );

    await browser.wait(EC.visibilityOf(elName), 10000);

    await browser
      .actions()
      .mouseMove(elName)
      .perform();

    await browser.wait(EC.visibilityOf(elHeight), 10000);

    expect(elName.isDisplayed()).toBeTruthy();
    expect(elHeight.isDisplayed()).toBeTruthy();

    /**
     * DELETE ACTIONS
     */
    Mountains.delete(newName);
    browser.sleep(1500);

    await browser.wait(EC.visibilityOf(snackbar, 10000));

    expect(elName.isPresent()).toBeFalsy();
    expect(elHeight.isPresent()).toBeFalsy();
  });
});
