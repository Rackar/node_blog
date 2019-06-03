// var express = require('./node_modules/express');
// var router = express.Router();
var Article = require("../../../models/article");
var User = require("../../../models/user");
var ObjectID = require("mongodb").ObjectID;
var add = function (req, res, next) {
  // res.send('respond with a resource');
  let params = req.body;
  let params_deco = req.decoded;
  if (params_deco.userid != params.userid) {
    res.send({
      status: 0,
      msg: "请重新登陆"
    })
  } else {
    User.findOne({
      _id: ObjectID(params.userid),
      "Lists._id": ObjectID(params.listid)
    }, {
      "Lists.$": 1
    }).then(result => {
      console.log(result);
      if (result) {
        User.updateOne({
          _id: ObjectID(params.userid)
        }, {
          $set: {
            Lists: {
              $addToSet: {
                article: [{

                    id: params.aid,
                    title: params.title,
                    userid: params.userid,
                    username: params.username
                  }

                ]
              }
            }
          }

        }, function (err) {
          if (err) {
            res.send({
              status: 2,
              msg: err || "取关失败"
            });
            console.log(err);
          } else {
            User.findOne({
              _id: ObjectID(params._id),
              "followed.userid": ObjectID(params.userid)
            }, {
              "followed.$": 1
            }).then(result => {
              console.log(result);
              if (result) {
                User.updateOne({
                  _id: ObjectID(params._id)
                }, {
                  $pull: {
                    followed: {
                      userid: ObjectID(params.userid)
                    }
                  }
                }, function (err) {
                  if (err) {
                    return res.send({
                      status: 2,
                      msg: err || "取关失败"
                    });
                  } else {
                    return res.send({
                      status: 1,
                      msg: "取关成功"
                    });
                  }
                })
              }
            })

          }
        });


      }

    })

    //   User.updateOne(
    //     { _id: ObjectID(params.userid) },
    //     {
    //         $addToSet: {
    //             Lists: [{
    //             //    userid:ObjectID(params.userid),
    //             //   username:params.username,
    //             //   id:ObjectID(params._id),
    //               name:params.name
    //             }]
    //           }
    //     },
    //     function(err, content) {
    //       if (err) {
    //         return res.send({ status: 2, msg: err || "文集创建失败" });
    //       } else {
    //         return res.send({ status: 1, msg: "文集创建成功" });
    //       }
    //     }
    //   );
  }


};

module.exports = add;