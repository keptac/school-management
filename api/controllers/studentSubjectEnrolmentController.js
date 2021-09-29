'use strict';

let mongoose = require('mongoose'), StudentEnrolment = mongoose.model('StudentEnrolments');
var importStudents = require('../middleware/batchUploads');

// Upload Enrolment Batch
exports.batchStudentsSubject = function (req, res) {
    importStudents(req.file.filename);
    res.json({
        'msg': 'File uploaded/import successfully!', file: req.file
    });
}

exports.listStudentEnrolmentsPerSubject = function (req, res) {
    StudentEnrolment.find({ subjectCode: req.params.subjectCode }, function (err, studentEnrolment) {
        if (err)
            res.send(err);
        console.log(studentEnrolment);
        res.json(studentEnrolment);
    });
};

exports.listEnrolmentsPerStudent = function (req, res) {
    StudentEnrolment.find({ studentId: req.params.studentId }, function (err, studentEnrolment) {
        if (err)
            res.send(err);
        res.json(studentEnrolment);
    });
};

exports.enrolForSubject = function (req, res) {
    let studentBody = {
        subjectCode: req.body.subjectCode,
        studentId: req.body.studentId,
        studentSubjectCode: req.body.studentId + req.body.subjectCode
    };

    let new_studentEnrolment = new StudentEnrolment(studentBody);

    new_studentEnrolment.save(function (err, studentEnrolment) {

        if (err)
            if (err.name === 'MongoError' && err.code === 11000) {
                next(new Error('Student Already enrolled into this subject'));
            } else {
                next(err);
                res.send(err);
            }

        res.json(studentEnrolment);
    });


};

exports.deleteStudentEnrolment = function (req, res) {
    StudentEnrolment.remove({
        _id: req.params.studentEnrolmentId
    }, function (err, studentEnrolment) {
        if (err)
            res.send(err);
        res.json({ message: 'Student Enrolment successfully deleted' });
    });
};





