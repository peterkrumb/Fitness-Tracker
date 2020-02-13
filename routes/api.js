var db = require("../models");

module.exports = function(app) {

    //<--Gets all workouts saved to database-->
    app.get("/api/workouts", (req, res) => {
        db.Workout.find({})
            .then(workout => {
                res.json(workout);
            })
            .catch(err => {
                res.json(err);
            });
    });

    //<--Creates a workout routine and posts to the database-->
    app.post("/api/workouts/", (req, res) => {
        db.Workout.create(req.body)
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });

    //<--Route for adding a workout into the workout routine-->
    app.put("/api/workouts/:id", function(req, res) {
        db.Workout.updateOne({
                _id: req.params._id
            }, { $push: { exercises: req.body } })
            .then(function(data) {

                res.json(data);
            });
    });
    app.get("/api/workouts/range", function(req, res) {
        db.Workout.find({}).then(function(data) {
            res.json(data);
        });
    });

};