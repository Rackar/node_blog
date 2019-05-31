// var express = require('./node_modules/express');
// var router = express.Router();
var Article = require("../../../models/article");
var ObjectID = require("mongodb").ObjectID;
var like = function (req, res, next) {
  // res.send('respond with a resource');
  let params = req.body;
  let params_deco = req.decoded;

  Article.findOne({
    _id: ObjectID(params._id),
    "liked.userid": ObjectID(params.userid)
  }, {
    "liked.$": 1
  }).then(result => {
    console.log(result);
    if (result) {
      Article.updateOne({
        _id: ObjectID(params._id)
      }, {
        $pull: {
          liked: {
            userid: ObjectID(params.userid)
          }
        }
      }, function (err) {
        if (err) {
          res.send(500);
          console.log(err);
        } else {
          return res.send({
            status: 1,
            msg: "取消点赞成功"
          });
        }
      });

      
    } else {
      Article.updateOne({
          _id: ObjectID(params._id)
        }, {
          $addToSet: {
            liked: [{
              userid: ObjectID(params.userid),
              username: params.username
            }]
          }
        },
        function (err, content) {
          if (err) {
            return res.send({
              status: 2,
              msg: err || "点赞失败"
            });
          } else {
            return res.send({
              status: 1,
              msg: "点赞成功"
            });
          }
        }
      );
    }
    // res.send(200,result);
    // res.status(200).send({ status: 1, msg: "获取成功", data: result });
  });




};

module.exports = like;