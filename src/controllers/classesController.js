'use strict';
let mongoose = require('mongoose'), Classes = mongoose.model('Classes');

//Classes
exports.listClasses = function (req, res) {
    Classes.find({ }, function (err, classes) {
        if (err)
            res.send(err);
        res.json(classes);
    });
};

exports.addClass = function (req, res) {
    Classes.find({className:req.body.className, station: req.body.station}, function(err, classes) {
        if (err)
            res.send(err);
        if(classes.length>0){
            res.send({success:false, message:"Class already configured", error:err});
        }else{
            let newClass = new Classes(req.body);
            newClass.save(function (err, classes) {
                if (err)
                    res.send({success:false, message:"An error occured please contact admin", error:err});
                res.json({success:true, message:"Class added successfully."});
            });
        }
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