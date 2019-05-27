var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/test";

const db={};

// MongoClient.connect(url, {
//     useNewUrlParser: true
// }, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("test");
//     // var myobj =  [
//     //     { name: '菜鸟工具', url: 'https://c.runoob.com', type: 'cn'},
//     //     { name: 'Google', url: 'https://www.google.com', type: 'en'},
//     //     { name: 'Facebook', url: 'https://www.google.com', type: 'en'}
//     //    ];
//     // dbo.collection("site").insertMany(myobj, function(err, res) {
//     //     if (err) throw err;
//     //     console.log("插入的文档数量为: " + res.insertedCount);
//     //     db.close();
//     // });
//     var whereStr = {
//         "name": '菜鸟教程'
//     };
//     dbo.collection("site").find(whereStr).toArray(function (err, result) { // 返回集合中所有数据
//         if (err) throw err;
//         console.log(result);
//         db.close();
//     });

// });

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

    function findPost(id){
        MongoClient.connect(url, {
            useNewUrlParser: true
        }, function (err, db) {
            if (err) throw err;
        var dbo = db.db("test");
        // var myobj =  [
        //     { name: '菜鸟工具', url: 'https://c.runoob.com', type: 'cn'},
        //     { name: 'Google', url: 'https://www.google.com', type: 'en'},
        //     { name: 'Facebook', url: 'https://www.google.com', type: 'en'}
        //    ];
        // dbo.collection("article").insertMany(post, function(err, res) {
        //     if (err) throw err;
        //     console.log("插入的文档数量为: " + res.insertedCount);
        //     db.close();
        // });
        var whereStr = {
            "id": id
        };
        dbo.collection("article").find(whereStr).toArray(function (err, result) { // 返回集合中所有数据
            if (err) throw err;
            console.log(result);
            db.close();
        });
        })
    }
        
// addPost({
//     title:"第一篇",
//     content:"完犊子"

// })

module.exports = db;