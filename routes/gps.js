var express = require("express");
var router = express.Router();

var GPS = require("../models/gps");
var add = function(req, res, next) {
  var params = req.body;
  console.log(req.body);
  var newPoint = new GPS({
    long: req.body.long,
    lat: req.body.lat,
    time: req.body.time,
    adress: req.body.adress,
    x: req.body.x,
    y: req.body.y,
    z: req.body.z,
    heading: req.body.heading,
    speed: req.body.speed,
    accuracy: req.body.accuracy,
    coordsType: req.body.coordsType
  });

  newPoint.save(function(err, content) {
    if (err) {
      return res.send({
        status: 2,
        msg: err || "入库失败"
      });
    } else {
      return res.send({
        status: 1,
        msg: "入库成功"
      });
    }
  });
};
var get = function(req, res, next) {
  GPS.find().then(result => {
    res.send({
      status: 1,
      msg: "获取全部数据成功",
      data: result
    });
  });
};
var getlast = function(req, res, next) {
  GPS.findOne()
    .sort({ _id: -1 })
    .then(result => {
      res.send({
        status: 1,
        msg: "获取最近一次数据成功",
        data: result
      });
    });
};

router.post("/", add);
router.get("/", get);
router.get("/last", getlast);
module.exports = router;
