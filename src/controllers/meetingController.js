'use strict';

let mongoose = require('mongoose'), Meeting = mongoose.model('Meetings');

exports.listMeetings = function(req, res) {
    Meeting.find({}, function(err, subject) {
        if (err)
            res.send(err);
        res.json(subject);
    });
};

exports.listMeetingsByClass = function(req, res) {
    Meeting.find({classId:req.params.classId}, function(err, subject) {
        if (err)
            res.send(err);
        res.json(subject);
    });
};

exports.listMeetingsPerTeacher = function(req, res) {
    Meeting.find({teacherId:req.params.teacherId}, function(err, subject) {
        if (err)
            res.send(err);
        res.json(subject);
    });
};

exports.createMeeting = function (req, res) {
    console.log('Meeting Creation :::: '+req.body.meetingId+' '+req.body.subjectName);
    console.log(req.body);
    let newMeeting = new Meeting(req.body);
    newMeeting.save(function (err, subjects) {
        if (err)
            res.send({success:false, message:"An error occured please contact admin", error:err});
        res.json({success:true, message:"Meeting added successfully."});
    });
};

exports.updateMeeting = function(req, res) {
    Meeting.findOneAndUpdate({meetindId: req.params.meetingId}, req.body, {new: true}, function(err, subject) {
        if (err)
            res.send(err);
        res.json(subject);
    });
};

exports.deleteMeeting = function(req, res) {
    Meeting.remove({
        _id: req.params.subjectId
    }, function(err, subject) {
        if (err)
            res.send(err);
        res.json({ message: 'Meeting successfully deleted' });
    });
};
