'use strict';

var mongoose = require('mongoose'), StudentMarks = mongoose.model('StudentMarks');

exports.listStudentMarksByClassId= function(req, res) {
    StudentMarks.find({classId: req.params.classId}, function(err, marks) {
        if (err)
            res.send(err);
        res.json(marks);
    });
};

exports.studentMarksForStudent = function(req, res) {
    StudentMarks.find({studentId: req.params.studentId}, function(err, marks) {
        if (err)
            res.send({success:false, message:"An error occured", error:err});
        res.json({success:true, message:"Student Reuslts returned", marks});
    });
};

//Students submits the Assignment - student function
exports.submitMarks = function(req, res) {

    var new_marks = new StudentMarks(req.body);
    new_marks.save(function(err, marks) {
        if (err)
            res.send({success:false, message:"An error occured please contact admin", error:err});
        res.json({success:true, message:"Marks submitted successfully."});
    });
};

exports.deleteStudentMarks = function(req, res) {
    StudentMarks.remove({
        _id: req.params.marksId
    }, function(err, subject) {
        if (err)
            res.send(err);
        res.json({ message: 'StudentMarks successfully deleted' });
    });
};





