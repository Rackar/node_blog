var mongoose = require("../api/db_mongoose");
var Schema = mongoose.Schema;

var GPSSchema = new Schema({
  long: String,
  lat: String,
  time: String,
  adress: String,
  x: String,
  y: String,
  z: String,
  heading: String,
  speed: String,
  accuracy: String,
  coordsType: String
});
module.exports = mongoose.model("GPS", GPSSchema);