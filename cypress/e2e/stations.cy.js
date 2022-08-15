
describe("Stations Spec", () => {
  it("Should show stations page and list of stations", () => {
    cy.visitHome();
    cy.contains("Stations").first().click();
    cy.url().should("contain", "stations");
    cy.log("Content renders")
    cy.contains("Stations page").should("exist");
    cy.log("Use filter and list shows value")
    cy.get("#station-name").clear().type("Bermudankuja");
    cy.contains("Atlantinkatu").should("exist");
  })
})