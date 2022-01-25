'use strict';
let mongoose = require('mongoose'), Resource = mongoose.model('Resources');

const path = require('path');

const { create } = require("ipfs-http-client");
const client = create("https://ipfs.infura.io:5001/api/v0");

//Learning Materials
exports.listResourcesBySubjectCode = function (req, res) {
    console.log('Requested Resources:::: '+req.params.subjectCode);
    Resource.find({ subjectCode: req.params.subjectCode }, function (err, resource) {
        if (err)
            res.send(err);
        res.json(resource);
    });
};

exports.uploadResourceToIpfs = async function(req, res){
    try {
        req.body.ext = path.extname(req.files[0].filename);
            let new_resource = new Resource(req.body);
            new_resource.save(function (err, resource) {
                if (err)
                    res.send({ "error": "Failed to upload file", reason: err });
                console.log('\nUploading Learning Resource:::: Completed'+resource);
            });
        return res.status(201).json({success:true, message:"Resources added successfully to IPFS"})
    } catch (e) {
        console.log(e);
        return res.send({ "error": "Failed to upload file", reason: e })
    }
}

exports.uploadResource = function (req, res) {
    console.log('\nUploading Learning Resource:::: '+req.body.subjectCode);
    // var fileFolder = __dirname + '/../../uploads/'+req.body.subjectCode+'/';
    var fileFolder = req.body.subjectCode+'/';

    try{
        req.files.forEach(element => {
            req.body.ext = path.extname(element.filename);
            req.body.resourcePath = fileFolder + element.filename;
            console.log(req.body);
            let new_resource = new Resource(req.body);
            new_resource.save(function (err, resource) {
                if (err)
                    res.send({ "error": "Failed to upload file", reason: err });
                console.log('\nUploading Learning Resource:::: Completed'+resource);
            });
        });
        return res.status(201).json({success:true, message:"Resources added successfully"})
    }catch (error){
        console.log(error);
        return res.send({ "error": "Failed to upload file", reason: error })
    }

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
