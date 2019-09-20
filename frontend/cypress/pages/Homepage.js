class Homepage {
  static isVisible() {
    cy.location().should(location => {
      expect(location.pathname).to.eq('/');
    });

    cy.get('h5')
      .contains('HOME PAGE')
      .should('be.visible');
  }
}

export default Homepage;
