describe("Station Spec", () => {
  it("Should show station details page", () => {
    cy.visitHome();
    cy.contains("Stations").first().click();
    cy.url().should("contain", "stations");
    cy.get("#station-name").clear().type("Sompasaari");
    cy.contains("Sompasaari");
    cy.get(".MuiTableBody-root > .MuiTableRow-root > :nth-child(1)").first().click();
    cy.log("Content renders")
    cy.url().should("contain", 404);
    cy.contains("Station: ").should("exist");
    cy.contains("Address:")
    cy.contains("Sompasaarenlaituri")
    cy.contains("Go Back").click();
  })
})