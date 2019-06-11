var express = require("express");
var router = express.Router();
var Article = require("../models/article");
var ObjectID = require("mongodb").ObjectID;
/* GET users listing. */
router.get("/", function(req, res, next) {
  // res.send('respond with a resource');

  Article.find()
    .sort({
      publicdate: -1
    })
    .then(result => {
      console.log(result);
      // res.send(200,result);
      res.status(200).send({
        status: 1,
        msg: "获取成功",
        data: result
      });
    });
  // res.send(200,result);
});

router.route("/:id").get(function(req, res, next) {
  // res.send('respond with a resource');
  // console.log(req);
  Article.findOne(
    {
      _id: req.params.id
    },
    (err, result) => {
      // console.log(result.clickCount);

      if (result) {
        // res.send(200,result);
        var i = result.clickCount + 1;
        res.status(200).send({
          status: 1,
          msg: "获取成功",
          data: result
        });
        Article.updateOne(
          {
            _id: ObjectID(req.params.id)
          },
          {
            // $set: {
            //   clickCount: i
            // }
            $inc: {
              clickCount: 1
            }
          },
          function(err, content) {
            // console.log(err, content)
            if (err) {
              // return res.send({
              //   status: 2,
              //   msg: err || "文章编辑失败"
              // });
            } else {
              // return res.send({
              //   status: 1,
              //   msg: "文章编辑成功"
              // });
            }
          }
        );
      } else
        res.status(200).send({
          status: 2,
          msg: "获取不成功"
        });
    }
  );
  // res.send(200,result);
});

// router.route("/:id").get(function(req, res, next) {
//   // res.send('respond with a resource');
//   console.log(req);
//   Article.findOne({ _id: req.params.id }).then((result) => {
//     console.log(result);
//     // res.send(200,result);
//     res.status(200).send({ status: 1, msg: "获取成功", data: result });
//   });
//   // res.send(200,result);
// });

module.exports = router;
