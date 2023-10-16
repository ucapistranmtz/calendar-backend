const express = require('express');

//express server
const app = express();

const port = 4000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
