var User = require("../../models/user");
var jwt = require("jsonwebtoken"); // 使用jwt签名
var config = require("../../config"); // 使用jwt签名
var ObjectID = require("mongodb").ObjectID;
var user = function (req, res, next) {
  var id = req.params.id;
  User.findOne({
    _id: ObjectID(id)
  }, function (err, content) {
    if (err || !content) {
      return res.send({
        status: 2,
        msg: err || "无此用户"
      });
    } else {
      var userData = {
        username: content.username,
        following: content.following,
        followed: content.followed,
        Lists: content.Lists,
        count: {
          followed: content.count.followed,
          following: content.count.following,
          like: content.count.like,
          liked: content.count.liked,
          articles: content.count.articles,
          words: content.count.words
        },
        avatar: content.avatar
      };

      return res.send({
        status: 1,
        msg: "拉取用户成功",
        data: userData
      });
    }
  });
};
module.exports = user;