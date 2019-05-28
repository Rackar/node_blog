var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/test";
var ObjectID = require('mongodb').ObjectID;

const db={};



db.addpost = function addPost(post){
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, db) {
        if (err) throw err;
    var dbo = db.db("test");
    dbo.collection("article").insertOne(post, function(err, res) {
        if (err) throw err;
        console.log("插入的文档数量为: " + res.insertedCount);
        db.close();
    });

}
    )}

    db.findAll = function findAll(){
        return new Promise((resolve, reject) => {
        MongoClient.connect(url, {
            useNewUrlParser: true
        }, function (err, db) {
            if (err) throw err;
        var dbo = db.db("test");
        var outres =  dbo.collection("article").find({}).toArray( function(err, res) {
            if (err) throw err;
            console.log("查询到的数据: " + res);
            db.close();
             resolve(res)
        });
    
    }
        )}
        )}

   db.find= function find(id){
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, {
            useNewUrlParser: true
        }, function (err, db) {
            if (err) throw err;
        var dbo = db.db("test");
        
        var whereStr = {
            "_id": ObjectID(id)
        };
        dbo.collection("article").find(whereStr).toArray(function (err, result) { // 返回集合中所有数据
            if (err) throw err;
            console.log(result);
            db.close();
            resolve(result)
        });
        })
    })
    }
        
// addPost({
//     title:"第一篇",
//     content:"完犊子"

// })

module.exports = db;