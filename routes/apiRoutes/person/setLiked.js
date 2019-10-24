// var express = require('./node_modules/express');
// var router = express.Router();
var Person = require('../../../models/person')
var User = require('../../../models/user')
var ObjectID = require('mongodb').ObjectID
var like = function(req, res, next) {
  // res.send('respond with a resource');
  let params = req.body
  let params_deco = req.decoded

  Person.findOne(
    {
      _id: ObjectID(params._id),
      'liked.userid': params.userid
    },
    {
      'liked.$': 1
    }
  ).then(result => {
    console.log(result)
    if (result) {
      Person.updateOne(
        {
          _id: ObjectID(params._id)
        },
        {
          $pull: {
            liked: {
              userid: params.userid
            }
          }
        },
        function(err) {
          if (err) {
            res.send(500)
            console.log(err)
          } else {
            User.findOne(
              {
                _id: ObjectID(params.userid),
                'liking.personid': params._id
              },
              {
                'liking.$': 1
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
                      liking: {
                        personid: params._id
                      }
                    }
                  },
                  function(err) {
                    if (err) {
                      return res.send({
                        status: 2,
                        msg: err || '取消收藏失败'
                      })
                    } else {
                      return res.send({
                        status: 1,
                        msg: '取消收藏成功'
                      })
                    }
                  }
                )
              }
            })
          }
        }
      )
    } else {
      Person.updateOne(
        {
          _id: ObjectID(params._id)
        },
        {
          $addToSet: {
            liked: [
              {
                userid: params.userid,
                username: params.username
              }
            ]
          }
        },
        function(err, content) {
          if (err) {
            return res.send({
              status: 2,
              msg: err || '收藏失败'
            })
          } else {
            User.updateOne(
              {
                _id: ObjectID(params.userid)
              },
              {
                $addToSet: {
                  liking: [
                    {
                      personid: params._id
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
          }
        }
      )
    }
    // res.send(200,result);
    // res.status(200).send({ status: 1, msg: "获取成功", data: result });
  })
}

module.exports = like
