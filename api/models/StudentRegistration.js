'use strict';
import { Schema as _Schema, model } from 'mongoose';
let Schema = _Schema;

let StudentRegistrationSchema = new Schema({
    studentId: {
        type: String,
        required: 'Kindly enter the name of the task'
    },

    subjectCode: {
        type: String,
        required: 'Kindly enter Subject Code'
    },

    dateJoined: {
        type: Date,
        default: Date.now
    },

    status: {
        type: [{
            type: String,
            enum: ['Enrolled', 'Pending', 'Defered']
        }],
        default: ['Enrolled']
    }
});

export default model('StudentRegistrations', StudentRegistrationSchema);