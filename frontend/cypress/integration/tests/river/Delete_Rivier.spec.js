import Homepage from '../../../pages/Homepage';
import Drawer from '../../../pages/components/Drawer';
import Rivers from '../../../pages/Rivers';
import { generateString, generateNumber } from '../../../support/Utils';

describe('Delete river test', () => {
  let name;
  let length;

  beforeEach(() => {
    name = generateString();
    length = generateNumber();

    cy.visitPage();
    Homepage.isVisible();
    Drawer.toRivers();
  });

  it('Delete river', () => {
    Rivers.isVisible();
    Rivers.fillRiverName(name);
    Rivers.fillRiverLength(length);
    Rivers.submit();

    cy.xpath(`//li//span[contains(text(), "${name}")]`).should('be.visible');
    cy.xpath(`//li//span[contains(text(), "${length}")]`).should('be.visible');

    cy.get('#client-snackbar', { timeout: 10000 })
      .contains('Success!')
      .should('be.visible');

    // Make sure previous snackbar disappeared
    cy.wait(3000);

    Rivers.delete(name);

    cy.wait(1200);

    cy.get('#client-snackbar', { timeout: 10000 })
      .contains('Success!')
      .should('be.visible');

    cy.xpath(`//li//span[contains(text(), "${name}")]`).should('not.exist');
    cy.xpath(`//li//span[contains(text(), "${length}")]`).should('not.exist');
  });
});
