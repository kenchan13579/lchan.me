var router = require("express").Router(),
	request = require("superagent"),
	querystring = require("querystring"),
	weiboCtrl = require("../controllers/weibo/weibo-ctrl"),
 	weiboAPI = require("../config").app.weiboFollower;

router.post("/auth" , (req, res) => {
	const {id} = req.signedCookies;
	const params = querystring.stringify({
		code: req.body.code,
		grant_type: "authorization_code",
		client_id: weiboAPI.APP_KEY,
		client_secret: weiboAPI.APP_SECRET,
		redirect_uri: weiboAPI.REDIRECT_URL,
	});
	request
		.post("https://api.weibo.com/oauth2/access_token?" + params)
		.end((err, result) => {
			if (err) {
				return res.json(JSON.parse(result.text).error_description);
			}
			result = JSON.parse(result.text);
			weiboCtrl
				.addToken(id, result)
				.then((uid, token, expiredDate) => {
					res.end();
				})
				.catch((fail) => res.end(fail));

		});
});

router.get("/get_account_info", (req, res) => {
	const {id, token} = req.signedCookies;
	weiboCtrl.getAccountInfo(id, token)
		.then((info) => res.json(info))
		.catch((errMsg) => res.error(400).end(errMsg));
});
module.exports = router;
