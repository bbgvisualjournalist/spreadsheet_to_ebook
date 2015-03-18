var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();


//Add data.json to local variables
app.locals.meta = require('./meta.json');
app.locals.chapters = require('./chapters.json');
app.locals.photos = require('./photos.json');




//jsonfile is a module for rendering pretty json that works
var fs = require('fs');
var jf = require('jsonfile');

//Load data from google spreadsheet and write it to the meta.json, photos.json and chapters.json files.
var Tabletop = require('tabletop');
var testURL = 'https://docs.google.com/spreadsheets/d/1dXbUkXlGb8GyVMdKpuJB__82MAI6-VWqhzcvq2A3rYY/pubhtml';

var myData;
function onLoad(data, tabletop) {
  console.log(data);

  //
  jf.writeFile("chapters.json", data.chapters.elements, function(err) {
    console.log(err)
  })
  jf.writeFile("meta.json", data.meta.elements, function(err) {
    console.log(err)
  })
  jf.writeFile("photos.json", data.photos.elements, function(err) {
    console.log(err)
  })
};

var options = {
  key: testURL,
  callback: onLoad
};

Tabletop.init(options);




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
