import Homepage from '../../../pages/Homepage';
import Drawer from '../../../pages/components/Drawer';
import Cities from '../../../pages/Cities';
import { generateString, generateNumber } from '../../../support/Utils';

describe('Get cities test', () => {
  let name;
  let population;
  let secondName;
  let secondPopulation;

  beforeEach(() => {
    name = generateString();
    population = generateNumber();

    secondName = generateString();
    secondPopulation = generateNumber();

    cy.visitPage();
    Homepage.isVisible();
    Drawer.toCities();
  });

  it('Get cities list', () => {
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

    Cities.fillCityName(secondName);
    Cities.fillCityPopulation(secondPopulation);
    Cities.submit();

    cy.xpath(`//li//span[contains(text(), "${secondName}")]`)
      .scrollIntoView()
      .should('be.visible');
    cy.xpath(`//li//span[contains(text(), "${secondPopulation}")]`)
      .scrollIntoView()
      .should('be.visible');
  });
});
