var User = require('../../models/user');
var signup = function (req, res, next) {
    var mobile = req.body.mobile;
    var regUser = new User({
        mobile: req.body.mobile,
        pwd: req.body.pwd,
        username: req.body.username,
        following: [{}],
        followed: [{}],
        info: "尚未填写",
        count: {
            followed: 0,
            following: 0,
            like: 0,
            liked: 0,
            articles: 0,
            words: 0
        }
    });
    regUser.save(function (err, content) {
        if (err) {
            return res.send({
                status: 0,
                msg: err || '注册失败'
            });
        } else {
            return res.send({
                status: 1,
                msg: "注册成功"
            });
        }
    })
};
module.exports = signup