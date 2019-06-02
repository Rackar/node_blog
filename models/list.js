var mongoose = require("../api/db_mongoose");
var Schema = mongoose.Schema;

var ListSchema = new Schema({
  name: { type: String },

  articles: [
    {_id:Schema.Types.ObjectId,title:String}
  ],
  
  
});
module.exports = mongoose.model("List", ListSchema);
