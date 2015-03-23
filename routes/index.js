var express = require('express');
var router = express.Router();



/* GET list of books and links to files. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Books'
  });
});

/* GET list of books and links to files. */
router.get('/chinese', function(req, res, next) {
  res.render('index_chinese', { 
    title: 'Books'
  });
});

/* GET book number for content.opf. */
router.get('/book/:bookNum/content.opf', function(req, res, next) {
  var bookNumber = req.params.bookNum;
  var d = new Date().toISOString();

  res.render('content', { 
  	book: bookNumber,
  	date: d
  });
});


/* GET book number for toc.xhtml. */
router.get('/book/:bookNum/toc.xhtml', function(req, res, next) {
  var bookNumber = req.params.bookNum;

  res.render('toc', { 
  	book: bookNumber
  });
});


/* GET book number for introduction.xhtml. */
router.get('/book/:bookNum/introduction.xhtml', function(req, res, next) {
  var bookNumber = req.params.bookNum;

  res.render('introduction', { 
  	book: bookNumber
  });
});


/* GET book number for bodymatter.xhtml. */
router.get('/book/:bookNum/bodymatter.xhtml', function(req, res, next) {
  var bookNumber = req.params.bookNum;
  var concat = "partials/content/chapter"+bookNumber+".ejs"

  res.render('bodymatter', { 
  	book: bookNumber,
  	chapter: concat
  });
});


/* GET book number for backmatter.xhtml. */
router.get('/book/:bookNum/backmatter.xhtml', function(req, res, next) {
  var bookNumber = req.params.bookNum;
  var concat = "partials/content/back"+bookNumber+".ejs"
  res.render('backmatter', { 
  	book: bookNumber,
  	chapter: concat
  });
});

module.exports = router;