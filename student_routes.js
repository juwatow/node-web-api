var _= require('lodash');
var Student = require('./student_model.js')

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
        Student.find(function(err, students) {
            if(err) {
                res.json({info: 'error during student finding', error: err});
            }
            res.json({info: 'students found successfuly', data: students});
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