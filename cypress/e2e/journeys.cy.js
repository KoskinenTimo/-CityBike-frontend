const station = 'Cable Factory';

describe('Journeys Spec', () => {
  it('Page loads and content is visible', () => {
    cy.intercept('GET','http://localhost:8080/api/journeys*').as('getAllJourneys');
    cy.visitHome();

    cy.log('navigate to Journeys page');
    cy.contains('button','Journeys').click();
    cy.url().should('contain', 'journeys');

    cy.log('Journeys renders')
    cy.contains('Journeys page').should('exist');
    cy.wait('@getAllJourneys');

    cy.log('use filter and list shows value');
    cy.get('#station-name').clear().type(station);
    cy.wait('@getAllJourneys')
      .its('response.statusCode')
      .should('eq', 200);
    cy.get(`td:contains('${station}')`).should('have.length', 20);

    cy.log('return station column title is not selected');
    cy.get('th').contains('Return station')
      .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
      .not()
      .get('svg')
      
    cy.log('change order by clicking return station');
    cy.get('th').contains('Return station').click();
    cy.contains('Return station').parentsUntil('tr').within(() => {
      cy.get('svg').should('have.attr', 'data-icon', 'chevronDown');
    });
    cy.contains('Departure station').parentsUntil('tr').within(() => {
      cy.get('svg').should('not.exist');
    });
    cy.contains('Return station').parentsUntil('tr')
      .should('have.class', 'active')
      .should('have.css', 'background-color', 'rgba(186, 104, 200, 0.4)');

    cy.log('change order by clicking same column again');
    cy.get('th').contains('Return station').click();
    cy.contains('Return station').parentsUntil('tr').within(() => {
      cy.get('svg').should('have.attr', 'data-icon', 'chevronUp');
    });
  })
})