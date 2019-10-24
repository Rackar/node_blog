// var express = require('./node_modules/express');
// var router = express.Router();
var User = require('../../../models/user')
var ObjectID = require('mongodb').ObjectID
var follow = function(req, res, next) {
  // res.send('respond with a resource');
  let params = req.body
  let params_deco = req.decoded

  User.findOne(
    {
      _id: ObjectID(params.userid),
      'following.userid': ObjectID(params._id)
    },
    {
      'following.$': 1
    }
  ).then(result => {
    console.log(result)
    if (result) {
      User.updateOne(
        {
          _id: ObjectID(params.userid)
        },
        {
          $pull: {
            following: {
              userid: ObjectID(params._id)
            }
          }
        },
        function(err) {
          if (err) {
            res.send({
              status: 2,
              msg: err || '取关失败'
            })
            console.log(err)
          } else {
          }
        }
      )
    } else {
      //_id为发起关注者，userid name 为发起关注请求者
      User.updateOne(
        {
          _id: ObjectID(params._id)
        },
        {
          $addToSet: {
            followed: [
              {
                userid: ObjectID(params.userid),
                username: params.username
              }
            ]
          }
        },
        function(err, content) {
          if (err) {
            return res.send({
              status: 2,
              msg: err || '关注失败'
            })
          } else {
            User.updateOne(
              {
                _id: ObjectID(params.userid)
              },
              {
                $addToSet: {
                  following: [
                    {
                      userid: ObjectID(params._id),
                      username: params.aimusername
                    }
                  ]
                }
              },
              function(err, content) {
                if (err) {
                  return res.send({
                    status: 2,
                    msg: err || '关注失败'
                  })
                } else {
                  return res.send({
                    status: 1,
                    msg: '关注成功'
                  })
                }
              }
            )
            // return res.send({ status: 1, msg: "点赞成功" });
          }
        }
      )
    }
  })
}

module.exports = follow
