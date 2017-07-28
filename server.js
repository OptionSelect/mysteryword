const fs = require('fs')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express')
const expressValidator = require('express-validator')
const words = fs.readFileSync('/usr/share/dict/words', 'utf-8').toLowerCase().split('\n')
let underscores = []
let guesses = []
let count = 8

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())

app.engine('mst', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mst')

let randomWord = function() {
  let i = Math.floor(Math.random() * words.length)
  return words[i]
}

let newword = randomWord()
console.log(newword)

for (let x = 0; x < newword.length; x++) {
  underscores.push('_')
}

app.get('/', (req, res) => {
  res.render('home', { underscores: underscores, guesses: guesses })
})

app.post('/', (req, res) => {
  guesses.push(req.body.guess)
  res.redirect('/')
})

app.listen(3000, () => {
  console.log('JUST')
})
