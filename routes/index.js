var router = require("express").Router();
var apiRoutes = require("./api/apiRoutes");
var htmlRoutes = require("./view/htmlRoutes");

router.use("/", apiRoutes);
router.use("/", htmlRoutes);

module.exports = router;