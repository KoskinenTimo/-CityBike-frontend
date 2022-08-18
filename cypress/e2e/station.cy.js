const station = 'Sompasaari';

describe('Station Spec', () => {
  it('Should show station details page', () => {
    cy.intercept('GET','http://localhost:8080/api/stations*').as('getAllStations');
    cy.visitHome();

    cy.log('navigate to Stations page');
    cy.contains('button','Stations').click();
    cy.url().should('contain', 'stations');

    cy.log('stations renders');
    cy.contains('Stations page').should('exist');
    cy.wait('@getAllStations');

    cy.log('use filter and list shows value');
    cy.get('#station-name').clear().type(station);
    cy.contains(station).click();

    cy.log('content renders');
    cy.wait('@getAllStations');
    cy.url().should('contain', 404);
    cy.contains('Station: ').should('exist');
    cy.contains('Address:')
    cy.contains('Sompasaarenlaituri')
    cy.contains('Go Back').click();
    cy.url().should('contain', 'stations');
  })
})