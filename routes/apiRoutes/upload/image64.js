// var multer = require("multer");
var fs = require('fs')
var mongoose = require('../../../api/db_mongoose')
var Schema = mongoose.Schema
var Image = require('../../../models/image')

var profile = function(req, res, next) {
  let params_deco = req.decoded
  console.log(req)
  var newItem = new Image()
  newItem.img.data = fs.readFileSync(req.file.path)
  newItem.img.contentType = req.file.mimetype
  newItem.userid = params_deco.userid
  Image.findOne({userid: params_deco.userid}).then(result => {
    if (result) {
      Image.update(
        {userid: params_deco.userid},
        {$set: {'img.data': fs.readFileSync(req.file.path)}},
        function(err, con) {
          console.log(err, con)
          return res.send({
            status: 1,
            msg: '上传更新成功',
            data: req.file
          })
        }
      )
    } else {
      newItem.save()
      return res.send({
        status: 1,
        msg: '上传成功',
        data: req.file
      })
    }
  })

  // newItem.save();
  // Image.update({userid:newItem.userid},{$set:newItem},true,false)
}
module.exports = profile
