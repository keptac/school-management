'use strict';
import { Schema as _Schema, model } from 'mongoose';
let Schema = _Schema;

let SubmissionSchema = new Schema({

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

export default model('Submissions', SubmissionSchema);