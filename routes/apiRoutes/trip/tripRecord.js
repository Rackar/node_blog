// var express = require('./node_modules/express');
// var router = express.Router();
var trip = require("../../../models/trip");
var ObjectID = require("mongodb").ObjectID;
var add = function (req, res, next) {
    // res.send('respond with a resource');
    let params = req.body;
    let params_deco = req.decoded;
    if (params_deco.userid != params.userid) {
        res.send({
            status: 0,
            msg: "请重新登陆"
        })

    } else {
        var newtrip = new trip(params.trip)
        newtrip.save(function (err, content) {
            if (err) {
                return res.send({
                    status: 2,
                    msg: err || "路径创建失败"
                });
            } else {
                return res.send({
                    status: 1,
                    msg: "路径创建成功"
                });
            }
        });
    }


};

var getTotal = function (req, res, next) {
    let params = req.body;
    let params_deco = req.decoded;
    trip.aggregate([{
        $match: {
            userid: params_deco.userid
        }
    }, {
        $group: {
            _id: "$tripType",
            // tripType: "$",
            total: {
                $sum: "$distance"
            }
        }
    }]).then(result => {
        console.log(result)
        // var final = result.filter(resultArr => resultArr._id == params_deco.userid)
        var finalObj = result
        var sum = 0
        for (filterd of result) {
            sum = sum + filterd.total
        }
        finalObj.push({
            _id: 'all',
            total: sum
        })
        if (finalObj)
            res.send({
                status: 1,
                msg: "拉取总里程成功",
                data: finalObj
            });
        else
            res.send({
                status: 2,
                msg: "无数据"
            });

    })
}

var getDetails = function (req, res, next) {
    let params = req.body;
    let params_deco = req.decoded;
    trip.find({
        userid: params_deco.userid
    }).then(result => {
        console.log(result)
        res.send({
            status: 1,
            msg: "拉取出行记录成功",
            data: result
        });
    })

}

var result = {
    add: add,
    getTotal: getTotal,
    getDetails: getDetails
}
module.exports = result;


// db.trips.aggregate([{$group : {_id : "$userid", total : {$sum : "$distance"}}}])