var express = require("express");
var PORT = process.env.PORT || 8000;
var app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
 app.listen(PORT, function () {
     console.log("Listening on PORT:%s", PORT);
 });