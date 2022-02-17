'use strict';

let mongoose = require('mongoose'), TeacherClass = mongoose.model('TeacherClass');

exports.listTeacherClasses = function(req, res) {
    TeacherClass.find({}, function(err, teacherClass) {
        if (err)
            res.send(err);
        res.json(teacherClass);
    });
};

exports.listTeacherClassesBySubjectCode = function(req, res) {
    TeacherClass.find({subjectCode: req.params.subjectCode}, function(err, teacherClass) {
        if (err)
            res.send(err);
        res.json(teacherClass);
    });
};

exports.listTeacherClassPerTeacher = function(req, res) {
    TeacherClass.find({teacherId:req.params.teacherId}, function(err, teacherClass) {
        if (err)
            res.send(err);
        res.json(teacherClass);
    });
};

exports.createTeacherClass = function(req, res) {
    let new_teacherClass = new TeacherClass(req.body);

    TeacherClass.find({teacherId:req.body.teacherId, subjectCode: req.body.subjectCode}, function(err, subject) {
        if (err)
            res.send(err);
        if(subject.length>0){
            res.send({success:false, message:"Subject already configured", error:err});
        }else{
            new_teacherClass.save(function(err, teacherClass) {
                if (err)
                    res.send({success:false, message:"An error occured please contact admin", error:err});
                res.json({success:true, message:"Class subject added successfully."});
            });
        }
    });
};

exports.readTeacherClass = function(req, res) {
    TeacherClass.findById(req.params.classId, function(err, teacherClass) {
        if (err)
            res.send(err);
        res.json(teacherClass);
    });
};

exports.deleteTeacherClass = function(req, res) {
    TeacherClass.deleteOne({
        subjectCode: req.params.subjectCode,
        teacherId: req.params.teacherId
    }, function(err, teacherClass) {
        if (err)
            res.send(err);
        res.json({ message: 'Teacher Class successfully deleted' });
    });
};