var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var app = express();
var Tabletop = require('tabletop');
var fs = require('fs');
var jf = require('jsonfile');


var config = require('./config');
var spreadsheetURL = config.spreadsheet;


//Add a simple function for reading files.
function readJSONFile( path ){
	//Added a simple check to see if the JSON files exist.
	var binaryData;
	try {
		binaryData = fs.readFileSync( path);
		return JSON.parse( binaryData.toString() );
	} catch (e) {
		if (e.code === 'ENOENT') {
			console.log(path + ' not found!');
			console.log(path + ' needs to be created once before the site will work properly.')
			console.log("(Normally there's about a 1-minute delay.)")

			binaryData = {};
			return binaryData;
		} else {
			throw e;
		} 
	}
}



var sheets = config.sheet;
global.book = {};

if (!fs.existsSync('data')) fs.mkdirSync('data');

for (var i = 0; i<sheets.length; i++){
	//Use namespaced global variable to keep data that will update.
	//EXAMPLE: global.meta = {};
	global.book[sheets[i]] = {};

	//Load data from saved JSON files into global variables.
	//EXAMPLE: global.meta = readJSONFile('./data/meta.json');
	var filename = './data/' + sheets[i] + '.json'
	global.book[sheets[i]] = readJSONFile(filename);
}






//Toggle for offline use; ignores Google spreadsheet request.
var offlineMode = config.offline;


//Add a timer to periodically update data for edits.
setInterval(fetchData, config.timer);


//Load data from google spreadsheet and write it to the meta.json, photos.json and chapters.json files.
function fetchData(){
	if (!offlineMode){
		var myData;
		function onLoad(data, tabletop) {
			console.log("loading, updating and saving data from spreadsheet");


			//Write updated data to .JSON files and update global variables.
			/*
			 jf.writeFile("data/titlepage.json", data.titlepage.elements, function(err) {
				 global.book.titlepage = readJSONFile('./data/titlepage.json');
			 })
			*/
			var currentNumber=0;
			function writeJSON(){
				if(currentNumber<sheets.length){
					var filename = './data/' + sheets[currentNumber] + '.json'

					jf.writeFile(filename, data[sheets[currentNumber]].elements, function(err) {
						global[sheets[currentNumber]] = readJSONFile(filename);

						currentNumber++;
						writeJSON();
					})
				}
			}
			writeJSON();
		};

		var options = {
			key: spreadsheetURL,
			callback: onLoad
		};

		Tabletop.init(options);
	}
}



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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});


// error handlers

//When you're ready to be in production mode, uncomment this:
//app.set('env', 'production')

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