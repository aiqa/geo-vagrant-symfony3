import Homepage from '../../../pages/Homepage';
import Drawer from '../../../pages/components/Drawer';
import Mountains from '../../../pages/Mountains';
import { generateString, generateNumber } from '../../../support/Utils';

describe('Create mountain test', () => {
  let name;
  let height;

  beforeEach(() => {
    name = generateString();
    height = generateNumber();

    cy.visitPage();
    Homepage.isVisible();
    Drawer.toMountains();
  });

  it('Create mountain', () => {
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
  });
});
