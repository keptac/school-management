'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentMarksSchema = new Schema({

    firstName: {
        type: String,
        required: 'Kindly enter the student Name'
    },
    surname: {
        type: String,
        required: 'Kindly enter the student surname'
    },
    studentId: {
        type: String,
        required: 'Kindly enter the studentId'
    },
    avatarUrl: {
        type: String,
        default: '/static/images/avatars/avatar_3.png'
    },
    subjectCode: {
        type: String,
        required: 'Kindly enter the subject code'
    },
    subject: {
        type: String,
        required: 'Kindly enter the subject Name'
    },
    classId: {
        type: String,
        required: 'Kindly enter the class ID'
    },
    mark: {
        type: Number,
        required: 'Kindly enter the grade'
    },
    grade: {
        type: String,
        required: 'Kindly provide the grade for the mark'
    },
    comment: {
        type: String,
        required: 'Kindly provide the comments'
    },
    createdAt: {
        type: Date
    },
});

module.exports = mongoose.model('StudentMarks', StudentMarksSchema);