var express = require("express");
var jwt = require("jsonwebtoken"); // 使用jwt签名
var config = require("../../config/index");

var User = require("../../models/user");

var add = require("./article/add");
var edit = require("./article/edit");
var addComment = require("./article/addComment");
var like = require("./article/like");
var follow = require("./user/follow");
//下面是受jwt控制的路径
var apiRoutes = express.Router();
apiRoutes.use(function(req, res, next) {
  // 拿取token 数据 按照自己传递方式写
  var token =
    req.body.token ||
    req.query.token ||
    (req.headers["authorization"] &&
      req.headers["authorization"].split(" ")[1]);
  if (token) {
    // 解码 token (验证 secret 和检查有效期（exp）)
    jwt.verify(token, config.jwtsecret, function(err, decoded) {
      if (err) {
        return res.json({ status: 0, msg: "无效的token." });
      } else {
        // 如果验证通过，在req中写入解密结果
        req.decoded = decoded;
        //console.log(decoded)  ;
        next(); //继续下一步路由
      }
    });
  } else {
    // 没有拿到token 返回错误
    return res.send({
      status: 0,
      msg: "没有找到token."
    });
  }
});
//API跟路径返回内容
apiRoutes.get("/", function(req, res) {
  res.json({ msg: req.decoded.username + "  欢迎使用API" });
});
apiRoutes.post("/", function(req, res) {
  res.json({ msg: req.decoded.usename + "  欢迎使用API,已通过验证" });
});

apiRoutes.post("/article", add);
apiRoutes.put("/article", edit);
apiRoutes.put("/article/comment", addComment);
apiRoutes.put("/article/like", like);
apiRoutes.put("/user/follow", follow);
// 注册API路由

module.exports = apiRoutes;
