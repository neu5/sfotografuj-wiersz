// server.js
// load the things we need
var express = require('express');
var ejs = require('ejs');
var fs = require('fs');

var app = express();

var distPath = 'dist/';
var pages = [
  {
    fileName: 'index.html',
    pageName: 'homepage'
  }, {
    fileName: 'regulamin.html',
    pageName: 'rules'
  }
];

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use('/', express.static('public'));

// homepage
app.get('/', function(req, res) {
  res.render('layout', {
    content: getPageContent('pages/homepage')
  });
});

app.get('/regulamin', function(req, res) {
  res.render('layout', {
    content: getPageContent('pages/rules')
  });
});

app.get('/build', function(req, res) {
  pages.forEach(function (page) {
    var fileName = distPath + page.fileName;
    var stream = fs.createWriteStream(fileName);

    stream.once('open', function(fd) {
      var html = buildHtml(page.pageName);
      stream.end(html);
    });
  });

  res.send('build succeeded');
});

app.listen(8080);
console.log('server is running on localhost:8080');

function getPageContent(fileName) {
  return ejs.render(fs.readFileSync('views/' + fileName + '.ejs', 'utf-8'));
}

function buildHtml(pageName) {
  return getPageContent('partials/head') + getPageContent('pages/' + pageName) + getPageContent('partials/footer');
}
