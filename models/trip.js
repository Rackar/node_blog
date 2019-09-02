var mongoose = require("../api/db_mongoose");
var Schema = mongoose.Schema;

var tripSchema = new Schema({
  userid: String,
  type: String,
  tripType: String,
  distance: Number,
  date: Date,
  time: Date,
  trajectory: String,

  calorie: String,
  speed: String,
  price: String,
  startPlace: String,
  endPlace: String,
  startCode: String,
  endCode: String,
  mark: String
});
module.exports = mongoose.model("trip", tripSchema);
