var express = require('express');
var router = express.Router();
var db = require('../api/db.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  let post =[{
    title:"第一篇",
     content:"完犊子"

  }]
  db.addpost(post)

});

module.exports = router;
