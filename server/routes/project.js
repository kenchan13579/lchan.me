var router = require("express").Router();
var weibofollower = require("./weibofollower");



router.use("/weibofollower", weibofollower);


module.exports = router;
