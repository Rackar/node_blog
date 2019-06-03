// var express = require('./node_modules/express');
// var router = express.Router();
var List = require("../../../models/list");
var ObjectID = require("mongodb").ObjectID;
var get = function(req, res, next) {
  // res.send('respond with a resource');
//   let params = req.body;
  var uid = req.params.uid;
  let params_deco = req.decoded;
  if(params_deco.userid!=params.userid)
  {res.send({ status: 0, msg: "请重新登陆" })

}else{
    

    List.find({ userid: ObjectID(uid) 
    // }
    // , function(err, content) {
    //     if (err || !content) {
    //       return res.send({ status: 2, msg: err || "无此用户" });
    //     } else {
    //       var userData = {
    //         username: content.username,
    //         following: content.following,
    //         followed: content.followed,
    //         Lists:content.Lists,
    //         count: {
    //           followed: content.count.followed,
    //           following: content.count.following,
    //           like: content.count.like,
    //           liked: content.count.liked,
    //           articles: content.count.articles,
    //           words: content.count.words
    //         }
    //       };
    
    //       return res.send({ status: 1, msg: "拉取用户成功", data: userData });
    //     }
      }).then(result=>{
          console.log(result)
      });









}

  
};

module.exports = get;
