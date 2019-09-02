var mongoose = require("../api/db_mongoose");
var Schema = mongoose.Schema;

var polylineSchema = new Schema({
  points: [
    {
      latitude: Number,
      longitude: Number,
      type: String,
      accuracy: Number,
      address: String
    }
  ],
  color: String,
  width: String,
  name: String,
  date: String,
  time: String

  //   startPlace: String,
  //   endPlace: String,
  //   startCode: String,
  //   endCode: String,
  //   mark: String
});
module.exports = mongoose.model("polyline", polylineSchema);
