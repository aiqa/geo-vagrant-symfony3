import Homepage from '../../../pages/Homepage';
import Drawer from '../../../pages/components/Drawer';
import Rivers from '../../../pages/Rivers';
import { generateString, generateNumber } from '../../../support/Utils';

describe('Edit river test', () => {
  let name;
  let newName;
  let length;
  let newLength;

  beforeEach(() => {
    name = generateString();
    length = generateNumber();

    cy.visitPage();
    Homepage.isVisible();
    Drawer.toRivers();
  });

  it('Edit river', () => {
    Rivers.isVisible();
    Rivers.fillRiverName(name);
    Rivers.fillRiverLength(length);
    Rivers.submit();

    cy.xpath(`//li//span[contains(text(), "${name}")]`)
      .scrollIntoView()
      .should('be.visible');
    cy.xpath(`//li//span[contains(text(), "${length}")]`)
      .scrollIntoView()
      .should('be.visible');

    cy.get('#client-snackbar', { timeout: 10000 })
      .contains('Success!')
      .should('be.visible');

    // Make sure previous snackbar disappeared
    cy.wait(3000);

    Rivers.edit(name);

    cy.get('h2')
      .contains('Edit entry')
      .should('be.visible');

    newName = generateString();
    newLength = generateNumber();

    Rivers.fillNewRiverName(newName);
    Rivers.fillNewRiverLength(newLength);
    Rivers.submitEdited();

    cy.xpath(`//li//span[contains(text(), "${newName}")]`).should('be.visible');
    cy.xpath(`//li//span[contains(text(), "${newLength}")]`).should(
      'be.visible',
    );

    cy.get('#client-snackbar', { timeout: 10000 })
      .contains('Success!')
      .should('be.visible');
  });
});
