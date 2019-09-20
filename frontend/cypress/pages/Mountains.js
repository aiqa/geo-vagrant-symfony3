class Mountains {
  static isVisible() {
    cy.location().should(location => {
      expect(location.pathname).to.eq('/mountain');
    });

    cy.get('h4')
      .contains('Mountains')
      .should('be.visible');
  }

  /**
   * @params name - type string
   */
  static fillMountainName = name => {
    cy.get('input[id=mountainName]')
      .clear()
      .type(name);
    return this;
  };

  /**
   * @params height - type number
   */
  static fillMountainHeight = height => {
    cy.get('input[id=mountainHeight]')
      .clear()
      .type(height);
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
  static fillNewMountainName = name => {
    cy.get('input[id=newMountainName]')
      .clear()
      .type(name);
    return this;
  };

  /**
   * @params height - type number
   */
  static fillNewMountainHeight = height => {
    cy.get('input[id=newMountainHeight]')
      .clear()
      .type(height);
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
export default Mountains;
