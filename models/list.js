var mongoose = require("../api/db_mongoose");
var Schema = mongoose.Schema;

var ListSchema = new Schema({
  name: String ,
  userid:Schema.Types.ObjectId,
  username:String,
  articles:[
          {
            id:Schema.Types.ObjectId,
            title:String,
            userid:Schema.Types.ObjectId,
            username:String
          }
        ]
  
  
});
module.exports = mongoose.model("List", ListSchema);
