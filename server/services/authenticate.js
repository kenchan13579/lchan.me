var Crypto = require("crypto-js");
var config = require("../config");
var User = require("../models/weiboFollower/User.js");
var Session = require("../models/weiboFollower/Session.js");
function encrypt(pw) {
    return Crypto.AES.encrypt(pw, config.salt).toString();
}

function decrypt(text) {
    var bytes  = Crypto.AES.decrypt(text, config.salt);
    var plaintext = bytes.toString(Crypto.enc.Utf8);
    return plaintext;
}

function createToken(id) {
    let o = {
        id: id,
        date: Date.now(),
    };
    return Crypto.AES.encrypt(JSON.stringify(o), config.salt).toString();
}
exports.signup = function(id, pw){
    var user = new User({
        id: id,
        pw: encrypt(pw),
        level:0,
    });
    var q = new Promise(function(resolve, reject){
        user.save(function(err, res){
            if (err) {
                let errMsg = err.message;
                if (errMsg.indexOf("duplicate") != -1) {
                    errMsg = "User name has been used"
                }
                reject(errMsg);
            } else {
                resolve(res);
            }
        });
    });
    return q;
};


exports.loginByPassowrd = function(id, pw){
    var q = new Promise((resolve, reject) => {
        User.findOne({
            id: id
        }, (err, doc) => {
            if ( err || doc == null) {
                return reject("No such id");
            }
            if ( decrypt(doc.pw) == pw) {
                let token = createToken(id);
                let session = new Session({
                    id: id,
                    token: token,
                });
                session.save((err, result) => {
                    if (err) {
                        reject(err.message);
                    }
                    resolve(token);
                });
            } else {
                reject("Wrong password");
            }

        });
    });
    return q;
}
exports.loginByToken = function(id, token) {
     var q = new Promise((resolve, reject) => {
        Session.find({
            id: id,
            token: token
        }, (err, doc) => {
            if ( err  ) {
                return reject(err.message);
            }
            if (doc.length > 0) {
                resolve();
            } else {
                console.log("no session found");
                reject("No session found");
            }
        });
    });
    return q;
}
