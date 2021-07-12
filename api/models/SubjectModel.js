'use strict';
import { Schema as _Schema, model } from 'mongoose';
let Schema = _Schema;

let SubjectSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter the name of the subject'
    },

    subjectCode: {
        type: String,
    },

    grade: {
        type: Number,
        required: 'Kindly enter the grade'
    },

    teacherId: {
        type: String,
        required: 'Kindly enter the Teacher for the subject'
    },

    Created_date: {
        type: Date,
        default: Date.now
    },

    status: {
        type: [{
            type: String,
            enum: ['ACTIVE', 'DISABLED']
        }],
        default: ['ACTIVE']
    }
});

export default model('Subjects', SubjectSchema);