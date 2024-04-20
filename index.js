const express = require('express')
const app = express()
const port = 3000;



app.get('/', function (req, res) {
  res.send('Hello World')
})





console.log(`Server run on http://localhost:${port}`);
app.listen(port)