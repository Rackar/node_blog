// var express = require('./node_modules/express');
// var router = express.Router();
var List = require("../../../models/list");
var ObjectID = require("mongodb").ObjectID;
var get = function(req, res, next) {
  // res.send('respond with a resource');
  //   let params = req.body;
  var uid = req.params.uid;
  let params_deco = req.decoded;
  if (params_deco.userid != uid) {
    res.send({
      status: 0,
      msg: "请重新登陆"
    });
  } else {
    List.find({
      userid: ObjectID(uid)
    }).then(result => {
      // console.log(result)
      res.send({ status: 1, msg: "拉取文集成功", data: result });
    });
  }
};

module.exports = get;
