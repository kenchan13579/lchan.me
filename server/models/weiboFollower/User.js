var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    id: {type: String, required: "Id is required", index:{unique: "User exists"} },
    pw: {type: String, required: "Password is required"},
    level: {type: Number, default: 0},
    registerDate: {type:Date, default: Date.now},
    lastUpdated: {type:Date, default: Date.now}
});

var User = mongoose.model("user", UserSchema);


module.exports = User;
