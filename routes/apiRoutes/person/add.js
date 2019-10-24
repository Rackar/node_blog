var Person = require('../../../models/person')
var ObjectID = require('mongodb').ObjectID
var signup = function(req, res, next) {
  var body = req.body
  var newid = new ObjectID()
  var regperson = new Person({
    _id: newid,
    name: body.name,
    birthday: body.birthday,
    deathday: body.deathday,
    info: body.info,
    avatarfilePath: body.avatarfilePath
      ? body.avatarfilePath
      : 'default/person.png',
    createrId: body.createrId,
    articles: [],
    photo: [],
    liked: [],
    count: {
      followed: 1,
      following: 1,
      like: 1,
      liked: 1,
      articles: 1,
      words: 1
    }
  })

  regperson.save(function(err, content) {
    if (err) {
      return res.send({
        status: 2,
        msg: err || '新增人物失败'
      })
    } else {
      console.log(content)

      return res.send({
        status: 1,
        msg: '新增人物成功',
        id: newid
      })
    }
  })
}
module.exports = signup
