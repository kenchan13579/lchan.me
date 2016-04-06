var router = require("express").Router();
var authenticate = require("../controllers/authenticate");
router.post("/login", (req, res) => {
    var id = req.body.id;
    var pw = req.body.pw;
    if (id && pw) {
        authenticate
            .login(id,pw)
            .then(res => res.end(res))
            .catch(errMsg => res.end(errMsg));
    } else {
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
                    res.json(result);
                })
                .catch(function(errMsg){
                    res.end(errMsg);
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
