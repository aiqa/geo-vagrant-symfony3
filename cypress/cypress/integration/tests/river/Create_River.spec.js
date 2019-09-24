import Homepage from '../../../pages/Homepage';
import Drawer from '../../../pages/components/Drawer';
import Rivers from '../../../pages/Rivers';
import { generateString, generateNumber } from '../../../support/Utils';

describe('Create river test', () => {
  let name;
  let length;

  beforeEach(() => {
    name = generateString();
    length = generateNumber();

    cy.visitPage();
    Homepage.isVisible();
    Drawer.toRivers();
  });

  it('Create river', () => {
    Rivers.isVisible();
    Rivers.fillRiverName(name);
    Rivers.fillRiverLength(length);
    Rivers.submit();

    cy.xpath(`//li//span[contains(text(), "${name}")]`).should('be.visible');
    cy.xpath(`//li//span[contains(text(), "${length}")]`).should('be.visible');

    cy.get('#client-snackbar', { timeout: 10000 })
      .contains('Success!')
      .should('be.visible');
  });
});
