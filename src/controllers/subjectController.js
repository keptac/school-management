'use strict';

let mongoose = require('mongoose'), Subject = mongoose.model('Subjects');

exports.listSubjects = function(req, res) {
    Subject.find({}, function(err, subject) {
        if (err)
            res.send(err);
        res.json(subject);
    });
};

exports.listSubjectsPerTeacher = function(req, res) {
    Subject.find({teacherId:req.body.teacherId}, function(err, subject) {
        if (err)
            res.send(err);
        res.json(subject);
    });
};

exports.createSubject = function (req, res) {
    console.log('Subject Creation :::: '+req.body.subjectName+' '+req.body.subjectCode);
    let newSubject = new Subject(req.body);
    newSubject.save(function (err, subjects) {
        if (err)
            res.send({success:false, message:"An error occured please contact admin", error:err});
        res.json({success:true, message:"Subject added successfully."});
    });
};

exports.readSubject = function(req, res) {
    Subject.findById(req.params.subjectId, function(err, subject) {
        if (err)
            res.send(err);
        res.json(subject);
    });
};

exports.updateSubject = function(req, res) {
    Subject.findOneAndUpdate({_id: req.params.subjectId}, req.body, {new: true}, function(err, subject) {
        if (err)
            res.send(err);
        res.json(subject);
    });
};

exports.deleteSubject = function(req, res) {
    Subject.deleteOne({
        _id: req.params.subjectId
    }, function(err, subject) {
        if (err)
            res.send(err);
        res.json({ message: 'Subject successfully deleted' });
    });
};

exports.listAllSubjectsByLevel = function (req, res) {
    Subject.find({ level: req.params.level }, function (err, assignment) {
        if (err)
            res.send(err);
        res.json(assignment);
    });
};