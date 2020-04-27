var mongoose = require("mongoose");
const mongodb_url = process.env.MONGODB_URI || "mongodb://heroku_6zh6fmr4:v4enbqujbqlojjurb3d5qdh4va@ds247944.mlab.com:47944/heroku_6zh6fmr4";
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