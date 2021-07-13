'use strict';

let mongoose = require('mongoose'), StudentRegistration = mongoose.model('StudentRegistrations');
var importStudents = require('../middleware/batchUploads');

// Upload Enrolment Batch
exports.batchStudentsSubject = function (req, res) {
    importStudents(req.file.filename);
    res.json({
        'msg': 'File uploaded/import successfully!', file: req.file
    });
}

exports.listStudentRegistrationsPerSubject = function (req, res) {
    StudentRegistration.find({ subjectCode: req.params.subjectCode }, function (err, studentRegistration) {
        if (err)
            res.send(err);
        res.json(studentRegistration);
    });
};

exports.listRegistrationsPerStudent = function (req, res) {
    console.log(req.params.studentId)
    StudentRegistration.find({ studentId: req.params.studentId }, function (err, studentRegistration) {
        if (err)
            res.send(err);
        res.json(studentRegistration);
    });
};

exports.enrolForSubject = function (req, res) {
    let studentBody = {
        subjectCode: req.body.subjectCode,
        studentId: req.body.studentId,
        studentSubjectCode: req.body.studentId + req.body.subjectCode
    };

    let new_studentRegistration = new StudentRegistration(studentBody);

    new_studentRegistration.save(function (err, studentRegistration) {

        if (err)
            if (err.name === 'MongoError' && err.code === 11000) {
                next(new Error('Student Already enrolled into this subject'));
            } else {
                next(err);
                res.send(err);
            }

        res.json(studentRegistration);
    });


};

exports.deleteStudentRegistration = function (req, res) {
    StudentRegistration.remove({
        _id: req.params.studentRegistrationId
    }, function (err, studentRegistration) {
        if (err)
            res.send(err);
        res.json({ message: 'Student Registration successfully deleted' });
    });
};





