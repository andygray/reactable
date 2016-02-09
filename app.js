var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

var api_path = __dirname + '/api';
var models_path = __dirname + '/models';

app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/public'));

if (!process.env.MONGOLABURI) {
    console.log('REMEMBER TO SET THE ENVIRONMENT VARS with a source script or manually. See README.');
    process.exit(1);
}

if (process.env.MONGOLOCAL) {
    var dbURI = 'mongodb://' + process.env.MONGOLOCAL + ':27017/' + (process.env.MONGOLABDB || 'reactable');
} else {
    var dbURI = 'mongodb://' + process.env.MONGOLABUSR + ':' + process.env.MONGOLABPW + '@' + process.env.MONGOLABURI + ':' + process.env.MONGOLABPORT + '/' + (process.env.MONGOLABDB || 'reactable');
}

console.log('connecting to ' + dbURI);

var options = {
    server: {socketOptions: {keepAlive: 1, connectTimeoutMS: 30000}},
    replset: {socketOptions: {keepAlive: 1, connectTimeoutMS: 30000}}
};

mongoose.connect(dbURI, options);
var conn = mongoose.connection;

// set up mongoose schemas
var competitionModel = require(models_path + '/' + 'Competition.js');
var pickModel = require(models_path + '/' + 'Pick.js');
var userModel = require(models_path + '/' + 'User.js');

var competitionApi = require(api_path + '/' + 'Competition.js');
var pickApi = require(api_path + '/' + 'Pick.js');
var tableApi = require(api_path + '/' + 'Table.js');

var competitionModel = competitionModel(mongoose);
var pickModel = pickModel(mongoose);
var userModel = userModel(mongoose);

competitionApi(app, competitionModel);
pickApi(app, pickModel);
tableApi(app, competitionModel, pickModel);

conn.on('error', console.error.bind(console, 'connection error:'));

var port = process.env.PORT || 8080;
conn.once('open', function() {
    var server = app.listen(port);
    console.log('localhost running on ' + port);

    var io = require('socket.io').listen(server);

    io.sockets.on('connection', function(socket){
        console.log('Connected: %s', socket.id);
    });
});





