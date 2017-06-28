var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var userRouter = function(app, config) {

    //==========Login==========
    app.post('/login', function(req, res){
        var uid = req.body.username;
        var pwd = req.body.password;

        MongoClient.connect(config.connectionString, function(err, db) {
            var users = db.collection('user');

            users.aggregate([
                { $match: { $and: [ {'username': uid}, {'password': pwd} ] } },
                { $project: {'username': 1, 'name': 1, 'gender': 1, 'address': 1} }
            ], function(err, result) {
                if (result.length > 0) {
                    res.send({
                        'status': 'success',
                        'data': result[0]
                    })
                } else {
                    res.send({
                        'status': 'fail',
                        'data': null
                    })
                }
            })
        });
    })
    //==========#END Login==========

    //==========Get a user profile==========
    app.get('/authors/:id', function(req, res){
        var id = req.params.id;

        MongoClient.connect(config.connectionString, function(err, db) {
            var users = db.collection('user');

            users.aggregate([
                { $match: {'username': id} },
                { $project: {'username': 1, 'name': 1, 'gender': 1, 'address': 1} }
            ], function(err, result) {
                if (result.length > 0) {
                    return res.send({
                        'status': 'success',
                        'data': result[0]
                    })
                } else {
                    return res.send({
                        'status': 'fail',
                        'data': null
                    })
                }
            })
        });
    })
    //==========#END Get a user profile==========

    //==========Edit a user profile==========
    app.patch('/authors/:id', function(req, res){
        var id = req.params.id;
        var pwd = req.body.password;
        var gender = req.body.gender;
        var name = req.body.name;
        var address = req.body.address;

        MongoClient.connect(config.connectionString, function(err, db) {
            var users = db.collection('user');

            users.update({ '_id': new ObjectId(id) }, {
                $set: { 'password': pwd, 'gender': gender, 'address': address }
            }, function(err, result) {
                if (!err) {
                    res.send({
                        'status': 'success',
                        'data': result
                    })
                } else {
                    res.send({
                        'status': 'fail',
                        'message': err
                    })
                }
            })
        });
    })
    //==========#END Edit a user profile==========
}

module.exports = userRouter;