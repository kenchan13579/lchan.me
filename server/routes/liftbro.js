var router = require("express").Router();
var serverStatic = require("serve-static");

router.use(serverStatic("../liftbro/dist/"));

router.get("/app", (req, res) => {
	res.render("index");
});

module.exports = router;
