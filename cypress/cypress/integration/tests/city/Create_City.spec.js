import Homepage from '../../../pages/Homepage';
import Drawer from '../../../pages/components/Drawer';
import Cities from '../../../pages/Cities';
import { generateString, generateNumber } from '../../../support/Utils';

describe('Create city test', () => {
  let name;
  let population;

  beforeEach(() => {
    name = generateString();
    population = generateNumber();

    cy.visitPage();
    Homepage.isVisible();
    Drawer.toCities();
  });

  it('Create city', () => {
    Cities.isVisible();
    Cities.fillCityName(name);
    Cities.fillCityPopulation(population);
    Cities.submit();

    cy.xpath(`//li//span[contains(text(), "${name}")]`)
      .scrollIntoView()
      .should('be.visible');
    cy.xpath(`//li//span[contains(text(), "${population}")]`)
      .scrollIntoView()
      .should('be.visible');

    cy.get('#client-snackbar', { timeout: 10000 })
      .contains('Success!')
      .should('be.visible');
  });
});
