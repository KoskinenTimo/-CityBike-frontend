
describe('Journeys Spec', () => {
  it('Page loads and content is visible', () => {
    cy.visitHome();
    cy.contains("Journeys").first().click();
    cy.url().should("contain", "journeys");
    cy.log("Journeys renders")
    cy.contains("Journeys page").should("exist");
    cy.log("Use filter and list shows value");
    cy.wait(1000);
    cy.get("#station-name").clear().type("Cable Factory");
    cy.contains("Search").first().click();
    cy.contains("Cable Factory").should('exist');
  })
})