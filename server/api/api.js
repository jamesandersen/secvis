var express = require("express");
var router = express.Router();

router.use("/secdata", require("./secdata"));

module.exports = router;