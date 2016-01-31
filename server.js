var root = "D:\\MyApp\\NodeScript";
var port = 3128;

var express = require('express');
var app = express();
var node = require('./node')(root, express);

app.use('/node', node);

var server = app.listen(port, '127.0.0.1', function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Guild Crawler App Listening at http://%s:%s", host, port);
});
