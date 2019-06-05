// var express = require('./node_modules/express');
// var router = express.Router();
var List = require("../../../models/list");
var ObjectID = require("mongodb").ObjectID;
var removeAritcle = function(req, res, next) {
  // res.send('respond with a resource');
  let params = req.body;
  let params_deco = req.decoded;

  List.findOne(
    {
      _id: ObjectID(params._id),
      "articles.id": ObjectID(params.aid)
    },
    {
      "articles.$": 1
    }
  ).then(result => {
    console.log(result);
    if (result) {
      List.updateOne(
        {
          _id: ObjectID(params._id)
        },
        {
          $pull: {
            articles: {
              id: ObjectID(params.aid)
            }
          }
        },
        function(err) {
          if (err) {
            res.send({
              status: 2,
              msg: err || "文集移除文章失败"
            });
            console.log(err);
          } else {
            res.send({
              status: 1,
              msg: "文集移除文章成功"
            });
          }
        }
      );
    } else {
      res.send({
        status: 2,
        msg: err || "文集移除文章操作失败：未找到匹配"
      });
    }
  });
};

module.exports = removeAritcle;
