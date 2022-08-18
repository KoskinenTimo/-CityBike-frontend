const station = 'Sompasaari';

describe("Stations Spec", () => {
  it("Should show stations page and list of stations", () => {
    cy.intercept('GET','http://localhost:8080/api/stations*').as('getAllStations');
    cy.visitHome();

    cy.log('navigate to Stations page');
    cy.contains('button','Stations').click();
    cy.url().should('contain', 'stations');

    cy.log('Stations renders');
    cy.contains('Stations page').should('exist');
    cy.wait('@getAllStations');

    cy.log('use filter and list shows value');
    cy.get('#station-name').clear().type(station);
    cy.wait('@getAllStations')
      .its('response.statusCode')
      .should('eq', 200);
    cy.get(`td:contains('${station}')`).should('have.length.at.least', 1);

    cy.log('change order by clicking Osoite column');
    cy.get('th').contains('Osoite').click();
    cy.contains('Osoite').parentsUntil('tr').within(() => {
      cy.get('svg').should('have.attr', 'data-icon', 'chevronDown');
    });
    cy.contains('Nimi').parentsUntil('tr').within(() => {
      cy.get('svg').should('not.exist');
    });
    cy.contains('Osoite').parentsUntil('tr')
    .should('have.class', 'active')
    .should('have.css', 'background-color', 'rgba(186, 104, 200, 0.4)');

    cy.log('change order by clicking same column again');
    cy.get('th').contains('Osoite').click();
    cy.contains('Osoite').parentsUntil('tr').within(() => {
      cy.get('svg').should('have.attr', 'data-icon', 'chevronUp');
    });
  })
})