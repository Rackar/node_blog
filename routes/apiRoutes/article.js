var express = require('express');
var router = express.Router();
// var db = require('../api/db.js')



router.post('/', function(req, res, next) {
  // res.send('respond with a resource');
  let params = req.body
  let post =params
  db.addpost(post)

});

module.exports = router;
