var router = require("express").Router();
var liftbroCtrl = require("../controllers/liftbro-ctrl");

router.get("/view_workout", liftbroCtrl.getWorkout);

router.post("/save_workout", liftbroCtrl.addWorkout);
/**
 * Retrieve workout history with ranged dates
 * @param  {[type]} "/get_workout_history" (req,         res [description]
 * @return {[type]}                        [description]
 */
router.get("/workout_history" ,liftbroCtrl.getWorkoutHistory);

router.post("/delete_workout", liftbroCtrl.deleteWorkout);

/*
router.route("/config")
	.get(liftbroCtrl.getConfig)
	.post(liftbroCtrl.setConfig);
   */
module.exports = router; 
