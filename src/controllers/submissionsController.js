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

//Students submits the Assignment - student function
exports.submitAssignment = function(req, res) {
    var new_submission = new Submission(req.body);
    new_submission.save(function(err, submission) {
        if (err)
            res.send(err);
        res.json(submission);
    });
};

// Re-upload assignment - Student function
exports.update_submission = function(req, res) {
    Submission.findOneAndUpdate({_id: req.params.submissionId}, req.body, {new: true}, function(err, submission) {
        if (err)
            res.send(err);
        res.json(submission);
    });
};

//View single student assignment
exports.readSubmission = function(req, res) {
    Submission.findById(req.params.submissionId, function(err, submission) {
        if (err)
            res.send(err);
        res.json(submission);
    });
};

// Mark student Assignment
exports.gradeSubmission = function(req, res) {
    Submission.findOneAndUpdate({_id: req.params.submissionId}, req.body, {new: true}, function(err, submission) {
        if (err)
            res.send(err);
        res.json(submission);
    });
};


exports.deleteSubmission = function(req, res) {
    Submission.remove({
        _id: req.params.submissionId
    }, function(err, subject) {
        if (err)
            res.send(err);
        res.json({ message: 'Submission successfully deleted' });
    });
};





