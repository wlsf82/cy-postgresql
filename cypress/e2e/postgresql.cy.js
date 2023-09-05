describe('PostgreSQL', () => {
  beforeEach(() => {
    // DELETE
    cy.runSQL("DELETE FROM employee_data WHERE name='mary';")
      .then(() => {
        cy.log('Table row deleted')
      })

    // SELECT
    cy.runSQL("SELECT * FROM employee_data WHERE name='mary';")
      .then(queryResponse => {
        expect(queryResponse.length).to.equal(0)
      })
  })

  it('queries on the `employee_data` table', () => {
    cy.runSQL('SELECT * FROM employee_data;')
      .then(queryResponse => {
        expect(queryResponse.length).to.equal(1)

        const { name, age, designation, salary } = queryResponse[0]

        expect(name).to.equal('john')
        expect(age).to.equal(27)
        expect(designation).to.equal('engineer')
        expect(salary).to.equal(9000)
      })
  })

  it('INSERT, SELECT, and UPDATE into/from the `employee_data` table', () => {
    // INSERT
    cy.runSQL("INSERT INTO employee_data(name, age, designation, salary) VALUES ('mary', 30, 'ceo', 50000);")

    // SELECT
    cy.runSQL('SELECT * FROM employee_data;')
      .then(queryResponse => {
        expect(queryResponse.length).to.equal(2)
      })

    // SELECT
    cy.runSQL("SELECT * FROM employee_data WHERE name='mary';")
      .then(queryResponse => {
        expect(queryResponse.length).to.equal(1)

        const { name, age, designation, salary } = queryResponse[0]

        expect(name).to.equal('mary')
        expect(age).to.equal(30)
        expect(designation).to.equal('ceo')
        expect(salary).to.equal(50000)
      })

    // UPDATE
    cy.runSQL("UPDATE employee_data SET designation = 'CEO' WHERE name='mary';")

    // SELECT
    cy.runSQL("SELECT * FROM employee_data WHERE name='mary';")
      .then(queryResponse => {
        expect(queryResponse.length).to.equal(1)

        const { designation } = queryResponse[0]

        expect(designation).to.equal('CEO')
      })
  })
})
