'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ReportSubmissionSchema = new Schema({
    className: {
        type: String,
        required: 'Kindly enter the name of the class'
    },

    subject: {
        type: String,
        required: 'Kindly enter the subjectCode'
    },

    classId: {
        type: String,
    },

    status: {
        type: String,
    },

    teacherName: {
        type: String,
        required: 'Teacher Id required'
    },

    teacherId: {
        type: String,
        required: 'Teacher Id required'
    },

    reportingPeriod: {
        type: Date,
        default: Date.now
    },

});

module.exports = mongoose.model('ReportSubmissions', ReportSubmissionSchema);