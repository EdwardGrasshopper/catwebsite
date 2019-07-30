const express = require('express');
const app = express();
let counter = 0;

app.get('/', function (req, res) {
  counter++;
  console.log(counter);
  console.log("You're making a root request");
  res.send(`number of times viewed: ${counter}`);
})
app.get('/cats/curie', function (req, res) {
  res.send(`
  <body style="background-color: cyan"> 
    <H1> Curie says hello </H1>
  </body>
  `);
})
app.get('/cats/markov', function (req, res) {
  res.send('Markov says hello');
})
app.listen(8080);
