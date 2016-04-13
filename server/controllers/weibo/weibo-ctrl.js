let User = require("../../models/weiboFollower/User");
let authenticate = require("../authenticate");
let request = require("superagent");

function callWeiboShowUsers(weiboTokens) {
    let t = 1000;
    let promises = Object.keys(weiboTokens).map((uid) => {
        return new Promise((resolve, reject) => {
                request
                .get("https://api.weibo.com/2/users/show.json")
                .query({
                    access_token: weiboTokens[uid].token,
                    uid: uid
                })
                .end((err, result) => {
                    if (err) {
                        console.log(err);
                        return reject(err);
                    }
                    let response = JSON.parse(result.text);
                    resolve(response);
                } );
        })
    });
   return Promise.all(promises);
}


exports.addToken = function(id, weiboToken) {
	return new Promise((resolve, reject) => {
        User.findOne({id: id}, (err, result) => {
            if (err || result == null) {
                return reject(err.message || "No uch id");
            }
            let expiredDate = new Date(Date.now() + weiboToken.expires_in);
             // token exist
            if (!result.weiboTokens[weiboToken.uid]) {
                    result.weiboTokens[weiboToken.uid] = {
                    token: weiboToken.access_token,
                    expired: expiredDate,
                }
                result.markModified("weiboTokens");
                result.save((err, success) => {
                    if (err) {
                       return reject("Unable to save access token");
                    }
                    resolve( weiboToken.uid, weiboToken.access_token,expiredDate);
                });
            } else if (result.weiboTokens[weiboToken.uid].token != weiboToken.access_token) {
                // old token expires , add new token
                result.weiboTokens[weiboToken.uid] = {
                    token: weiboTokens.access_token,
                    expired: expiredDate,
                };
                result.markModified("weiboTokens");
                result.save((err, success) => {
                    if (err) {
                        return reject(err.message);
                    }
                    resolve(weiboToken.uid, weiboToken.access_token,expiredDate);
                });
            } else {
                // there is exisiting tokekn
                resolve(weiboToken.uid, weiboToken.access_token, expiredDate);
            }

        });
	});
}

exports.getAccountInfo = function(id, token) {
    console.log("here");
    return new Promise((resolve, reject) => {
        if ( !id || !token) {
            return reject("Missing params");
        }
        authenticate.loginByToken(id,token)
            .then(() => {
                User.findOne({id:id}, (err, doc) => {
                    if (err || doc == null) {
                        return reject(err.message || "ID not found")
                    }
                    let result = [];
                    let weiboTokens = doc.weiboTokens;
                    callWeiboShowUsers(doc.weiboTokens)
                        .then((info_array) => resolve(info_array))
                        .catch((msg) => reject(msg));


                });

            })
            .catch((msg) => reject(msg));
    });
};
