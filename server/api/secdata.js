"use strict";

var express = require('express');
var router = express.Router();
var co = require('co');
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = process.env.MONGO_URL || 'mongodb://localhost:27017/secdata';

// define the home page route
router.get('/', function (req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

// define the home page route
router.get('/symbols/search/:ticker', function (req, res, next) {
  
  co(function* () {
    let db = yield MongoClient.connect(url);

    let collection = db.collection("symbols");

    // Peform a simple find and return all the documents
    let docs = yield collection.find({ 'Symbol': {$regex: '^' + req.params.ticker, $options:"i"} }).limit(10).toArray();

    // Arbitrary delay (for local testing of loading states)
    //yield new Promise((resolve, reject) => setTimeout(() => resolve({delayed: true}), 2000) ); // 2 seconds pass..
    
    // Close db
    yield db.close();

    if (docs.length) {
      res.json(docs);
    } else {
      res.status(404).json({ message: `No symbol data found for ${req.params.ticker}` });
    }
  }).catch(err => {
    console.error(err.stack);
    res.status(500).json(err);
  });
});

// define the home page route
router.get('/:ticker/symbol', function (req, res, next) {
  
  co(function* () {
    let db = yield MongoClient.connect(url);

    let collection = db.collection("symbols");

    // Peform a simple find and return all the documents
    let docs = yield collection.find({ 'Symbol': req.params.ticker }).limit(1).toArray();

    // Close db
    yield db.close();

    if (docs.length) {
      res.json(docs[0]);
    } else {
      res.status(404).json({ message: `No symbol data found for ${req.params.ticker}` });
    }
  }).catch(err => {
    console.error(err.stack);
    res.status(500).json(err);
  });
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

    // Arbitrary delay (for local testing of loading states)
    //yield new Promise((resolve, reject) => setTimeout(() => resolve({delayed: true}), 2000) ); // 2 seconds pass..

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

module.exports = router;