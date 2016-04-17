var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var WorkoutSchema = new Schema({
	id: String,
	workout: {},
	date: Date

}, {minimize: false});

WorkoutSchema.index({id: 1, date: 1}, {unique: true});
module.exports = mongoose.model("workouts", WorkoutSchema);
