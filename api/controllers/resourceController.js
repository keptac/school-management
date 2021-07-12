'use strict';
let mongoose = require('mongoose'), Resource = mongoose.model('Resources');

//Learning Materials
exports.listResourcesBySubjectCode = function (req, res) {
    Resource.find({ subjectCode: req.body.subjectCode }, function (err, resource) {
        if (err)
            res.send(err);
        res.json(resource);
    });
};

exports.uploadResource = function (req, res) {
    let new_resource = new Resource(req.body);
    new_resource.save(function (err, resource) {
        if (err)
            res.send(err);
        res.json(resource);
    });
};

exports.readResource = function (req, res) {
    Resource.findById(req.params.resourceId, function (err, resource) {
        if (err)
            res.send(err);
        res.json(resource);
    });
};

exports.updateResource = function (req, res) {
    Resource.findOneAndUpdate({ _id: req.params.resourceId }, req.body, { new: true }, function (err, resource) {
        if (err)
            res.send(err);
        res.json(resource);
    });
};

exports.deleteResource = function (req, res) {
    Resource.remove({
        _id: req.params.resourceId
    }, function (err, resource) {
        if (err)
            res.send(err);
        res.json({ message: 'Resource successfully deleted' });
    });
};
