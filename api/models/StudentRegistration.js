'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentRegistrationSchema = new Schema({
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

module.exports = mongoose.model('StudentRegistrations', StudentRegistrationSchema);