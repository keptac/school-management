'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AssignmentSchema = new Schema({
    assignmentTitle: {
        type: String,
        required: 'Kindly enter the Title of the assignment'
    },

    subjectCode: {
        type: String,
        required: 'Kindly enter the subjectCode'
    },

    dueDate: {
        type: Date,
        required:'Please enter the assignment Due date'
    },

    totalMarks: {
        type: Number,
        required: 'Enter the total possible marks for the assignment'
    },

    category: {
        type: String,
        required: 'Enter the assignment category'
    },

    assignmentPath: {
        type: String,
    },

    uploadedOn: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Assignments', AssignmentSchema);