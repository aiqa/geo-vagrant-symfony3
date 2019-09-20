const { browser, element, by, ExpectedConditions } = require('protractor');
const { generateNumber, generateString } = require('../utils/generators');
const Drawer = require('../page-objects/Drawer');
const Rivers = require('../page-objects/Rivers');
const clear = require('../utils/clear');

describe('Rivers page', () => {
  let name;
  let newName;
  let length;
  let newLength;

  beforeEach(() => {
    browser.get(browser.baseUrl);
    Drawer.toRivers();

    name = generateString();
    newName = generateString();
    length = generateNumber();
    newLength = generateNumber();

    while (name === newName || length === newLength) {
      newName = generateString();
      newLength = generateNumber();
    }
  });

  it('should be visible', () => {
    Rivers.isVisible();
  });

  it('CRUD test', async () => {
    let elName;
    let elLength;

    const EC = ExpectedConditions;
    const snackbar = await element(by.id('client-snackbar'));

    /**
     * CREATE ACTIONS
     */
    Rivers.fillRiverName(name);
    Rivers.fillRiverLength(length);

    elName = await element(by.id('riverName')).getAttribute('value');
    elLength = await element(by.id('riverLength')).getAttribute('value');

    expect(elName).toEqual(name);
    expect(elLength).toEqual(length.toString());

    Rivers.submit();

    browser.sleep(1500);

    await browser.wait(EC.visibilityOf(await snackbar, 10000));
    await Rivers.isSuccess();

    /**
     * READ ACTIONS
     */
    elName = await element(by.xpath(`//span[contains(text(), "${name}")]`));
    elLength = await element(
      by.xpath(`//li//span[contains(text(), "${length}")]`),
    );

    await browser.wait(EC.visibilityOf(await elName), 10000);

    await browser
      .actions()
      .mouseMove(elName)
      .perform();

    await browser.wait(EC.visibilityOf(await elName), 10000);

    expect(elName.isDisplayed()).toBeTruthy();
    expect(elLength.isDisplayed()).toBeTruthy();

    /**
     * UPDATE ACTIONS
     */
    Rivers.edit(name);

    browser.sleep(1500);

    const dialogHeader = await element(
      by.xpath('//h2[contains(text(), "Edit entry")]'),
    );

    await browser.wait(EC.visibilityOf(await dialogHeader), 10000);

    await expect(dialogHeader.isDisplayed()).toBeTruthy();

    elName = await element(by.id('newRiverName'));
    elLength = await element(by.id('newRiverLength'));

    expect(await elName.getAttribute('value')).toEqual(name);
    expect(await elLength.getAttribute('value')).toEqual(length.toString());

    elName.click();
    browser.sleep(300);

    let val = await elName.getAttribute('value');
    let len = val.length;

    await clear(elName, len);
    await elName.sendKeys(newName);
    browser.sleep(300);

    elLength.click();
    browser.sleep(300);

    val = await elLength.getAttribute('value');
    len = val.toString().length;

    await clear(elLength, len);
    await elLength.sendKeys(newLength);
    browser.sleep(300);

    expect(await elName.getAttribute('value')).toEqual(newName);
    expect(await elLength.getAttribute('value')).toEqual(newLength.toString());

    Rivers.submitEdited();

    browser.sleep(1500);

    await browser.wait(EC.visibilityOf(snackbar, 10000));
    await Rivers.isSuccess();

    /**
     * READ ACTIONS
     */
    elName = await element(by.xpath(`//span[contains(text(), "${newName}")]`));
    elLength = await element(
      by.xpath(`//span[contains(text(), "${newLength}")]`),
    );

    await browser.wait(EC.visibilityOf(elName), 10000);

    await browser
      .actions()
      .mouseMove(elName)
      .perform();

    await browser.wait(EC.visibilityOf(elLength), 10000);

    expect(elName.isDisplayed()).toBeTruthy();
    expect(elLength.isDisplayed()).toBeTruthy();

    /**
     * DELETE ACTIONS
     */
    Rivers.delete(newName);
    browser.sleep(1500);

    await browser.wait(EC.visibilityOf(snackbar, 10000));

    expect(elName.isPresent()).toBeFalsy();
    expect(elLength.isPresent()).toBeFalsy();
  });
});
