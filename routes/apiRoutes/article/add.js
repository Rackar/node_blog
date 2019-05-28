// var express = require('./node_modules/express');
// var router = express.Router();
var Article = require("../../../models/article");
var ObjectID = require('mongodb').ObjectID;
var add = function(req, res, next) {
  // res.send('respond with a resource');
  let params = req.body;
  let params_deco = req.decoded;
  var article = new Article({
    content: params.content,
    output: params.output,
    title: params.title,
    publicdate: new Date(),
    username: params_deco.username,
    userid: ObjectID(params_deco.userid)  //带上用户名和id
  });
  article.save(function(err, content) {
    if (err) {
      return res.send({ status: 0, msg: err || "文章发布失败" });
    } else {
      return res.send({ status: 1, msg: "文章发布成功" });
    }
  });
};

module.exports = add;
