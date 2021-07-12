'use strict';

let mongoose = require('mongoose'), StudentRegistration = mongoose.model('StudentRegistrations');

exports.listStudentRegistrationsPerSubject = function(req, res) {
    StudentRegistration.find({subjectCode: req.body.subjectCode}, function(err, studentRegistration) {
        if (err)
            res.send(err);
        res.json(studentRegistration);
    });
};

exports.listRegistrationsPerStudent = function(req, res) {
    StudentRegistration.find({studentId: req.body.studentId}, function(err, studentRegistration) {
        if (err)
            res.send(err);
        res.json(studentRegistration);
    });
};

exports.enrolForSubject = function(req, res) {
    let new_studentRegistration = new StudentRegistration(req.body);
    new_studentRegistration.save(function(err, studentRegistration) {
        if (err)
            res.send(err);
        res.json(studentRegistration);
    });
};

exports.deleteStudentRegistration = function(req, res) {
    StudentRegistration.remove({
        _id: req.params.studentRegistrationId
    }, function(err, studentRegistration) {
        if (err)
            res.send(err);
        res.json({ message: 'Student Registration successfully deleted' });
    });
};