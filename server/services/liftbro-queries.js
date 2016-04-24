var workouts = require("../models/liftbro/workouts");
exports.getWorkout = function(id, date) {
	var q = new Promise((resolve, reject) => {
		workouts
			.findOne({
				id: id,
				date: date,
			}, (err, result) => {
				if (err) {

					return reject(err.message);
				}
				if (result) {
					resolve(result.workout);
				} else {
					reject("No such record");
				}
			});
	});
	return q;
};

exports.addWorkout = function(id, date, workout) {
	var q = new Promise((resolve, reject) => {
		var w = new workouts({
			id: id,
			date: date,
			workout: workout,
		});
		w.save((err, success) => {
			if (err) {
				if (err.message.indexOf("duplicate") != -1) {
						err.message = "Workout exists";
				}
				return reject(err.message);
			}
			resolve(success);
		});
	});
	return q;
};
exports.editWorkout = function(id,date, workout) {
	var q = new Promise((resolve, reject) => {
		workouts
			.findOneAndUpdate({
				id: id,
				date: date,
			},{
				workout: workout
			}, {
				new: true,
			}, function(err, success) {
				if (err ) {
					return reject(err.message);
				}
				if (success == null) {
					return reject("Not existed");
				}
				resolve(success);
			});
	});
	return q;
}
exports.getWorkoutHistory = function(id) {
	var q = new Promise((resolve, reject) => {
	workouts.find({
			id: id,
		}, (err, result) => {
			if (err) {
				return reject(err.message);
			}
			if (result.length  > 0) {
				resolve(result);
			} else {
				resolve({});
			}
		});
	});
	return q;
};

exports.deleteWorkout = function(id, date) {
	var q = new Promise((resolve, reject) => {
	workouts.remove({
			id: id,
			date: date,
		}, (err, success) => {
			if (err) {
				return reject(err.message);
			}
			resolve("Deleted");
		});
	});
	return q;

};

