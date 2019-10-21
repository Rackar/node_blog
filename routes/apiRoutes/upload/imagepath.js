// var multer = require("multer");
var fs = require('fs')
var mongoose = require('../../../api/db_mongoose')
var Schema = mongoose.Schema
var Image = require('../../../models/image')

var profile = function(req, res, next) {
  let params_deco = req.decoded
  console.log(req.file)
  // let uploadedPath = req.file.path
  // let uploadedContentType = req.file.mimetype
  // let creatorUID = params_deco.userid
  let data = {
    path: req.file.path,
    filename: req.file.filename,
    contentType: req.file.mimetype
  }

  return res.send({
    status: 1,
    msg: '上传图片成功',
    data: data
  })
}
module.exports = profile
