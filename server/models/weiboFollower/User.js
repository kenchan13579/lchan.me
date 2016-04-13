var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    id: {type: String, required: "Id is required", index:{unique: true} },
    pw: {type: String, required: "Password is required"},
    level: {type: Number, default: 0},
    weiboTokens:  {type: Schema.Types.Mixed, default:{}},
    /*
        uid: {
             token: {type:String,},
             expired: {type: Date, default: Date.now,expires: 60 * 60 * 24 }, // a day
        }
    */
    registerDate: {type:Date, default: Date.now},
    lastUpdated: {type:Date, default: Date.now}
}, { minimize:false });

var Users = mongoose.model("users", UserSchema);


module.exports = Users;
