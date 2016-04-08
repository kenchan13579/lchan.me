var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var UserSessionSchema = new Schema({
    id: {type: String, required: true },
	token: String,
	expired: {type:Date, expires: 60 * 60 *24 *7}, // a week
    created: {type:Date, default: Date.now},
});

var userSession = mongoose.model("user_session", UserSessionSchema);


module.exports = userSession;
