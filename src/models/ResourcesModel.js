'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ResourceSchema = new Schema({
    resourceName: {
        type: String,
        required: 'Kindly enter the name of the resource'
    },

    subjectCode: {
        type: String,
        required: 'Kindly enter the subjectCode'
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