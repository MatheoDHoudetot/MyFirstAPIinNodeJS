const express = require('express')
const bodyParser = require('body-parser')
const sha256 = require('js-sha256');
const conn = require('./db');
const app = express()
const port = 3000;
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Mon Api d\'agence immob')
})

app.post('/login', async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const hasher = sha256.create()
  const result = await conn.query("SELECT * from users WHERE username = ?", [username]);
  if (result.length > 0) {
    const hash = hasher.update(password).toString()
    if (result[0].password == hash) {
      res.send(`Vous êtes connecté avec l'utilisateur ${username}`)
    }else{
      res.send("Utilisateur ou le mot de passe n'est pas bon 2")
    }
  }else {
    res.send("Utilisateur ou le mot de passe n'est pas bon 1")
  }

})

app.post('/register' , async function(req,res) {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const result = await conn.query("SELECT * from users WHERE email = ?", [email]);
  if (result.length == 0) {
    conn.query("INSERT INTO users(username,password,email) VALUES (?,?,?)", [username,password,email])
    res.send("vous etes inscrit avec succes")
  }else {
    res.send("email deja present")
  }
  
})




console.log(`Server run on http://localhost:${port}`);
app.listen(port)