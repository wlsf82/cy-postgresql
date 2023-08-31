module.exports = (on, config) => {
  on('task', {
    dbQuery: query => require('cypress-postgres-10v-compatibility')(
      query.query,
      query.connection
    )
  })

  return config
}
