var router = require("express").Router();
var authenticate = require("../controllers/authenticate");
router.get("/signup", (req, res) => res.render("signup"));

router.use("/app",(req,res,next) => {
	const {id,token} = req.signedCookies;
	if (!id || !token) {
		res.redirect("/projects/weiboFollower");
	} else {
		
		authenticate
			.loginByToken(id, token)
			.then(() => next())
			.catch((err) => {
				res.redirect("/projects/weiboFollower");
			});
	}
	
});

router.get("/", function(req,res, next){
	const {id, token} = req.signedCookies;
	if (id && token) {
		authenticate
			.loginByToken(id, token)
			.then(() => {
				console.log("test");
				res.redirect("/projects/weiboFollower/app");
				next();
			})
			.catch((err) => res.render("login"));
	} else {
		res.render("login");
	}
    
});


router.get("/app", (req, res) => {
	res.render("weiboFollower");
});


module.exports = router;
