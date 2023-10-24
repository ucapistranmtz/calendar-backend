const express = require('express');
const cors = require('cors');
require('dotenv/config');

const { dbConnection } = require('./database/config');
// express server
const app = express();

// database
dbConnection();
// CORS
 var corsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
} 
app.use(cors(corsOptions));
 

// public directory

app.use(express.static('public'));

// body parser

app.use(express.json());

// Routes
// Auth
app.use('/api/auth', require('./routes/auth'));
// Events
app.use('/api/events', require('./routes/events'));

app.get('*', (req, res) => {
  res.send(__dirname + '/public/index.html');
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
