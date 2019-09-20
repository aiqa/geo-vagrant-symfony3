class Cities {
  static isVisible() {
    cy.location().should(location => {
      expect(location.pathname).to.eq('/city');
    });

    cy.get('h4')
      .contains('Cities')
      .should('be.visible');
  }

  /**
   * @params name - type string
   */
  static fillCityName = name => {
    cy.get('input[id=cityName]')
      .clear()
      .type(name);
    return this;
  };

  /**
   * @params population - type number
   */
  static fillCityPopulation = population => {
    cy.get('input[id=cityPopulation]')
      .clear()
      .type(population);
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
  static fillNewCityName = name => {
    cy.get('input[id=newCityName]')
      .clear()
      .type(name);
    return this;
  };

  /**
   * @params population - type number
   */
  static fillNewCityPopulation = population => {
    cy.get('input[id=newCityPopulation]')
      .clear()
      .type(population);
    return this;
  };

  static submitEdited = () => {
    cy.xpath('(//span[contains(text(), "Submit")])[2]').click();
  };

  /**
   * @params name - type string
   */
  static delete = name => {
    cy.xpath(
      `(//span[contains(text(), "${name}")]/parent::div/parent::li//button)[2]`,
    ).click();
  };
}
export default Cities;
