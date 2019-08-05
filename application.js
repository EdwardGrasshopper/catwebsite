const express = require('express');
var ejs = require('ejs');
var fs = require('fs');
var bodyParser = require('body-parser');
const expressFileUpload = require('express-fileupload');

const app = express();

let counter = 0;

let choices = ['skyblue', 'cyan', 'blue', 'blueviolet', 'orange'];
function getRandomColor() {
  var randomNumber = Math.floor(Math.random() * choices.length)
  var randomColor = choices[randomNumber];
  return randomColor;
}

let catstatuses = {
  curie: "bored",
  markov: "not hungry",
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('assets'))
app.use(expressFileUpload({
  useTempFiles : true,
  tempFileDir : './tmp/'
}));


app.get('/', function (req, res) {
  counter++;
  var indexcontents = fs.readFileSync('index.html.ejs', 'utf8');
  const randomColor = getRandomColor();
  var renderedIndexContents = ejs.render(indexcontents, { counter: counter, randomColor: randomColor})
  res.send(renderedIndexContents);
  console.log(renderedIndexContents);

})
app.get('/cats/curie', function (req, res) {
  counter++;
  var contents = fs.readFileSync('cat.html.ejs', 'utf8');
  var renderedContents = ejs.render(contents, { catname: 'curie', catname2: 'markov', catstatus: catstatuses['curie'] })
  res.send(renderedContents);
  console.log(renderedContents);
})

app.get('/cats/markov', function (req, res) {
  counter++;
  var contents = fs.readFileSync('cat.html.ejs', 'utf8');
  var renderedContents = ejs.render(contents, { catname: 'markov', catname2: 'curie', catstatus: catstatuses['markov']  })
  res.send(renderedContents);
  console.log(renderedContents);
})

app.post('/cats/create', function (req, res) {
  res.redirect(`/cats/${req.body.catname}`)
  catstatuses[req.body.catname] = req.body.status;
  console.log(req.body);
})

app.post('/cats/photo', function (req, res) {
  res.redirect(`./${req.body.catname}`)
  console.log(req.files.photo) 
  req.files.photo.mv(`./assets/${req.body.catname}.jpg`);
  
})

app.get('/cats.json', function (req, res) {
  res.send(catstatuses)
})
app.listen(8080);




