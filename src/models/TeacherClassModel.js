'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeacherClassSchema = new Schema({
    className: {
        type: String,
        required: 'Kindly enter the name of the subject'
    },
    classId: {
        type: String,
        required: 'Kindly enter the name of the subject'
    },

    subjectCode: {
        type: String,
    },

    subjectName: {
        type: String,
    },

    level: {
        type: String,
        required: 'Kindly enter the grade'
    },

    teacherId: {
        type: String,
        required: 'Kindly enter the Teacher for the subject'
    },
    teacherName: {
        type: String,
        required: 'Kindly enter the Teacher for the subject'
    },

    Created_date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('TeacherClass', TeacherClassSchema);