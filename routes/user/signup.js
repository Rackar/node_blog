var User = require('../../models/user')
var signup = function(req, res, next) {
  var mobile = req.body.mobile
  var regUser = new User({
    mobile: req.body.mobile,
    pwd: req.body.pwd,
    username: req.body.username,
    following: [],
    followed: [],
    info: '尚未填写',
    Lists: [],
    liking: [],
    count: {
      followed: 1,
      following: 1,
      like: 1,
      liked: 1,
      articles: 1,
      words: 1
    }
  })
  User.findOne({
    mobile: req.body.mobile
  }).then(result => {
    // console.log(res);
    if (result) {
      return res.send({
        status: 2,
        msg: '本号码已经注册过'
      })
    } else {
      regUser.save(function(err, content) {
        if (err) {
          return res.send({
            status: 2,
            msg: err || '注册失败'
          })
        } else {
          return res.send({
            status: 1,
            msg: '注册成功'
          })
        }
      })
    }
  })
}
module.exports = signup
