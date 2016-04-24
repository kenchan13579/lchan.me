import LiftBro from "../services/liftbro-queries.js";
import ReturnMessage from "../services/messages.js";

exports.getWorkout = function(req, res) {
    const {id, date} = req.params;
    LiftBro.getWorkout(id, date)
        .then(workout => ReturnMessage.success(res, workout))
        .catch(errmsg => ReturnMessage.badRequest(res, errMsg));
};

exports.addWorkout = function(req , res) {
    const {id, date, workout} = req.body;
    LiftBro.addWorkout(id, date, work)
        .then(success => ReturnMessage.success(res,"success") )
        .catch(errMsg => ReturnMessage.badRequest(res, errmsg));
};

exports.getWorkoutHistory = function(req, res) {
   const {id} = req.params;
   LiftBro.getWorkoutHistory(id)
        .then(history => ReturnMessage.success(res, history))
        .catch(errMsg => ReturnMessage.badRequest(res, errMsg));
};

exports.deleteWorkout = function(req, res) {
    const {id, date} = req.body;
    LiftBro.deleteWorkout(id, date)
        .then(msg => ReturnMessage.success(res, msg))
        .catch(errMsg => ReturnMessage.badRequest(res, errMsg));

};
