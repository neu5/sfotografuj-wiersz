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
    pageName: 'homepage.ejs',
    endpoint: '/'
  }, {
    fileName: 'regulamin.html',
    pageName: 'rules.ejs',
    endpoint: '/regulamin'
  }, {
    fileName: 'o-konkursie.html',
    pageName: 'about.ejs',
    endpoint: '/o-konkursie'
  }, {
    fileName: 'zglos-sie.html',
    pageName: 'apply.ejs',
    endpoint: '/zglos-sie'
  }
];

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use('/', express.static('public'));

// loop for default endpoints
pages.forEach(function (page) {
  app.get(page.endpoint, function(req, res) {
    res.render('layout', {
      content: getPageContent(path.join('pages', page.pageName))
    });
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
  return ejs.render(fs.readFileSync(path.join('views', fileName), 'utf-8'));
}

function buildHtml(pageName) {
  return getPageContent('partials/head.ejs') +
         getPageContent(path.join('pages', pageName)) +
         getPageContent('partials/footer.ejs');
}
