'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SubmissionSchema = new Schema({
    submissionId: {
        type: String,
    },

    subjectName: {
        type: String,
    },

    subjectCode: {
        type: String,
        required: 'Kindly enter the class code'
    },

    studentName: {
        type: String,
        required: 'Kindly enter the student Name'
    },

    studentId: {
        type: String,
        required: 'Kindly enter the student Id'
    },

    submissionPath: {
        type: String,
    },

    assignmentId: {
        type: String,
        required: 'Kindly provide the Assignment ID'
    },

    graded: {
        type: Boolean,
        default: false
    },

    mark: {
        type: Number,
        required: 'Kindly enter the mark'
    },
    grade: {
        type: String,
        required: 'Kindly provide the grade for the mark'
    },

    submissionDate: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Submissions', SubmissionSchema);