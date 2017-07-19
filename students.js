var _= require('lodash');

module.exports = function(app){
    _students = [];

    /* Create */
    app.post('/students', function(req, res) {
        _students.push(req.body);
        res.json({info: 'student created successfuly'});
    });

    /* Read */
    app.get('/students', function(req, res) {
        res.send(_students);
    });

    app.get('/students/:id', function(req, res) {
        res.send(
            _.find(
                _students,
                {
                    id: parseInt(req.params.id)
                }
            )
        );
    });

    /* Update */
    app.put('/students/:id', function(req, res) {
        var index = _.findIndex(
            _students,
            {
                id: parseInt(req.params.id)
            }
        );
        _.merge(_students[index], req.body);
        res.json({info: 'student updated successfuly'});
    });

    /* Delete */
    app.delete('/students/:id', function(req, res) {
        _.remove(_students, function(student) {
            return student.id === parseInt(req.params.id)
        });
        res.json({info: 'student deleted successfuly'});
    });
}