'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let StudentEnrolmentSchema = new Schema({

    studentId: {
        type: String,
       
        required: 'Kindly enter the name of the Student ID'
    },

    subjectCode: {
        type: String,
        required: 'Kindly enter Subject Code'
    },

    studentSubjectCode:{
        type: String,
        unique : true, 
        dropDups: true,
        required : true
    },

    status: {
        type: [{
            type: String,
            enum: ['Enrolled', 'Pending', 'Defered']
        }],
        default: ['Enrolled']
    },
    dateJoined: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('StudentEnrolments', StudentEnrolmentSchema);