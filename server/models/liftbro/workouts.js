var Schema = require("mongoose").Schema;

var WorkoutSchema = new Schema({
	id: String,
	workout: {},
	date: Date

}, {minimize: false});

WorkoutSchema.index({id: 1, date: 1}, {unique: true});
export default mongoose.model("workouts", WorkoutSchema);