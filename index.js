const express = require('express');
require('dotenv/config');
//express server
const app = express();

//public directory

app.use(express.static('public'));

//first route

/* app.get('/',(req,res)=> {

    console.log('/ required')
    res.status=200
    res.json({
        ok:true
    })
}) */

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
