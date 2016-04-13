var router = require("express").Router();
var authenticate = require("../controllers/authenticate");
var serveStatic = require("serve-static");
var path = require("path");
router.use(serveStatic(path.resolve("../weibofollower/dist/")));
router.get("/signup", (req, res) => res.render("signup", {error: req.session.signup_err || ""}));

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
				res.redirect("/projects/weiboFollower/app");
				next();
			})
			.catch((err) => {
				res.clearCookie(id);
				res.clearCookie(token);
				res.render("login", {
					error: req.session.login_err || "",
				});
			});
	} else {
		res.render("login", {
			error: req.session.login_err || "",
		});
	}

});


router.get("/app", (req, res) => {
	res.render("weibofollower");
});


module.exports = router;
