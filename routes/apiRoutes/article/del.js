// var express = require('./node_modules/express');
// var router = express.Router();
var Article = require("../../../models/article");
var List = require("../../../models/list");
var ObjectID = require("mongodb").ObjectID;
var del = function (req, res, next) {
  // res.send('respond with a resource');
  let params = req.params;
  let params_deco = req.decoded;
  //   if(params_deco.userid!=params.userid)
  //   {res.send({ status: 0, msg: "请重新登陆" })
  // List.find(
  //   {
  //     // _id: ObjectID(params._id),
  //     "articles.id": ObjectID(params.id)
  //   }

  // ).then(result => {
  //   console.log(result);
  // if (result||result.length) {


  // List.updateOne(
  //   {
  //     _id: ObjectID(params._id)
  //   },
  //   {
  //     $pull: {
  //       articles: {
  //         id: ObjectID(params.aid)
  //       }
  //     }
  //   },
  //   function(err) {
  //     if (err) {
  //       res.send({
  //         status: 2,
  //         msg: err || "文集移除文章失败"
  //       });
  //       console.log(err);
  //     } else {
  //       res.send({
  //         status: 1,
  //         msg: "文集移除文章成功"
  //       });
  //     }
  //   }
  // );
  //   } else {
  //     res.send({
  //       status: 2,
  //       msg: err || "文集移除文章操作失败：未找到匹配"
  //     });
  //   }
  // });




  Article.remove({
      _id: ObjectID(params.id)
    },

    function (err, content) {
      if (err || !content) {
        return res.send({
          status: 2,
          msg: err || "文章删除失败"
        });
      } else {

        List.updateMany({
          "articles.id": ObjectID(params.id)
        }, {
          $pull: {
            articles: {
              id: ObjectID(params.id)
            }
          }
        }, function (err, con) {
          console.log(err, con)
          if (err) {
            return res.send({
              status: 2,
              msg: "文章退出文集操作失败"
            });
          } else {
            return res.send({
              status: 1,
              msg: "文章删除成功"
            });
          }
        })

      }
    }
  );



};

module.exports = del;