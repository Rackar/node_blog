var Person = require('../../models/person')
var jwt = require('jsonwebtoken') // 使用jwt签名
var config = require('../../config') // 使用jwt签名
var ObjectID = require('mongodb').ObjectID
var user = function(req, res, next) {
  var idArr = req.params.ids.map(sid => ObjectID(sid))

  Person.find(
    {
      _id: { $in: idArr }
    },
    function(err, body) {
      if (err || !body) {
        return res.send({
          status: 2,
          msg: err || '无此人物'
        })
      } else {
        let bodys = body

        return res.send({
          status: 1,
          msg: '拉取系列集合成功',
          data: bodys
        })
      }
    }
  )
}
module.exports = user
