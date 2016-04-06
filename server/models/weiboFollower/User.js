var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    id: String,
    pw: String,
    level: String,
    registerDate: {type:Date, default: Date.now}
});

var User = mongoose.model("TestUser", UserSchema);


module.exports = User;
