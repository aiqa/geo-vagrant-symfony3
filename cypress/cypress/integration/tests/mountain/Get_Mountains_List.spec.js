import Homepage from '../../../pages/Homepage';
import Drawer from '../../../pages/components/Drawer';
import Mountains from '../../../pages/Mountains';
import { generateString, generateNumber } from '../../../support/Utils';

describe('Get mountains list test', () => {
  let name;
  let secondName;
  let height;
  let secondHeight;

  beforeEach(() => {
    name = generateString();
    height = generateNumber();

    secondName = generateString();
    secondHeight = generateNumber();

    cy.visitPage();
    Homepage.isVisible();
    Drawer.toMountains();
  });

  it('Get mountains list', () => {
    Mountains.isVisible();
    Mountains.fillMountainName(name);
    Mountains.fillMountainHeight(height);
    Mountains.submit();

    cy.xpath(`//li//span[contains(text(), "${name}")]`).should('be.visible');
    cy.xpath(`//li//span[contains(text(), "${height}")]`).should('be.visible');

    Mountains.fillMountainName(secondName);
    Mountains.fillMountainHeight(secondHeight);
    Mountains.submit();

    cy.xpath(`//li//span[contains(text(), "${secondName}")]`).should(
      'be.visible',
    );
    cy.xpath(`//li//span[contains(text(), "${secondHeight}")]`).should(
      'be.visible',
    );
  });
});
