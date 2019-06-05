var mongoose = require("../api/db_mongoose");
var Schema = mongoose.Schema;

var ImageSchema = new Schema({
    data: Buffer, contentType: String }

);
module.exports = mongoose.model("Image", ImageSchema);
