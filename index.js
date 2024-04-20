const express = require('express')
const app = express()
const port = 3000;



app.get('/', function (req, res) {
  res.send('Mon Api d\'agence immob')
})






console.log(`Server run on http://localhost:${port}`);
app.listen(port)