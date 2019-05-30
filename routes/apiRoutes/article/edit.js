// var express = require('./node_modules/express');
// var router = express.Router();
var Article = require("../../../models/article");
var ObjectID = require("mongodb").ObjectID;
var edit = function(req, res, next) {
  // res.send('respond with a resource');
  let params = req.body;
  let params_deco = req.decoded;

  Article.updateOne(
    { _id: ObjectID(params._id) },
    {
      $set: {
        title: params.title,
        content: params.content,
        output: params.output
      }
    },
    function(err, content) {
      if (err) {
        return res.send({ status: 2, msg: err || "文章编辑失败" });
      } else {
        return res.send({ status: 1, msg: "文章编辑成功" });
      }
    }
  );
};

module.exports = edit;
