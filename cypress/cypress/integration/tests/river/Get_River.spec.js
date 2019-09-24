import Homepage from '../../../pages/Homepage';
import Drawer from '../../../pages/components/Drawer';
import Rivers from '../../../pages/Rivers';
import { generateString, generateNumber } from '../../../support/Utils';

describe('Get river test', () => {
  let name;
  let length;

  beforeEach(() => {
    name = generateString();
    length = generateNumber();

    cy.visitPage();
    Homepage.isVisible();
    Drawer.toRivers();
  });

  it('Get river', () => {
    Rivers.isVisible();
    Rivers.fillRiverName(name);
    Rivers.fillRiverLength(length);
    Rivers.submit();

    cy.xpath(`//li//span[contains(text(), "${name}")]`).should('be.visible');
    cy.xpath(`//li//span[contains(text(), "${length}")]`).should('be.visible');
  });
});
