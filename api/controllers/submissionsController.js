'use strict';

var mongoose = require('mongoose'), Submission = mongoose.model('Submissions');

exports.listSubmissionsByAssignmentId = function(req, res) {
    Submission.find({subjectCode: req.params.subjectCode}, function(err, submission) {
        if (err)
            res.send(err);
        res.json(submission);
    });
};

exports.submissionsForStudent = function(req, res) {
    Submission.find({subjectCode: req.params.subjectCode, studentId: req.params.studentId}, function(err, submission) {
        if (err)
            res.send(err);
        res.json(submission);
    });
};

exports.submitAssignment = function(req, res) {
    var new_submission = new Submission(req.body);
    new_submission.save(function(err, submission) {
        if (err)
            res.send(err);
        res.json(submission);
    });
};

exports.readSubmission = function(req, res) {
    Submission.findById(req.params.submissionId, function(err, submission) {
        if (err)
            res.send(err);
        res.json(submission);
    });
};
