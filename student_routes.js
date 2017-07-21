var _= require('lodash');
var Student = require('./student_model.js')
var redis = require('redis');

var client = redis.createClient('6379', '127.0.0.1');

module.exports = function(app){

    /* Create */
    app.post('/students', function(req, res) {
        var newStudent = new Student(req.body);
        newStudent.save(function(err) {
            if(err) {
                res.json({info: 'error during student creation', error: err});
            }
            res.json({info: 'student created successfuly'});
        })
    });

    /* Read */
    app.get('/students', function(req, res) {
        client.get('STUDENTS', function(error, students) {
            if(error) {throw error;};
            if(students) {
                res.json({info: 'students found successfuly from the cache', data: JSON.parse(students)});
            } else {
                Student.find(function(err, students) {
                    if(err) {
                        res.json({info: 'error during student finding', error: err});
                    }
                    res.json({info: 'students found successfuly from the DB', data: students});
                    //client.set('STUDENTS', JSON.stringify(students), function(error) {
                    client.setex('STUDENTS', 10, JSON.stringify(students), function(error) {
                        if(error) {throw error;};
                    });
                });
            }
        });
    });

    app.get('/students/:id', function(req, res) {
        Student.findById(req.params.id, function(err, student) {
            if(err) {
                res.json({info: 'error during student finding', error: err});
            }
            if(student) {
                res.json({info: 'student found successfuly', data: student});
            } else {
                res.json({info: 'student not found'});
            }
        });
    });

    /* Update */
    app.put('/students/:id', function(req, res) {
        Student.findById(req.params.id, function(err, student) {
            if(err) {
                res.json({info: 'error during student finding', error: err});
            }
            if(student) {
                _.merge(student, req.body);
                student.save(function(err) {
                    if(err) {
                        res.json({info: 'error during student update', error: err});
                    }
                    res.json({info: 'student updated successfuly'});
                })
            } else {
                res.json({info: 'student not found'});
            }
        });
    });

    /* Delete */
    app.delete('/students/:id', function(req, res) {
        Student.findByIdAndRemove(req.params.id, function(err) {
            if(err) {
                res.json({info: 'error during student deletion', error: err});
            }
            res.json({info: 'students deleted successfuly'});
        });
    });
}