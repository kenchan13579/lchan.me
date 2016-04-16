exports.badRequest = function(res, message) {
	res.status(400).json({
		code: 400,
		msg: message || "bad request",
	});
}

exports.unauthorized = function(res, message) {
	res.status(401).json({
		code: 401,
		msg: message || "unauthorized",
	});
}

exports.success = function(res, body) {
	if (typeof body === 'string') {
		return res.json({
			code: 200,
			msg: body,
		});
	}
	res.json({
		code: 200,
		data: body || null,
	});
}

