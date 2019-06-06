var mongoose = require("../api/db_mongoose");
var Schema = mongoose.Schema;


var ImageSchema = new Schema({
    img: {
        data: Buffer,
        contentType: String
    },
    userid:String
});
// var Item = mongoose.model('Image', ImageSchema);
module.exports = mongoose.model("Image", ImageSchema);
