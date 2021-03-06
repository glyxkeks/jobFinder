/**
 * Created by lala on 16.07.2015.
 */
var express = require('express');
//var mongoose = require('mongoose');
var jobModel = require('./models/Job');
var jobsData = require("./job-data.js");

var app = express();

require('./jobs-service.js')(jobsData, app);

app.set('views', __dirname);
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

//app.get('/api/jobs', function(req, res) {
//    jobsData.findJobs().then(function(collection) {
//        res.send(collection);
//    })
//});

app.get('*', function(req, res) {
    res.render('index');
});

//mongoose.connect('mongodb://localhost/jobfinder');
//mongoose.connect('mongodb://marc:123456@ds047602.mongolab.com:47602/jobfinder');
jobsData.connectDB('mongodb://marc:123456@ds047602.mongolab.com:47602/jobfinder')
    .then(function() {
        console.log('connected to mongodb successfully!');
        //console.log('running on port: ', port);
        jobsData.seedJobs();
        //console.log('populating empty database...');
    });

//var con = mongoose.connection;
//
//con.once('open', function() {
//    //console.log('connected to mongodb successfully!');
//    //console.log('running on port: ', port);
//    jobModel.seedJobs();
//    //console.log('populating empty database...');
//});

var port = 3000;

app.listen(process.env.PORT, process.env.IP);
//app.listen(port);

