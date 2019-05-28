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

router.route('/:id').get(function(req, res, next) {
  // res.send('respond with a resource');
console.log(req)
   db.find(req.params.id).then((result)=>{
    console.log(result)
    // res.send(200,result);
    res.status(200).send(result)
  })
  // res.send(200,result);
});



module.exports = router;
