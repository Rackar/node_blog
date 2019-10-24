var mongoose = require('../api/db_mongoose')
var Schema = mongoose.Schema
// var List =  require("./list");
// var Image =require('./image.js');

var UserSchema = new Schema({
  username: {
    type: String
  },
  mobile: {
    type: String
  },
  pwd: {
    type: String
  },
  articles: [
    {
      _id: Schema.Types.ObjectId,
      title: String
    }
  ],
  following: [],
  followed: [],
  liking: [],
  info: '',
  avatar: {
    type: String
  },
  // Lists:[],
  // Lists:[
  //   {
  //     name:String,
  //     articles:[
  //       {
  //         id:Schema.Types.ObjectId,
  //         title:String,
  //         userid:Schema.Types.ObjectId,
  //         username:String
  //       }
  //     ]
  //   }
  // ],
  count: {
    followed: Number,
    following: Number,
    like: Number,
    liked: Number,
    articles: Number,
    words: Number
  }
})
module.exports = mongoose.model('User', UserSchema)
