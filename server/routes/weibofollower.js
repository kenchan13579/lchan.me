var router = require("express").Router();

router.get("/", function(req,res){
    res.render("login");
});

router.get("/signup", (req, res) => res.render("signup"));


module.exports = router;
