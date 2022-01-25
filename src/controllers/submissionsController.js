'use strict';

var mongoose = require('mongoose'), Submission = mongoose.model('Submissions');
const path = require('path');

exports.listSubmissionsByAssignmentId = function(req, res) {
    Submission.find({assignmentId: req.params.assignmentId}, function(err, submission) {
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
exports.submitAssignmentIpfs = function (req, res) {
    console.log('\nSubmitting Assignment :::: '+req.body.submissionId);
    var success = false;
    try{
        req.files.forEach(element => {
            req.body.ext = path.extname(element.filename);
            console.log(req.body);
            let new_submission = new Submission(req.body);
            new_submission.save(function (err, submission){
                console.log('\n>>>>>>>>>> Added Submission >>>>>>>>>\n'+submission);
                if (err){
                    res.send(err);
                }else{
                    success = true;
                    console.log('\n>>>>>>>>>> Added Submission >>>>>>>>>\n'+submission);
                }
            });
        });
        if(success){
            return res.status(201).json({success:true, message:"Assignment/Homework submitted"})
        }else{
            return res.send({ message:"Upload failed", "error": "Failed to upload assignment" })
        }
    }catch (error){
        console.log(error);
        return res.send({ "error": "Failed to upload assignment", reason: error })
    }
};

exports.submitAssignment = function (req, res) {
    console.log('\nSubmitting Assignment :::: '+req.body.submissionId);
    // var fileFolder = __dirname + '/../../uploads/'+req.body.submissionId+'/';
    var fileFolder = req.body.submissionId+'/';
    var success = false;
    try{
        req.files.forEach(element => {
            req.body.submissionPath = fileFolder + element.filename;
            req.body.ext = path.extname(element.filename);
            console.log(req.body);
            let new_submission = new Submission(req.body);
            new_submission.save(function (err, submission){
                console.log('\n>>>>>>>>>> Added Submission >>>>>>>>>\n'+submission);
                if (err){
                    res.send(err);
                }else{
                    success = true;
                    console.log('\n>>>>>>>>>> Added Submission >>>>>>>>>\n'+submission);
                }
            });
        });
        if(success){
            return res.status(201).json({success:true, message:"Assignment/Homework submitted"})
        }else{
            return res.send({ message:"Upload failed", "error": "Failed to upload assignment" })
        }
       
    }catch (error){
        console.log(error);
        return res.send({ "error": "Failed to upload assignment", reason: error })
    }
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





