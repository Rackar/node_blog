// var express = require('./node_modules/express');
// var router = express.Router();
var User = require("../../../models/user");
var ObjectID = require("mongodb").ObjectID;
var edit = function (req, res, next) {
    // res.send('respond with a resource');
    let params = req.body;
    let params_deco = req.decoded;
    if (params_deco.userid != params._id) {
        res.send({
            status: 0,
            msg: "请重新登陆"
        })

    } else {
        let body = {}
        if (params.username)
            body.username = params.username
        if (params.pwd)
            body.pwd = params.pwd
        if (params.info)
            body.info = params.info


        User.updateOne({
                _id: ObjectID(params._id)
            }, {
                $set: body
            },
            function (err, content) {
                if (err) {
                    return res.send({
                        status: 2,
                        msg: err || "用户编辑失败"
                    });
                } else {
                    return res.send({
                        status: 1,
                        msg: "用户信息更新成功"
                    });
                }
            }
        );
    }


};

module.exports = edit;