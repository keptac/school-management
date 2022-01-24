'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SubjectSchema = new Schema({
    subjectName: {
        type: String,
        required: 'Kindly enter the name of the subject'
    },

    subjectCode: {
        type: String,
    },

    level: {
        type: String,
        required: 'Kindly enter the level'
    },

    created_At: {
        type: Date,
        default: Date.now
    },

    status: {
        type: [{
            type: String,
            enum: ['ACTIVE', 'DISABLED']
        }],
        default: ['ACTIVE']
    }

});

module.exports = mongoose.model('Subjects', SubjectSchema);