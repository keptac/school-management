'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResourceSchema = new Schema({
    resourceName: {
        type: String,
        required: 'Kindly enter the name of the resource'
    },

    classCode: {
        type: String,
        required: 'Kindly enter the classCode'
    },

    topicName: {
        type: String,
    },

    resourcePath: {
        type: String,
    },

    teacherId: {
        type: String,
        required: 'Teacher Id required'
    },

    uploadedOn: {
        type: Date,
        default: Date.now
    },

});

module.exports = mongoose.model('Resources', ResourceSchema);