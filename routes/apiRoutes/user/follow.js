// var express = require('./node_modules/express');
// var router = express.Router();
var User = require("../../../models/user");
var ObjectID = require("mongodb").ObjectID;
var follow = function(req, res, next) {
  // res.send('respond with a resource');
  let params = req.body;
  let params_deco = req.decoded;

  User.updateOne(
    { _id: ObjectID(params._id) },
    {
      $addToSet: {
        following: [
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

module.exports = follow;
