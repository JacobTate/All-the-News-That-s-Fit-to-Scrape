var mongoose = require("mongoose");
const mongodb_url = process.env.MONGOLAB_BROWN_URI || "mongodb://localhost/newsDb";
mongoose.connect(mongodb_url, {
    useNewUrlParser: true
});
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