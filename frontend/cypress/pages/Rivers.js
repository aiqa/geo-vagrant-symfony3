class Rivers {
  static isVisible() {
    cy.location().should(location => {
      expect(location.pathname).to.eq('/river');
    });

    cy.get('h4')
      .contains('Rivers')
      .should('be.visible');
  }

  /**
   * @params name - type string
   */
  static fillRiverName = name => {
    cy.get('input[id=riverName]')
      .clear()
      .type(name);
    return this;
  };

  /**
   * @params length - type number
   */
  static fillRiverLength = length => {
    cy.get('input[id=riverLength]')
      .clear()
      .type(length);
    return this;
  };

  static submit = () => {
    cy.get('button[type=submit]').click();
  };

  static edit = name => {
    cy.xpath(
      `(//span[contains(text(), "${name}")]/parent::div/parent::li//button)[1]`,
    ).click();
  };

  /**
   * @params name - type string
   */
  static fillNewRiverName = name => {
    cy.get('input[id=newRiverName]')
      .clear()
      .type(name);
    return this;
  };

  /**
   * @params length - type number
   */
  static fillNewRiverLength = length => {
    cy.get('input[id=newRiverLength]')
      .clear()
      .type(length);
    return this;
  };

  static submitEdited = () => {
    cy.xpath('(//span[contains(text(), "Submit")])[2]').click();
  };

  static delete = name => {
    cy.xpath(
      `(//span[contains(text(), "${name}")]/parent::div/parent::li//button)[2]`,
    ).click();
  };
}
export default Rivers;
