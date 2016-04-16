var router = require("express").Router();
var weibofollower = require("./weibofollower");
var liftbro = require("./liftbro");



router.use("/weibofollower", weibofollower);
router.use("/liftbro", liftbro)

module.exports = router;
