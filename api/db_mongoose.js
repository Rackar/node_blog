var mongoose = require('mongoose')
var testDB = 'mongodb://localhost:27017/rackar'
mongoose.connect(testDB, { useNewUrlParser: true }, function(err) {
  if (err) {
    console.log('connect fail')
  } else {
    console.log('connect success')
  }
})
module.exports = mongoose
