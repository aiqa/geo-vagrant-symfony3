import Homepage from '../../../pages/Homepage';
import Drawer from '../../../pages/components/Drawer';
import Mountains from '../../../pages/Mountains';
import { generateString, generateNumber } from '../../../support/Utils';

describe('Get mountain test', () => {
  let name;
  let height;

  beforeEach(() => {
    name = generateString();
    height = generateNumber();

    cy.visitPage();
    Homepage.isVisible();
    Drawer.toMountains();
  });

  it('Get mountain', () => {
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
  });
});
