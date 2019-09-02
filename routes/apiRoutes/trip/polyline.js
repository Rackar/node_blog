var express = require("express");
var router = express.Router();
var polyline = require("../../../models/polyline");
var ObjectID = require("mongodb").ObjectID;
var add = function(req, res, next) {
  // res.send('respond with a resource');
  let params = req.body;
  let params_deco = req.decoded;
  //   if (params_deco.userid != params.userid) {
  //     res.send({
  //       status: 0,
  //       msg: "请重新登陆"
  //     });
  //   } else {
  var oid = new ObjectID();
  var newtrip = new polyline({
    _id: oid,
    name: params.polyline.name,
    color: params.polyline.color,
    width: params.polyline.width,
    date: params.polyline.date,
    time: params.polyline.time
  });
  newtrip.save(function(err, content) {
    if (err) {
      return res.send({
        status: 2,
        msg: err || "路径创建失败"
      });
    } else {
      console.log(content);

      return res.send({
        status: 1,
        msg: "路径创建成功"
      });
    }
  });
  // polyline.updateOne(
  //   // { _id: oid },
  //   // { $addToSet: { points: [{ latitude: 30, longitude: 110 }] } },
  //   {
  //     _id: ObjectId("5d391908de99bd236489c8a6")
  //   },
  //   {
  //     $push: {
  //       points: [
  //         {
  //           type: "2"
  //         }
  //       ]
  //     }
  //   },
  //   function(err, con) {
  //     console.log(err, con);
  //   }
  //   // { $push: { points: { $each: params.polyline.points } } }
  // );
  //   newtrip.update({ $push: { points: { $each: params.polyline.points } } });
};
// };

// var getTotal = function(req, res, next) {
//   let params = req.body;
//   let params_deco = req.decoded;
//   polyline
//     .aggregate([
//       {
//         $match: {
//           userid: params_deco.userid
//         }
//       },
//       {
//         $group: {
//           _id: "$tripType",
//           // tripType: "$",
//           total: {
//             $sum: "$distance"
//           }
//         }
//       }
//     ])
//     .then(result => {
//       console.log(result);
//       // var final = result.filter(resultArr => resultArr._id == params_deco.userid)
//       var finalObj = result;
//       var sum = 0;
//       for (filterd of result) {
//         sum = sum + filterd.total;
//       }
//       finalObj.push({
//         _id: "all",
//         total: sum
//       });
//       if (finalObj)
//         res.send({
//           status: 1,
//           msg: "拉取总里程成功",
//           data: finalObj
//         });
//       else
//         res.send({
//           status: 2,
//           msg: "无数据"
//         });
//     });
// };

// var getDetails = function(req, res, next) {
//   let params = req.body;
//   let params_deco = req.decoded;
//   polyline
//     .find({
//       userid: params_deco.userid
//     })
//     .then(result => {
//       console.log(result);
//       res.send({
//         status: 1,
//         msg: "拉取出行记录成功",
//         data: result
//       });
//     });
// };

router.post("/", add);
// router.get("/", get);
// router.get("/last", getlast);
module.exports = router;

// db.trips.aggregate([{$group : {_id : "$userid", total : {$sum : "$distance"}}}])
