// var multer = require("multer");
var fs = require("fs");
var mongoose = require("../../../api/db_mongoose");
var Schema = mongoose.Schema;
var Image = require("../../../models/image");
var Article = require("../../../models/article");
var ObjectID = require('mongodb').ObjectID;

var profile = function (req, res, next) {
    let params_deco = req.decoded;
    console.log(req.file);

    if (!req.body.previewImageId) {
        var newItem = new Image();
        newItem._id = new ObjectID();
        newItem.img.data = fs.readFileSync(req.file.path)
        newItem.img.contentType = req.file.mimetype;
        // newItem.userid = params_deco.userid;
        newItem.save()
        console.log(newItem._id);
        return res.send({
            status: 1,
            msg: "上传成功",
            previewImageId: newItem._id.toString(),
            data: req.file
        });
    } else {
        Image.update({
            _id: req.body.previewImageId
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
    }





}
module.exports = profile;