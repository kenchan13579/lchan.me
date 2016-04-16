var router = require("express").Router();
var authenticate = require("../controllers/authenticate");
var serveStatic = require("serve-static");
var path = require("path");
router.use(serveStatic(path.resolve("../weibofollower/dist/")));
router
	.route("/signup")
	.get((req, res) => res.render("signup",{error: req.session.signup_err || ""}))
	.post((req,res) => {
		 const {id, pw , pw2} = req.body;
    if (id && pw && pw2) {
        if (pw === pw2) {
            authenticate
                .signup(id, pw)
                .then(function(result){
                    res.redirect("/projects/weiboFollower");
                })
                .catch(function(errMsg){
                    req.session.signup_err = errMsg;
                    res.redirect("back");
                });

        } else {
            req.session.signup_err = "Password not the same";
            res.redirect("back");
        }
    } else {
        req.session.signup_err = "There is at least one empty field";
        res.redirect("back");
    }
	});


router.post("/login" , (req, res) => {
	const {id, pw} = req.body;
    if (id && pw) {
        authenticate
            .loginByPassowrd(id,pw)
            .then(token => {
            	// a cookie
                let aWeek = moment().add(1,"week").toDate();
                res.cookie("token",token,{expires: aWeek,signed: true});
                res.cookie("id",id,{expires: aWeek,signed: true});
                req.session.login_err = null;
                res.redirect("/projects/weiboFollower/app");
            })
            .catch(errMsg => {
                req.session.login_err = errMsg;
                res.redirect("back");
            });
    } else {
        req.session.login_err = "id/pw is empty";
        res.redirect("back");
    }
});
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
