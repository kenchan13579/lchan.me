var router = require("express").Router();
var moment = require("moment");
var authenticate = require("../services/authenticate");
var weiboAPI = require("./weiboAPI");
var liftbroAPI= require("./api-liftbro");
var userCtrl = require("../controllers/user-ctrl");

router.use("/weibo", weiboAPI);
router.use("/lift", liftbroAPI);

router.get("/user_info", (req, res) => {
    res.end("not done");    
});
router.post("/login", userCtrl.login);

router.post("/signup", userCtrl.signup);



module.exports = router;
