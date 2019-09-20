const { browser, element, by, ExpectedConditions } = require('protractor');
const { generateNumber, generateString } = require('../utils/generators');
const Drawer = require('../page-objects/Drawer');
const Cities = require('../page-objects/Cities');
const clear = require('../utils/clear');

describe('Cities Page', () => {
  let name;
  let newName;
  let population;
  let newPopulation;

  beforeEach(() => {
    browser.get(browser.baseUrl);
    Drawer.toCities();

    name = generateString();
    newName = generateString();
    population = generateNumber();
    newPopulation = generateNumber();

    while (name === newName || population === newPopulation) {
      newName = generateString();
      newPopulation = generateNumber();
    }
  });

  it('should be visible', () => {
    Cities.isVisible();
  });

  it('CRUD test', async () => {
    let elName;
    let elPopulation;

    const EC = ExpectedConditions;
    const snackbar = await element(by.id('client-snackbar'));

    /**
     * CREATE ACTIONS
     */
    Cities.fillCityName(name);
    Cities.fillCityPopulation(population);

    elName = await element(by.id('cityName')).getAttribute('value');
    elPopulation = await element(by.id('cityPopulation')).getAttribute('value');

    expect(elName).toEqual(name);
    expect(elPopulation).toEqual(population.toString());

    Cities.submit();

    browser.sleep(1500);

    await browser.wait(EC.visibilityOf(await snackbar, 10000));
    await Cities.isSuccess();

    /**
     * READ ACTIONS
     */
    elName = await element(by.xpath(`//span[contains(text(), "${name}")]`));
    elPopulation = await element(
      by.xpath(`//li//span[contains(text(), "${population}")]`),
    );

    await browser.wait(EC.visibilityOf(await elName), 10000);

    await browser
      .actions()
      .mouseMove(elName)
      .perform();

    await browser.wait(EC.visibilityOf(await elName), 10000);

    expect(elName.isDisplayed()).toBeTruthy();
    expect(elPopulation.isDisplayed()).toBeTruthy();

    /**
     * UPDATE ACTIONS
     */
    Cities.edit(name);

    browser.sleep(1500);

    const dialogHeader = await element(
      by.xpath('//h2[contains(text(), "Edit entry")]'),
    );

    await browser.wait(EC.visibilityOf(await dialogHeader), 10000);

    await expect(dialogHeader.isDisplayed()).toBeTruthy();

    elName = await element(by.id('newCityName'));
    elPopulation = await element(by.id('newCityPopulation'));

    expect(await elName.getAttribute('value')).toEqual(name);
    expect(await elPopulation.getAttribute('value')).toEqual(
      population.toString(),
    );

    elName.click();
    browser.sleep(300);

    let val = await elName.getAttribute('value');
    let len = val.length;

    await clear(elName, len);
    await elName.sendKeys(newName);
    browser.sleep(300);

    elPopulation.click();
    browser.sleep(300);

    val = await elPopulation.getAttribute('value');
    len = val.toString().length;

    await clear(elPopulation, len);
    await elPopulation.sendKeys(newPopulation);
    browser.sleep(300);

    expect(await elName.getAttribute('value')).toEqual(newName);
    expect(await elPopulation.getAttribute('value')).toEqual(
      newPopulation.toString(),
    );

    Cities.submitEdited();

    browser.sleep(1500);

    await browser.wait(EC.visibilityOf(snackbar, 10000));
    await Cities.isSuccess();

    /**
     * READ ACTIONS
     */
    elName = await element(by.xpath(`//span[contains(text(), "${newName}")]`));
    elPopulation = await element(
      by.xpath(`//span[contains(text(), "${newPopulation}")]`),
    );

    await browser.wait(EC.visibilityOf(elName), 10000);

    await browser
      .actions()
      .mouseMove(elName)
      .perform();

    await browser.wait(EC.visibilityOf(elPopulation), 10000);

    expect(elName.isDisplayed()).toBeTruthy();
    expect(elPopulation.isDisplayed()).toBeTruthy();

    /**
     * DELETE ACTIONS
     */
    Cities.delete(newName);
    browser.sleep(1500);

    await browser.wait(EC.visibilityOf(snackbar, 10000));

    expect(elName.isPresent()).toBeFalsy();
    expect(elPopulation.isPresent()).toBeFalsy();
  });
});
