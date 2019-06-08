var express = require("express");
var router = express.Router();
var Image = require("../models/image");
var ObjectID = require("mongodb").ObjectID;
/* GET users listing. */
console.log('')
router.get("/", function (req, res, next) {
    Image.findOne({}, function (err, img) {
        if (err)
            res.send(err);
        // console.log(img);
        res.contentType('json');
        res.send(img);
    })
});

router.get("/:userid", function (req, res, next) {

    Image.findOne({
        userid: req.params.userid
    }, function (err, img) {
        if (err)
            res.send(err);
        // console.log(img);
        res.contentType('json');
        res.send(img);
    })
});
router.get("/id/:imageid", function (req, res, next) {

    Image.findOne({
        _id: req.params.imageid
    }, function (err, img) {
        if (err)
            res.send(err);
        else {
            res.contentType('json');
            res.send(img);
        }
        // console.log(img);

    })
});



module.exports = router;