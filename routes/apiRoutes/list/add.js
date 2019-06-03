// var express = require('./node_modules/express');
// var router = express.Router();
var Article = require("../../../models/article");
var List = require("../../../models/list");
var ObjectID = require("mongodb").ObjectID;
var add = function(req, res, next) {
  // res.send('respond with a resource');
  let params = req.body;
  let params_deco = req.decoded;
  if(params_deco.userid!=params.userid)
  {res.send({ status: 0, msg: "请重新登陆" })

}else{
    var newlist = new List({
        userid:ObjectID(params.userid),
        username:params.username,
        name:params.name,
        articles:[]
    })
    newlist.save(function(err, content) {
      if (err) {
        return res.send({ status: 2, msg: err || "文集创建失败" });
      } else {
        return res.send({ status: 1, msg: "文集创建成功" });
      }
    }
  );
}

  
};

module.exports = add;
