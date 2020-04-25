var router = require("express").Router();
var apiRoutes = require("./api");
var htmlRoutes = require("./view");

router.use("/api", apiRoutes);
router.use("/", htmlRoutes);

module.exports = router;