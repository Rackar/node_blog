var express = require("express");
var jwt = require("jsonwebtoken"); // 使用jwt签名
var config = require("../../config/index");

var User = require("../../models/user");

var add = require("./article/add");
var edit = require("./article/edit");
var del = require("./article/del");
var addComment = require("./article/addComment");
var like = require("./article/like");
var follow = require("./user/follow");
var useredit = require("./user/edit");
var follow_article = require("./article/follow");
var listadd = require("./list/addList");
var listaddArticle = require("./list/addArticle");
var listremoveArticle = require("./list/removeArticle");
var listget = require("./list/getListsByUid");
var listdel = require("./list/removeList");
var image = require("./upload/image");
var userImage = require("./user/avatar");
var previewImage = require("./upload/previewImage");

//上传文件相关代码
var multer = require("multer");
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + file.originalname);
  }
});
var upload = multer({
  storage: storage
});

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
        return res.json({
          status: 0,
          msg: "无效的token."
        });
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
  res.json({
    msg: req.decoded.username + "  欢迎使用API"
  });
});
apiRoutes.post("/", function(req, res) {
  res.json({
    msg: req.decoded.usename + "  欢迎使用API,已通过验证"
  });
});

apiRoutes.post("/article", add);
apiRoutes.put("/article", edit);
apiRoutes.delete("/article/:id", del);
apiRoutes.get("/article/follow", follow_article);
apiRoutes.put("/article/comment", addComment);
apiRoutes.put("/article/like", like);
apiRoutes.put("/user/follow", follow);
apiRoutes.post("/lists", listadd); //新增文集
apiRoutes.post("/lists/article", listaddArticle); //给文集中添加文章
apiRoutes.put("/lists/article", listremoveArticle); //从文集中移除文章
apiRoutes.get("/lists/:uid", listget); //得到用户的所有文集
apiRoutes.delete("/lists/:id", listdel); //删除文集

apiRoutes.post("/uploadimage", upload.single("avatar"), image); //上传图片
apiRoutes.post("/user/image", upload.single("avatar"), userImage); //上传头像和修改
apiRoutes.post("/article/image", upload.single("avatar"), previewImage); //上传文章预览图和修改
apiRoutes.put("/user/", useredit);

// 注册API路由

module.exports = apiRoutes;
