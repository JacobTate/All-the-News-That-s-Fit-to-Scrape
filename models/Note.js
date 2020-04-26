var mongoose = require("mongoose");
const mongodb_url = process.env.MONGOLAB_BROWN_URI || "mongodb://localhost/newsDb";
mongoose.connect(mongodb_url, {
    useNewUrlParser: true
});
var Schema = mongoose.Schema;
var NoteSchema = new Schema({
    body: String
});
var Note = mongoose.model("Note", NoteSchema);
module.exports = Note;