import workouts from "../models/liftbro/workouts";
exports.getWorkout = function(id, date) {
	var q = new Promise((resolve, reject) => {
	workouts.findOne({
			id: id,
			date: ,
		}, (err, result) => {
			if (err) {
				return reject(err.message);
			}
			if (result) {
				resolve(result.workout);
			} else {
				resolve({});
			}
		});
	});
};

exports.addWorkout = function(id, date, workout) {
	if (date instanceof Date) {
		date = Date.parse(date);
	}
	workouts.insert({
		id: id,
		date: date,
		workout: workout,
	}, (err, success) => {
		if (err) {
			return messages.badRequest(res, err.messages);
		}
		messages.success(res);
	});
};

exports.getWorkoutHistory = function() {

};

exports.deleteWorkout = function() {
	// getWorkout
	// delete
	
};