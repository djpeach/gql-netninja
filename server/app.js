const express = require('express')
const logger = require('easy-log')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(cors())
const port = 4000
const appLogger = logger('app:app')
const dbLogger = logger('app:db')

mongoose.connect('mongodb://djpeach:_eyEKTb626t!Lu@ds123399.mlab.com:23399/gql-netninja')
mongoose.connection.once('open', () => {
  dbLogger(`Connected to mongodb`)
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}))

app.listen(port, () => {
  appLogger(`Listening on port ${port}`)
})
