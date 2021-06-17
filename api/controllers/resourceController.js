'use strict';
var mongoose = require('mongoose'), Resource = mongoose.model('Resources'), Assignment = mongoose.model('Assignments');

//Assignments
exports.listAssignments = function(req, res) {
    Assignment.find({}, function(err, assignment) {
        if (err)
            res.send(err);
        res.json(assignment);
    });
};

exports.uploadAssignment = function(req, res) {
    var new_assignment = new Assignment(req.body);
    new_assignment.save(function(err, assignment) {
        if (err)
            res.send(err);
        res.json(assignment);
    });
};

exports.readAssignment = function(req, res) {
    Assignment.findById(req.params.assignmentId, function(err, assignment) {
        if (err)
            res.send(err);
        res.json(assignment);
    });
};

exports.updateAssignment = function(req, res) {
    Assignment.findOneAndUpdate({_id: req.params.assignmentId}, req.body, {new: true}, function(err, assignment) {
        if (err)
            res.send(err);
        res.json(assignment);
    });
};

exports.deleteAssignment = function(req, res) {
    Assignment.remove({
        _id: req.params.assignmentId
    }, function(err, assignment) {
        if (err)
            res.send(err);
        res.json({ message: 'Assignment successfully deleted' });
    });
};


//Learning Materials
exports.listResources = function(req, res) {
    Resource.find({}, function(err, resource) {
        if (err)
            res.send(err);
        res.json(resource);
    });
};

exports.uploadResource = function(req, res) {
    var new_resource = new Resource(req.body);
    new_resource.save(function(err, resource) {
        if (err)
            res.send(err);
        res.json(resource);
    });
};

exports.readResource = function(req, res) {
    Resource.findById(req.params.resourceId, function(err, resource) {
        if (err)
            res.send(err);
        res.json(resource);
    });
};

exports.updateResource = function(req, res) {
    Resource.findOneAndUpdate({_id: req.params.resourceId}, req.body, {new: true}, function(err, resource) {
        if (err)
            res.send(err);
        res.json(resource);
    });
};

exports.deleteResource = function(req, res) {
    Resource.remove({
        _id: req.params.resourceId
    }, function(err, resource) {
        if (err)
            res.send(err);
        res.json({ message: 'Resource successfully deleted' });
    });
};
