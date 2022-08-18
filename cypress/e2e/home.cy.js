
describe('Home Spec', () => {
  it('Page loads and content is visible', () => {
    cy.visitHome();
    cy.log('content is visible');
    cy.contains('This app uses backend to store').should('exist');
    cy.log('footer is visible')
    cy.contains('assignment and learning targets').should('exist');
    cy.log('all header bar buttons are visible');
    cy.get('button').contains('Home');
    cy.get('button').contains('Stations');
    cy.get('button').contains('Journeys');
  })
})