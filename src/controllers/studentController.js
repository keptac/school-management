'use strict';

let mongoose = require('mongoose'), Student = mongoose.model('Students');
var batchRegisterStudents = require('../middleware/batchRegisterStudents');

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
            res.send({success:false, message:"An error occured please contact admin", error:err});
        res.json({success:true, message:"Student Register successfully."});
    });
};

exports.batchStudentsRegister= function (req, res) {
    batchRegisterStudents(req.file.filename,req, res );
}

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
    Student.find({studentId:req.params.studentId}, function (err, student) {
        if (err)
            res.send(err);
        res.json(student);
    });
};

// For reports get all students in a class
exports.listStudentsPerClass = function (req, res) {
    Student.find({ classId: req.params.classId }, function (err, students) {
        if (err)
            res.send(err);
        res.json(students);
    });
};

