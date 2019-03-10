var express = require('express');
var router = express.Router();
var db = require('../db');


router.get('/all', function(req, res, next) {
  db.query("select * from songs", (error, result, fields) => {
    if (error) {
      res.status(500).send(error);
    }
    res.send(result);
  });
});

router.get('/simple', function(req, res, next) {
  db.query("select name, artist from songs", (error, result, fields) => {
    if (error) {
      res.status(500).send(error);
    }
    res.send(result);
  });
});

router.get('/genre/:genre', function(req, res, next) {
  var sqlQuery = "select * from songs where genre=?";
  db.query(sqlQuery, [req.params.rating], (error, result, fields) => {
    if (error) {
      res.status(500).send(error);
    }
    res.send(result);
  });
});



router.post('/addMusic', function(req,res,next){
  var query = "INSERT INTO songs (name, artist, year, genre) "
    +"VALUES ( ?, ?, ?, ?);"
  var queryParams = [
    req.body.name,
    req.body.artist,
    req.body.year,
    req.genre
  ];

  db.query(query, queryParams, (error, result, fields) => {
    if (error){
      res.status(500).send(error);
    }
    res.status(201).send('record added');
  });
});

router.get('/:id', function(req, res, next) {
  var sqlQuery = "select * from songs where song_id=?";
  db.query(sqlQuery, [req.params.id], (error, result, fields) => {
    if (error) {
      res.status(500).send(error);
    }
    res.send(result);
  });
});

module.exports = router;
