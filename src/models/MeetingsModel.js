'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let MeetingSchema = new Schema({
    classId: {
        type: String,
        required: 'Kindly enter the meeting'
    },

    className: {
        type: String,
    },

    subjectCode: {
        type: String,
        required: 'Subject Code is required'
    },

    subjectName: {
        type: String,
    },

    teacherId: {
        type: String,
        required: 'Kindly enter the teacherId'
    },

    meetingDate: {
        type: String,
        required: 'Kindly enter the meeting Date'
    },

    teacherName:{
        type: String,
        required: 'Teacher Name Required'
    },

    meetingId: {
        type: String,
        required: 'Kindly enter the meeting ID'
    },
    meetingLink: {
        type: String,
    },

    updatedAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Meetings', MeetingSchema);