var express = require('express');
var router = express.Router();
var db = require('../api/db.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');

  var result = db.findAll().then((result)=>{
    console.log(result)
    // res.send(200,result);
    res.status(200).send(result)
  })
  // res.send(200,result);
});

router.post('/', function(req, res, next) {
  // res.send('respond with a resource');
  let params = req.body
  let post =params
  db.addpost(post)

});

module.exports = router;
