var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var NewsSchema = new Schema({
    headline: {
       type: String,
       unique: true
    },
    link: {
        type: String
    },
    body: {
        type: String
    },
notes: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Note'
    }],
    validate: [arrayLimit, '{PATH} exceeds the limit of 10']
  }
   

// friends: {
//     type: [{
//       type: Schema.Types.ObjectId,
//       ref: 'peopleModel'
//     }],
//     validate: [arrayLimit, '{PATH} exceeds the limit of 10']
//   }

});
function arrayLimit(val) {
    return val.length >= 1;
  }
var News = mongoose.model("News", NewsSchema);
module.exports = News;