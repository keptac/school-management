'use strict';
let mongoose = require('mongoose'), ReportSubmission = mongoose.model('ReportSubmissions');

//ReportSubmissions
exports.listAllReportSubmissions = function (req, res) {
    ReportSubmission.find({ }, function (err, assignment) {
        if (err)
            res.send(err);
        res.json(assignment);
    });
};

exports.checkSubmissionStatus = function(req, res) {
    ReportSubmission.find({teacherId: req.params.teacherId, subject: req.params.subjectCode}, function(err, marks) {
        if (err)
        
            res.send(err);
        if(marks.length>0){
            res.json({submitted:true})
        }else{
            res.json({submitted:false})
        }
    });
};

exports.addReportSubmission = function (req, res) {
    let newReportSubmission = new ReportSubmission(req.body);
    newReportSubmission.save(function (err, reportSubmissions) {
        if (err)
            res.send({success:false, message:"An error occured please contact admin", error:err});
        res.json({success:true, message:"Report submitted successfully."});
    });
};

exports.deleteReportSubmission = function (req, res) {
    ReportSubmission.remove({
        _id: req.params.subjectCode
    }, function (err, subject) {
        if (err)
            res.send(err);
        res.json({ message: 'ReportSubmission successfully deleted' });
    });
};