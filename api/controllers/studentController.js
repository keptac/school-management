'use strict';

let mongoose = require('mongoose'), Student = mongoose.model('Students');

exports.listStudents = function (req, res) {
    Student.find({}, function (err, student) {
        if (err)
            res.send(err);
        res.json(student);
    });
};

exports.registerStudent = function (req, res) {
    let new_student = new Student(req.body);
    new_student.save(function (err, student) {
        if (err)
            res.send(err);
        res.json(student);
    });
};

//Online Application
exports.onlineApplication = function (req, res) {
    let application = new Student(req.body);
    application.save(function (err, student) {
        if (err)
            res.send(err);
        res.json(student);
    });
};

exports.readStudent = function (req, res) {
    Student.findById(req.params.studentId, function (err, student) {
        if (err)
            res.send(err);
        res.json(student);
    });
};
