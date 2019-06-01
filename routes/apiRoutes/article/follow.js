// var express = require('./node_modules/express');
// var router = express.Router();
var Article = require("../../../models/article");
var User = require("../../../models/user");
var ObjectID = require("mongodb").ObjectID;
var add = function (req, res, next) {
  // res.send('respond with a resource');
  let params = req.body;
  let params_deco = req.decoded;
  let userid = params_deco.userid;
  User.find({
    _id: ObjectID(userid)
  }, 'following', (err, userres) => {
    console.log(userres)
    let uidArray = []
    userres.forEach(element => {
      console.log(element.following)
      element.following.forEach(following => {
        if(following&&following.userid)
        uidArray.push({
          userid: following.userid
        })
      });

    });
    console.log(uidArray)
    const query = Article.find(); // `query` 是 `Query` 的一个实例
    query.or(uidArray).exec((err, result) => {
      console.log(err, result)
      res.status(200).send({ status: 1, msg: "获取成功", data: result });
    })


  })

 
  // ,{userid:ObjectID("5cee71e879c10b336c6f3389")}
};

module.exports = add;