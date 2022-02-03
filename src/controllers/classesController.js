'use strict';
let mongoose = require('mongoose'), Classes = mongoose.model('Classes');

//Classes
exports.listClasses = function (req, res) {
    Classes.find({ }, function (err, assignment) {
        if (err)
            res.send(err);
        res.json(assignment);
    });
};

exports.addClass = function (req, res) {
    let newClass = new Classes(req.body);
    newClass.save(function (err, classes) {
        if (err)
            res.send({success:false, message:"An error occured please contact admin", error:err});
        res.json({success:true, message:"Class added successfully."});
    });
};

exports.deleteClass = function (req, res) {
    Classes.deleteOne({
        classId: req.params.classId
    }, function (err, classes) {
        if (err)
            res.send(err);
        res.json({ message: 'Classes successfully deleted' });
    });
};


exports.updateClass = function (req, res) {
    try {
        console.log('Edit Student Record :::: '+req.body.classId);
        Classes.findOneAndUpdate({ classId: req.body.classId }, req.body, { new: true }, function (err, classe) {
            if (err)
                res.send({success:false, message:"Failed to update class", error:err});
            res.json({success:true, message:"Class update successful."});
        });
    } catch (error) {
        res.send({success:false, message:"An error occured please contact admin", error:err});
    }
};