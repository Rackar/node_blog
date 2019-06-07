// var multer = require("multer");
var fs = require("fs");
var mongoose = require("../../../api/db_mongoose");
var Schema = mongoose.Schema;
var Image = require("../../../models/image");
var User = require("../../../models/user");
var ObjectID = require('mongodb').ObjectID;

var profile = function (req, res, next) {
    let params_deco = req.decoded;
    console.log(req.file);

    Image.findOne({
        userid: params_deco.userid
    }).then(result => {
        if (result) {
            Image.update({
                userid: params_deco.userid
            }, {
                $set: {
                    'img.data': fs.readFileSync(req.file.path)
                }
            }, function (err, con) {
                console.log(err, con)
                return res.send({
                    status: 1,
                    msg: "上传更新成功",
                    data: req.file
                });
            })
        } else {
            var newItem = new Image();
            newItem._id = new ObjectID();
            newItem.img.data = fs.readFileSync(req.file.path)
            newItem.img.contentType = req.file.mimetype;
            newItem.userid = params_deco.userid;
            newItem.save();
            console.log(newItem._id);
            User.updateOne({
                _id: params_deco.userid
            }, {
                $set: {
                    'avatar': newItem._id.toString()
                }
            }, function (err, user) {
                console.log(err, user)
                return res.send({
                    status: 1,
                    msg: "上传成功",
                    data: req.file
                });
            })

        }
    })


    // newItem.save();
    // Image.update({userid:newItem.userid},{$set:newItem},true,false)

}
module.exports = profile;