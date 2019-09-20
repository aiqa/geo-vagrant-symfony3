import Homepage from '../../../pages/Homepage';
import Drawer from '../../../pages/components/Drawer';
import Mountains from '../../../pages/Mountains';
import { generateString, generateNumber } from '../../../support/Utils';

describe('Edit mountain test', () => {
  let name;
  let newName;
  let height;
  let newHeight;

  beforeEach(() => {
    name = generateString();
    height = generateNumber();

    cy.visitPage();
    Homepage.isVisible();
    Drawer.toMountains();
  });

  it('Edit mountain', () => {
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

    Mountains.edit(name);

    cy.get('h2')
      .contains('Edit entry')
      .should('be.visible');

    newName = generateString();
    newHeight = generateNumber();

    Mountains.fillNewMountainName(newName);
    Mountains.fillNewMountainHeight(newHeight);
    Mountains.submitEdited();

    cy.xpath(`//li//span[contains(text(), "${newName}")]`)
      .scrollIntoView()
      .should('be.visible');
    cy.xpath(`//li//span[contains(text(), "${newHeight}")]`)
      .scrollIntoView()
      .should('be.visible');

    cy.get('#client-snackbar', { timeout: 10000 })
      .contains('Success!')
      .should('be.visible');
  });
});
