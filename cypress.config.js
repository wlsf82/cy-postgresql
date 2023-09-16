const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        dbQuery: query => require('cypress-postgres-10v-compatibility')(
          query.query,
          query.connection
        )
      })

      return config
    },
  },
  fixturesFolder: false,
})
