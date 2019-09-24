import Homepage from '../../../pages/Homepage';
import Drawer from '../../../pages/components/Drawer';
import Rivers from '../../../pages/Rivers';
import { generateString, generateNumber } from '../../../support/Utils';

describe('Get rivers test', () => {
  let name;
  let secondName;
  let length;
  let secondLength;

  beforeEach(() => {
    name = generateString();
    length = generateNumber();

    secondName = generateString();
    secondLength = generateNumber();

    cy.visitPage();
    Homepage.isVisible();
    Drawer.toRivers();
  });

  it('Get rivers', () => {
    Rivers.isVisible();
    Rivers.fillRiverName(name);
    Rivers.fillRiverLength(length);
    Rivers.submit();

    cy.xpath(`//li//span[contains(text(), "${name}")]`).should('be.visible');
    cy.xpath(`//li//span[contains(text(), "${length}")]`).should('be.visible');

    Rivers.fillRiverName(secondName);
    Rivers.fillRiverLength(secondLength);
    Rivers.submit();

    cy.xpath(`//li//span[contains(text(), "${secondName}")]`).should(
      'be.visible',
    );
    cy.xpath(`//li//span[contains(text(), "${secondLength}")]`).should(
      'be.visible',
    );
  });
});
