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
    notes: [{
        type: Schema.Types.ObjectId,
        ref: 'Note'
      }]
});
var Saved = mongoose.model("Saved", NewsSchema);
module.exports = Saved;