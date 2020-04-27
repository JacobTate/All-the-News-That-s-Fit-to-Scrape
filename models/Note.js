var mongoose = require("mongoose");
const mongodb_url = process.env.MONGODB_URI || "mongodb://heroku_6zh6fmr4:v4enbqujbqlojjurb3d5qdh4va@ds247944.mlab.com:47944/heroku_6zh6fmr4";
mongoose.connect(mongodb_url, {
    useNewUrlParser: true
});
var Schema = mongoose.Schema;
var NoteSchema = new Schema({
    body: String
});
var Note = mongoose.model("Note", NoteSchema);
module.exports = Note;