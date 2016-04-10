var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    id: {type: String, required: "Id is required", index:{unique: true} },
    pw: {type: String, required: "Password is required"},
    level: {type: Number, default: 0},
    weiboTokens: {type: Array, default:[]},
    registerDate: {type:Date, default: Date.now},
    lastUpdated: {type:Date, default: Date.now}
});

var User = mongoose.model("user", UserSchema);


module.exports = User;
