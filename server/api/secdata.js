"use strict";

var express = require('express');
var router = express.Router();
var co = require('co');
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = process.env.MONGO_URL || 'mongodb://localhost:27017/secdata';



// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function (req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

// define the home page route
router.get('/:ticker/filing', function (req, res, next) {
  let filingType = req.params.type || "10-K";

  co(function* () {
    let db = yield MongoClient.connect(url);

    let collection = db.collection("filings");

    // Peform a simple find and return all the documents
    let docs = yield collection.find({ 'TradingSymbol': req.params.ticker, "DocumentType": filingType })
      .sort({ dateFiled: -1 }).limit(1).toArray();


    // Close db
    yield db.close();

    if (docs.length) {
      res.json(docs[0]);
    } else {
      res.status(404).json({ message: `No ${filingType} filings found for ${req.params.ticker}` });
    }
  }).catch(err => {
    console.error(err.stack);
    res.status(500).json(err);
  });
});

// define the about route
router.get('/about', function (req, res) {
  res.send('About birds');
});

module.exports = router;