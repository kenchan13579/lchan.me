var router = require("express").Router();
var authenticate = require("../controllers/authenticate");
var serveStatic = require("serve-static");
var path = require("path");
router.use(serveStatic(path.resolve("../weiboFollower/dist/")));
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
	req.session.login_err = null;
	const {id, token} = req.signedCookies;
	if (id && token) {
		authenticate
			.loginByToken(id, token)
			.then(() => {
				res.redirect("/projects/weiboFollower/app");
				next();
			})
			.catch((err) => {
				console.log(err);
				res.render("login", {
					error: "Authentication failed",
				})

			});
	} else {
		res.render("login", {
			error: "ID/password is empty",
		});
	}
    
});


router.get("/app", (req, res) => {
	res.render("weiboFollower");
});


module.exports = router;
