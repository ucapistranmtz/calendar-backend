const express = require('express')
const cors = require('cors')
require('dotenv/config')

const { dbConnection } = require('./database/config')
// express server
const app = express()

// database
dbConnection()
// CORS
app.use(cors())

// public directory

app.use(express.static('public'))

// body parser

app.use(express.json())

// Routes
// Auth
app.use('/api/auth', require('./routes/auth'))
// Events
app.use('/api/events', require('./routes/events'))

const port = process.env.PORT
app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`)
})
