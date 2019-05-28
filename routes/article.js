var express = require("express");
var router = express.Router();
var Article = require("../models/article");
/* GET users listing. */
router.get("/", function(req, res, next) {
  // res.send('respond with a resource');

  var result = Article.find().then(result => {
    console.log(result);
    // res.send(200,result);
    res.status(200).send({ status: 1, msg: "获取成功", data: result });
  });
  // res.send(200,result);
});



router.route("/:id").get(function(req, res, next) {
  // res.send('respond with a resource');
  console.log(req);
  Article.findOne({ _id: req.params.id }).then(result => {
    console.log(result);
    // res.send(200,result);
    res.status(200).send({ status: 1, msg: "获取成功", data: result });
  });
  // res.send(200,result);
});

module.exports = router;
