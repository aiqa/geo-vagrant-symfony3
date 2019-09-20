import Homepage from '../../../pages/Homepage';
import Drawer from '../../../pages/components/Drawer';
import Mountains from '../../../pages/Mountains';
import { generateString, generateNumber } from '../../../support/Utils';

describe('Delete mountain test', () => {
  let name;
  let height;

  beforeEach(() => {
    name = generateString();
    height = generateNumber();

    cy.visitPage();
    Homepage.isVisible();
    Drawer.toMountains();
  });

  it('Delete mountain', () => {
    Mountains.isVisible();
    Mountains.fillMountainName(name);
    Mountains.fillMountainHeight(height);
    Mountains.submit();

    cy.xpath(`//li//span[contains(text(), "${name}")]`)
      .scrollIntoView()
      .should('be.visible');
    cy.xpath(`//li//span[contains(text(), "${height}")]`)
      .scrollIntoView()
      .should('be.visible');

    cy.get('#client-snackbar', { timeout: 10000 })
      .contains('Success!')
      .should('be.visible');

    // Make sure previous snackbar disappeared
    cy.wait(3000);

    Mountains.delete(name);

    cy.wait(1200);

    cy.get('#client-snackbar', { timeout: 10000 })
      .contains('Success!')
      .should('be.visible');

    cy.xpath(`//li//span[contains(text(), "${name}")]`).should('not.exist');
    cy.xpath(`//li//span[contains(text(), "${height}")]`).should('not.exist');
  });
});
