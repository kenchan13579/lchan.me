var authenticate = require("../services/authenticate");
var messages = require("../services/messages");
exports.login = function( req, res ) {
	const {id, pw} = req.body;
    if (id && pw) {
        authenticate
            .loginByPassowrd(id,pw)
            .then(token => {
            	// a cookie
                let aWeek = moment().add(1,"week").toDate();
                res.cookie("token",token,{expires: aWeek,signed: true});
                res.cookie("id",id,{expires: aWeek,signed: true});
                messages.success(res, {
                	id: id,
                	token: token,
                });
            })
            .catch(errMsg => {
                messages.badRequest(res, errMsg);
            });
    } else {
        messages.badRequest(res, "Enter id / password");
    }
};

exports.signup = function(req, res) {
	const {id, pw , pw2} = req.body;
    if (id && pw && pw2) {
        if (pw === pw2) {
            authenticate
                .signup(id, pw)
                .then(function(result){
                    messages.success(res);
                })
                .catch(function(errMsg){
                    messages.badRequest(res, errMsg);
                });

        } else {
        	messages.badRequest(res, "Password not the same");
        }
    } else {
        messages.badRequest(res, "There is at least one empty field");
    }
};