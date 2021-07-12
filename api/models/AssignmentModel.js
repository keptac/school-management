'use strict';
import { Schema as _Schema, model } from 'mongoose';
let Schema = _Schema;

let AssignmentSchema = new Schema({
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

export default model('Assignments', AssignmentSchema);