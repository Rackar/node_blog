var mongoose = require('../api/db_mongoose')
var Schema = mongoose.Schema
// var List =  require("./list");
// var Image =require('./image.js');

var PersonSchema = new Schema({
  name: {
    type: String
  },
  birthday: {
    type: String
  },
  deathday: {
    type: String
  },
  info: {
    type: String
  },
  createrId: {
    type: String
  },
  articles: [
    {
      _id: Schema.Types.ObjectId,
      title: String,
      text: String,
      createrid: String
    }
  ],
  photos: [
    {
      _id: Schema.Types.ObjectId,
      title: String,
      url: String
    }
  ],
  liked: [
    {
      _id: Schema.Types.ObjectId,
      userid: String,
      username: String
    }
  ],
  followed: [],
  avatarfilePath: {
    type: String
  },

  count: {
    followed: Number,
    following: Number,
    like: Number,
    liked: Number,
    articles: Number,
    words: Number
  }
})
module.exports = mongoose.model('Person', PersonSchema)
