const { defineConfig } = require('cypress')

const cyPostgres = require('cypress-postgres-10v-compatibility')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        dbQuery: query => cyPostgres(
          query.query,
          query.connection
        )
      })

      return config
    },
  },
  fixturesFolder: false,
})
