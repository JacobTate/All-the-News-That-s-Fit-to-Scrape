var express = require("express");
var app = express();
var PORT = process.env.PORT || 8000;
app.use(express.static("public"));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
require("./routes/api/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
 app.listen(PORT, function () {
     console.log("Listening on PORT:%s", PORT);
 });