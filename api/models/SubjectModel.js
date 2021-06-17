'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SubjectSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter the name of the subject'
    },

    subjectCode: {
        type: String,
    },

    grade: {
        type: Number,
        required: 'Kindly enter the grade'
    },

    teacherId: {
        type: String,
        required: 'Kindly enter the Teacher for the subject'
    },

    Created_date: {
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