var User = require("../../models/user");
var jwt = require("jsonwebtoken"); // 使用jwt签名
var config = require("../../config"); // 使用jwt签名
var ObjectID = require('mongodb').ObjectID;
var user = function(req, res, next) {
  
  var id = req.params.id;
  User.findOne({ _id: ObjectID(id) }, function(err, content) {
    if (err) {
      return res.send({ status: 0, msg: err || "登录失败" });
    } else {
      var userData = {
        username:content.username,
        following: content.following,
        followed: content.followed,
        count: 
          {
            followed:   content.count.followed,
            following:   content.count.following,
            like:       content.count.like,
            liked:      content.count.liked,
            articles:   content.count.articles,
            words:      content.count.words
          }
        };
      
        return res.send({ status: 1, msg: "登录成功", data: userData });
      
    }
  });
};
module.exports = user;
