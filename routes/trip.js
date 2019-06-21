var express = require("express");
var router = express.Router();

var Trip = require("../models/trip");
var add = function (req, res, next) {
  var params = req.body;
  console.log(req.body);
  var newPoint = new Trip(params.trip);

  newPoint.save(function (err, content) {
    if (err) {
      return res.send({
        status: 2,
        msg: err || "入库失败"
      });
    } else {
      return res.send({
        status: 1,
        msg: "入库成功",
        data: {
          tripId: content._id
        }
      });
    }
  });
};
var get = function (req, res, next) {
  Trip.find().then(result => {
    res.send({
      status: 1,
      msg: "获取全部数据成功",
      data: result
    });
  });
};
var getlast = function (req, res, next) {
  Trip.findOne()
    .sort({
      _id: -1
    })
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