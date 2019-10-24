// var express = require('./node_modules/express');
// var router = express.Router();
var Person = require('../../../models/person')
var ObjectID = require('mongodb').ObjectID
var addComment = function(req, res, next) {
  // res.send('respond with a resource');
  let params = req.body
  let params_deco = req.decoded
  let photos = params.photos.map(photo => {
    return {
      _id: ObjectID(),
      title: photo.name,
      url: photo.url
    }
  })

  Person.updateOne(
    {
      _id: ObjectID(params.personid)
    },
    {
      $addToSet: {
        photos: { $each: photos }
      }
    },
    function(err, content) {
      if (err) {
        return res.send({
          status: 2,
          msg: err || '照片发布失败'
        })
      } else {
        return res.send({
          status: 1,
          msg: '照片发布成功',
          data: content
        })
      }
    }
  )
}

module.exports = addComment
