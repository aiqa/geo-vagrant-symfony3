class Drawer {
  static openDrawer() {
    cy.get('button[aria-label="Menu button"]').click();
  }

  static toHome() {
    this.openDrawer();
    cy.get('div[aria-label=home]').click();
  }

  static toCities() {
    this.openDrawer();
    cy.get('div[aria-label="Cities"]').click();
  }

  static toRivers() {
    this.openDrawer();
    cy.get('div[aria-label="Rivers"]').click();
  }

  static toMountains() {
    this.openDrawer();
    cy.get('div[aria-label="Mountains"]').click();
  }
}
export default Drawer;
