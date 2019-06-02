// var express = require('./node_modules/express');
// var router = express.Router();
var Article = require("../../../models/article");
var ObjectID = require("mongodb").ObjectID;
var del = function(req, res, next) {
  // res.send('respond with a resource');
  let params = req.params;
  let params_deco = req.decoded;
//   if(params_deco.userid!=params.userid)
//   {res.send({ status: 0, msg: "请重新登陆" })

// }else{
  Article.remove(
    { _id: ObjectID(params.id) },
    
    function(err, content) {
      if (err) {
        return res.send({ status: 2, msg: err || "文章删除失败" });
      } else {
        return res.send({ status: 1, msg: "文章删除成功" });
      }
    }
  );
// }

  
};

module.exports = del;
