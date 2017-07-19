var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/students');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var students = require('./student_routes.js')(app);

var server = app.listen(3000, function(){
    console.log('Server running at http://127.0.0.1:3000/')
});