'use strict';
let mongoose = require('mongoose'), Assignment = mongoose.model('Assignments');

//Assignments
exports.listAssignmentsBySubjectCode = function (req, res) {
    Assignment.find({ subjectCode: req.params.subjectCode }, function (err, assignment) {
        if (err)
            res.send(err);
        res.json(assignment);
    });
};

exports.uploadAssignment = function (req, res) {
    let new_assignment = new Assignment(req.body);
    new_assignment.save(function (err, assignment) {
        if (err)
            res.send(err);
        res.json(assignment);
    });
};


exports.readAssignment = function (req, res) {
    Assignment.findById(req.params.assignmentId, function (err, assignment) {
        if (err)
            res.send(err);
        res.json(assignment);
    });
};

exports.updateAssignment = function (req, res) {
    Assignment.findOneAndUpdate({ _id: req.params.assignmentId }, req.body, { new: true }, function (err, assignment) {
        if (err)
            res.send(err);
        res.json(assignment);
    });
};

exports.deleteAssignment = function (req, res) {
    Assignment.remove({
        _id: req.params.assignmentId
    }, function (err, assignment) {
        if (err)
            res.send(err);
        res.json({ message: 'Assignment successfully deleted' });
    });
};