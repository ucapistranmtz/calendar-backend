const express = require('express');
require('dotenv/config');
//express server
const app = express();

//public directory

app.use(express.static('public'));

//body parser

app.use(express.json());

// Routes
//TODO: auth
app.use('/api/auth', require('./routes/auth'));

//TODO: CRUD

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
