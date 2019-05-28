var User = require("../../models/user");
var jwt = require("jsonwebtoken"); // 使用jwt签名
var config = require("../../config"); // 使用jwt签名
var login = function(req, res, next) {
  var userMobile = req.body.mobile;
  var userPwd = req.body.pwd;
  User.findOne({ mobile: userMobile }, function(err, content) {
    if (err) {
      return res.send({ status: 0, msg: err || "登录失败" });
    } else {
      var pwd = content.pwd;
      if (pwd === userPwd) {
        var token = jwt.sign(
          { name: content.name, mobile: content.mobile },
          config.jwtsecret,
          {
            expiresIn: 60 * 60 * 24 // 授权时效24小时
          }
        );

        console.log(token);

        var userData = {
          user_id: content._id,
          name: content.name,
          mobile: content.mobile,
          token: token
        };
        return res.send({ status: 1, msg: "登录成功", data: userData });
      } else {
        return res.send({ status: 1, msg: "登录失败，密码错误" });
      }
    }
  });
};
module.exports = login;
