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

exports.createSubject = function(req, res) {
    let new_subject = new Subject(req.body);
    new_subject.save(function(err, subject) {
        if (err)
            res.send(err);
        res.json(subject);
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
    Subject.remove({
        _id: req.params.subjectId
    }, function(err, subject) {
        if (err)
            res.send(err);
        res.json({ message: 'Subject successfully deleted' });
    });
};