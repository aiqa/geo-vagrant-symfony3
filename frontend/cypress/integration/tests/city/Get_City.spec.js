import Homepage from '../../../pages/Homepage';
import Drawer from '../../../pages/components/Drawer';
import Cities from '../../../pages/Cities';
import { generateString, generateNumber } from '../../../support/Utils';

describe('Get city test', () => {
  let name;
  let population;

  beforeEach(() => {
    name = generateString();
    population = generateNumber();

    cy.visitPage();
    Homepage.isVisible();
    Drawer.toCities();
  });

  it('Get city', () => {
    Cities.isVisible();
    Cities.fillCityName(name);
    Cities.fillCityPopulation(population);
    Cities.submit();

    cy.wait(3000);

    cy.xpath(`//li//span[contains(text(), "${name}")]`)
      .scrollIntoView()
      .should('be.visible');
    cy.xpath(`//li//span[contains(text(), "${population}")]`)
      .scrollIntoView()
      .should('be.visible');
  });
});
