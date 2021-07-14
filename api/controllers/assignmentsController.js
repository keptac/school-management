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
    var fileFolder = __dirname + '/../../uploads/'+req.body.subjectCode+'/';
    try{
        req.files.forEach(element => {
            req.body.assignmentPath = fileFolder + element.filename;
            let new_assignment = new Assignment(req.body);
            new_assignment.save(function (err, assignment){
                if (err)
                    res.send(err);
                console.log('\n>>>>>>>>>> Added assignment >>>>>>>>>\n'+assignment);
            });
        });
        return res.status(201).json({success:true, message:"Assignment/Homework issued"})
    }catch (error){
        console.log(error);
        return res.status(500).json({ "error": "Failed to upload assignment", reason: error })
    }
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