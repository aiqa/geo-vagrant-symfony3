import Homepage from '../../../pages/Homepage';
import Drawer from '../../../pages/components/Drawer';
import Cities from '../../../pages/Cities';
import { generateString, generateNumber } from '../../../support/Utils';

describe('Edit city test', () => {
  let name;
  let newName;
  let population;
  let newPopulation;

  beforeEach(() => {
    name = generateString();
    population = generateNumber();

    cy.visitPage();
    Homepage.isVisible();
    Drawer.toCities();
  });

  it('Edit city', () => {
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

    Cities.edit(name);

    cy.get('h2')
      .contains('Edit entry')
      .should('be.visible');

    newName = generateString();
    newPopulation = generateNumber();

    Cities.fillNewCityName(newName);
    Cities.fillNewCityPopulation(newPopulation);
    Cities.submitEdited();

    cy.xpath(`//li//span[contains(text(), "${newName}")]`).should('be.visible');
    cy.xpath(`//li//span[contains(text(), "${newPopulation}")]`).should(
      'be.visible',
    );

    cy.get('#client-snackbar', { timeout: 10000 })
      .contains('Success!')
      .should('be.visible');
  });
});
