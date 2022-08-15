
describe('Home Spec', () => {
  it('Page loads and content is visible', () => {
    cy.visitHome();
    cy.log("content is visible");
    cy.contains("This app uses backend to store").should("exist");
    cy.log("footer is visible")
    cy.contains("assignment and learning targets").should("exist");
    cy.log("app header bar is visible")
    cy.get('.app-bar-button').should('have.length', 3);
  })
})