var express = require('express');
var bodyParser = require('body-parser');
const config = require('./server/config');
var app = express();
var port = process.env.PORT || 1992;
var server = require('http').createServer(app);

app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));

// Route define
var userRouter = require('./routes/user')(app, config);
var articleRouter = require('./routes/article')(app, config);

server.listen(port, function() {
    console.log("Listening on port %s...", server.address().port);
});

