var router = require("express").Router();
var moment = require("moment");
var authenticate = require("../controllers/authenticate");
var weiboAPI = require("./weiboAPI");
var liftbroAPI= require("./api-liftbro");
var userCtrl = require("./user-ctrl");

router.use("/weibo", weiboAPI);
router.use("/lift", liftbroAPI);

router.get("/user_info", (req, res) => {
    
});
router.post("/login", userCtrl.login);

router.post("/signup", userCtrl.signup);



module.exports = router;
