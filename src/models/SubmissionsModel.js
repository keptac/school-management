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

    assignmentTitle: {
        type: String,
        required: 'Kindly provide the Assignment Title'
    },

    graded: {
        type: Boolean,
        default: false
    },

    mark: {
        type: Number,
        default: 0
    },

    total: {
        type: Number,
    },

    grade: {
        type: String,
        default: 'UNGRADED'
    },

    comment: {
        type: String
    },

    ext: {
        type: String
    },

    submissionDate: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Submissions', SubmissionSchema);