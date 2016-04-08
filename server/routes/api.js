var router = require("express").Router();
var moment = require("moment");
var authenticate = require("../controllers/authenticate");
router.post("/login", (req, res) => {
   const {id, pw} = req.body;
    if (id && pw) {
        authenticate
            .loginByPassowrd(id,pw)
            .then(token => {
                let aWeek = moment().add(1,"week").toDate();
                res.cookie("token",token,{expires: aWeek,signed: true});
                res.cookie("id",id,{expires: aWeek,signed: true});
                res.redirect("/projects/weiboFollower/app");
            })
            .catch(errMsg => {
                res.redirect("back");
                res.render("login", {error: errMsg});
            });
    } else {
        res.redirect("back");
        res.render("login",{
            error: "id/pw is empty",
        })
    }
});

router.post("/signup", (req,res) => {
    const {id, pw , pw2} = req.body;
    if (id && pw && pw2) {
        if (pw === pw2) {
            authenticate
                .signup(id, pw)
                .then(function(result){

                    res.redirect("/projects/weiboFollower");
                })
                .catch(function(errMsg){
                    res.redirect("back");
                    res.render("signup", {error: errMsg});

                });

        } else {
            res.render("signup",{
                error: "Password not the same"
            });
        }
    } else {
        res.render("signup", {
            error: "There is at least one empty field"
        });
    }
});

module.exports = router;
