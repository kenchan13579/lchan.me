var Crypto = require("crypto-js");
var config = require("../config");
var User = require("../models/weiboFollower/User.js");
function encrypt(pw) {
    return Crypto.AES.encrypt(pw, config.salt);
}

function decrypt(text) {
    var bytes  = Crypto.AES.decrypt(text, config.salt);
    var plaintext = bytes.toString(Crypto.enc.Utf8);
    return plaintext;
}
exports.signup = function(id, pw){
    var user = new User({
        id: id,
        pw: encrypt(pw),
        level:0,
    });
    var q = new Promise(function(resolve, reject){
        user.save(function(err, res){
            console.log("err",err,"res",res);
            if (err) {
                reject(err.message);
            } else {
                resolve(res);
            }
        });
    });
    return q;
};


exports.login = function(id, pw){
    var q = new Promise((resolve, reject) => {
        User.findOne({
            id: id,
            pw: encrypt(pw)
        }, (err, doc) => {
            if ( err ) {
                reject(err.message);
            } else {
                resolve(doc);
            }
        });
    });
    return q;
}
