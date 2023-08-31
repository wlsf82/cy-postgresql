Cypress.Commands.add('runSQL', sql => {
  cy.task('dbQuery', {
    query: sql,
    connection: Cypress.env('db'),
  })
})
