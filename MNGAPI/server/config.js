//=====Database config=====
var server = "localhost";
var port = "27017";
var username = "mngiang";
var password = "giang.2017";
var dbName = "blog";

var connectionString = 'mongodb://' + username + ':' + password + '@' + server + ':' + port + '/' + dbName;
// =====#END Database config=====

exports.connectionString = connectionString;