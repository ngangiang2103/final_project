//=====Database config=====
var server = 'local if you run this API in your PC';
var port = "the MongoDb port (default is 27017)";
var username = "the username of your MongoDb Database";
var password = "the password of your MongoDb Database";
var dbName = "the name of your MongoDb Database";

var connectionString = 'mongodb://' + username + ':' + password + '@' + server + ':' + port + '/' + dbName;
// =====#END Database config=====

exports.connectionString = connectionString;