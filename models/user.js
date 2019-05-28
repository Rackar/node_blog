var mongoose = require("../api/db_mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: { type: String },
  mobile: { type: String },
  pwd: { type: String },
  articles: [
    {_id:Schema.Types.ObjectId,name:String}
  ],
  following: [],
  followed: [],
  count: [
    {
      followed: Number,
      followed: Number,
      like: Number,
      liked: Number,
      articles: Number,
      words: Number
    }
  ]
});
module.exports = mongoose.model("User", UserSchema);
