var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var articleRouter = function(app, config) {
    app.get('/posts', function(req, res) {
        MongoClient.connect(config.connectionString, function(err, db) {
            var articles = db.collection('article');

            articles.aggregate([
            ], function(err, result) {
                if (result.length > 0) {
                    return res.send({
                        'status': 'success',
                        'data': result
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

    app.get('/posts/:id', function(req, res) {
        var id = req.params.id;

        MongoClient.connect(config.connectionString, function(err, db) {
            var articles = db.collection('article');

            try {
                articles.aggregate([
                    { $match: { 'id': new ObjectId(id) } }
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
            }
            catch(err) {
               return res.send({
                    'status': 'error',
                    'message': err
                }) 
            }
        });
    })

    app.post('/posts', function(req, res) {
        var uid = req.body.uid;
        var title = req.body.title;
        var content = req.body.content;
        var tags = req.body.tags;

        MongoClient.connect(config.connectionString, function(err, db) {
            var articles = db.collection('article');

            articles.insertOne({
                'author': new ObjectId(uid),
                'title': title,
                'content': content,
                'tags': tags,
                'created_at': new Date(),
                'updated_at': new Date(),
            }, function(err, result) {
                if (!err) {
                    if (result.length > 0) {
                        return res.send({
                            'status': 'success',
                            'data': result.insertedId
                        })
                    } 
                } else {
                    return res.send({
                        'status': 'fail',
                        'message': err
                    })
                }
            })
        });
    })

    app.patch('/posts/:id', function(req, res) {
        var id = req.param.id;
        var title = req.body.title;
        var content = req.body.content;
        var tags = req.body.tags;

        MongoClient.connect(config.connectionString, function(err, db) {
            var articles = db.collection('article');

            articles.update({'_id': new ObjectId(id)}, 
            { $set: {
                'title': title,
                'content': content,
                'tags': tags,
                'updated_at': new Date(),
            }}, function(err, result) {
                if (!err) {
                    if (result.length > 0) {
                        return res.send({
                            'status': 'success',
                            'data': result[0]
                        })
                    } 
                } else {
                    return res.send({
                        'status': 'fail',
                        'message': err
                    })
                }
            })
        });
    })

    app.delete('/posts/:id', function(req, res) {
        var id = req.param.id;

        MongoClient.connect(config.connectionString, function(err, db) {
            var articles = db.collection('article');

            articles.delete({'_id': new ObjectId(id)}, function(err, result) {
                if (!err) {
                    if (result.length > 0) {
                        return res.send({
                            'status': 'success',
                            'data': result[0]
                        })
                    } 
                } else {
                    return res.send({
                        'status': 'fail',
                        'message': err
                    })
                }
            })
        });
    })

}

module.exports = articleRouter;