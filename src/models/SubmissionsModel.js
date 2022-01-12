'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SubmissionSchema = new Schema({

    subjectCode: {
        type: String,
        required: 'Kindly enter the class code'
    },

    studentId: {
        type: String,
        required: 'Kindly enter the class code'
    },

    assignmentId: {
        type: String,
        required: 'Kindly provide the Assignment ID'
    },

    graded: {
        type: Boolean,
        default: false
    },

    grade: {
        type: Number,
        required: 'Kindly enter the grade'
    },

    submissionDate: {
        type: Date
    },
});

module.exports = mongoose.model('Submissions', SubmissionSchema);