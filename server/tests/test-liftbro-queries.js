var should = require("should");
var config = require("../config");
var mongoose = require("mongoose");
var Workout = require("../models/liftbro/workouts");
var liftbroQueries = require("../services/liftbro-queries");
mongoose.connect(config.database);

describe("addWorkout()" , function() {

    this.timeout(5000);
    var id = "test";
    var  date = new Date(2016,4,4);
    var workout = [{name:"bench",set:5}];

    afterEach(function() {
        Workout.remove({
            id: id,
            date: date,
        }).exec();
     });


    describe("add one new workout", function() {
        it("should return one workout", function(done){

            liftbroQueries.addWorkout(id, date, workout)
                .then(function(success) {
                    should.ok(success);
                    Workout.find({
                        id: id,
                        date: date,
                    }, function(err, result)  {
                        should.not.exist(err);
                        should.equal((result.length), 1);

                        done();
                    });
                })
                .catch(function(err) {
                    console.log(err);
                    should.not.exist(a);
                    done();
                });
        });
    });

    describe("add 2 workout with same id & date", function() {
        it("should return error", function(done) {
            var newWorkout = [{name:"bench",set:1}];
            liftbroQueries
                .addWorkout(id, date, workout)
                .then(function(success) {
                    should.ok(success);
                    Workout.find({
                        id: id,
                        date: date,
                    }, function(err, result)  {
                        should.not.exist(err);
                        should.equal((result.length), 1);
                        liftbroQueries
                            .addWorkout(id,date, newWorkout)
                            .then(function(success) {
                                console.log(success);
                                should.not.be.ok(success);
                                done();
                            })
                            .catch(function(err) {
                                console.log(err);
                                should.exist(err);
                                done();
                            });

                    });
                })
                .catch(function(err) {
                    console.log(err);
                    should.not.exist(a);
                    done();
                });
        });
    });


});


describe("editWorkout()", function() {
    this.timeout(5000);
    var id = "test";
    var  date = new Date(2016,4,4);
    var workout = [{name:"bench",set:5}];
    var workout2 = [{name:"bench",set:1}];
    beforeEach(function(done){
        liftbroQueries.addWorkout(id, date, workout)
                .then(function(success) {
                   done();
                });
    });
    afterEach(function() {
        Workout.remove({
            id: id,
            date: date,
        }).exec();
     });
    describe("edit an existing working", function() {
        it("should have the set changed", function(done) {
            liftbroQueries
                .editWorkout(id, date, workout2)
                .then(function(success) {
                    should.exist(success);
                    should.equal(success.workout[0].set, workout2[0].set);
                    done();
                })
                .catch(function(err) {
                    console.log(err);
                    should.not.exist(err);
                    done();
                });
        });
    });
    describe("edit non existing working", function() {
        it("should have the set changed", function(done) {
            liftbroQueries
                .editWorkout("Not exist" , date, workout2)
                .then(function(success) {
                    should.not.exist(success);
                    done();
                })
                .catch(function(err) {
                    console.log(err);
                    should.exist(err);
                    done();
                });
        });
    });
});


describe("getWorkout()", function() {
    this.timeout(5000);
    var id = "test";
    var  date = new Date(2016,4,4);
    var workout = [{name:"bench",set:5}];
    beforeEach(function(done){
        liftbroQueries
            .addWorkout(id, date, workout)
            .then(function(success) {
               done();
            });
    });
    afterEach(function() {
        Workout.remove({
            id: id,
            date: date,
        }).exec();
     });
    describe("get existed record", function() {
        it("should get the record", function(done) {
            liftbroQueries
                .getWorkout(id, date)
                .then(function(success) {
                    should.exist(success);
                    done();
                })
                .catch(function(err) {
                    console.log(err);
                    should.not.exist(err);
                    done();
                });
        });
    });
    describe("get non existed record", function() {
        it("should be null", function(done) {
            liftbroQueries
                .getWorkout("Not exist" , date)
                .then(function(success) {
                    should.not.exist(success);
                    done();
                })
                .catch(function(err) {
                    should.equal(err, "No such record");
                    done();
                });
        });
    });
});

describe("deleteWorkout()", function() {
    this.timeout(5000);
    var id = "test";
    var  date = new Date(2016,4,4);
    var workout = [{name:"bench",set:5}]
    beforeEach(function(done) {
        liftbroQueries
            .addWorkout(id, date, workout)
            .then(function(success) {
               done();
            });
    });
    it("should delete the record", function(done) {
        liftbroQueries
            .deleteWorkout(id, date)
            .then(function() {
                Workout.find({
                    id: id,
                    date: date
                }, function(err, result) {
                    should.not.exist(err);
                    should.equal(result.length, 0);
                    done();
                });
            })
            .catch(function(err){
                console.log(err);
                should.not.exist(err);
                done();
            });
    });
     it("should delete the record", function(done) {
        liftbroQueries
            .deleteWorkout(id, date)
            .then(function() {
                Workout.find({
                    id: "not exist",
                    date: date
                }, function(err, result) {
                    should.not.exist(err);
                    should.equal(result.length, 0);
                    done();
                });
            })
            .catch(function(err){
                console.log(err);
                should.not.exist(err);
                done();
            });
    });
});
