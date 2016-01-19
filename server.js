// server.js
// load the things we need
var express = require('express');
var ejs = require('ejs');
var fs = require('fs');
var path = require("path");

var app = express();

var distPath = 'dist';
var pages = [
  {
    fileName: 'index.html',
    pageName: 'homepage.ejs'
  }, {
    fileName: 'regulamin.html',
    pageName: 'rules.ejs'
  }, {
    fileName: 'o-konkursie.html',
    pageName: 'about.ejs'
  }
];

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use('/', express.static('public'));

// homepage
app.get('/', function(req, res) {
  res.render('layout', {
    content: getPageContent('pages/homepage.ejs')
  });
});

app.get('/o-konkursie', function(req, res) {
  res.render('layout', {
    content: getPageContent('pages/about.ejs')
  });
});

app.get('/regulamin', function(req, res) {
  res.render('layout', {
    content: getPageContent('pages/rules.ejs')
  });
});

app.get('/build', function(req, res) {
  pages.forEach(function (page) {
    var fileName = path.join(distPath, page.fileName);
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
  return ejs.render(fs.readFileSync(path.join('views/', fileName), 'utf-8'));
}

function buildHtml(pageName) {
  return getPageContent('partials/head.ejs') +
         getPageContent(path.join('pages/', pageName)) +
         getPageContent('partials/footer.ejs');
}
