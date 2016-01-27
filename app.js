var mongoose = require('mongoose');
var express = require('express');

var app = express();

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

// set up mongoose schema
var competitionModel = require(models_path + '/' + 'Competition.js');
var tableApi = require(api_path + '/' + 'Table.js');

tableApi(app, competitionModel(mongoose));

conn.on('error', console.error.bind(console, 'connection error:'));

var port = process.env.PORT || 8080;
conn.once('open', function() {
    app.listen(port);
    console.log('localhost running on ' + port);
});





