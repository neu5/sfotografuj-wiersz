// server.js
// load the things we need
var express = require('express');
var ejs = require('ejs');
var fs = require('fs');

var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use('/', express.static('public'));

// homepage
app.get('/', function(req, res) {
  res.render('layout', {
    content: getPageContent('homepage')
  });
});

app.listen(8080);
console.log('server is running on localhost:8080');

function getPageContent(fileName) {
  return ejs.render(fs.readFileSync('views/pages/' + fileName + '.ejs', 'utf-8'));
}
