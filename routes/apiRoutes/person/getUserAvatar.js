var Image = require('../../../models/image')
var jwt = require('jsonwebtoken') // 使用jwt签名
var config = require('../../../config') // 使用jwt签名
var ObjectID = require('mongodb').ObjectID
var image = function(req, res, next) {
  var id = req.params.id
  Image.findOne(
    {
      userid: id
    },
    function(err, img) {
      if (err || !img) {
        res.send({
          status: 2,
          msg: err || '用户无头像'
        })
      } else {
        // img.status = 1;
        res.contentType('json')
        res.send(img)
      }
    }
  )
}
module.exports = image
