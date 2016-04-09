var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    id: {type: String, required: "Id is required", index:{unique: true} },
    pw: {type: String, required: "Password is required"},
    level: {type: Number, default: 0},
    weiboTokens: [
    	{
    		access_token: {type: String, required: true, index:{unique: true}},
    		expires_in: {type: Date, required: true},
    		uid: {type: String, required: true},
    	}
    ],
    registerDate: {type:Date, default: Date.now},
    lastUpdated: {type:Date, default: Date.now}
});

UserSchema.method("clearTokens", (a) => {
	console.log(a);
});
var User = mongoose.model("user", UserSchema);


module.exports = User;
