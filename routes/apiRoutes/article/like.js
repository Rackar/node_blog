// var express = require('./node_modules/express');
// var router = express.Router();
var Article = require("../../../models/article");
var ObjectID = require("mongodb").ObjectID;
var like = function(req, res, next) {
  // res.send('respond with a resource');
  let params = req.body;
  let params_deco = req.decoded;

  Article.updateOne(
    { _id: ObjectID(params._id) },
    {
      $addToSet: {
        liked: [
          {
            userid: ObjectID(params.userid),
            username: params.username
          }
        ]
      }
    },
    function(err, content) {
      if (err) {
        return res.send({ status: 2, msg: err || "点赞失败" });
      } else {
        return res.send({ status: 1, msg: "点赞成功" });
      }
    }
  );
};

module.exports = like;
