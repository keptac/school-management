'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter the name of the student'
    },
    surname: {
        type: String,
        required: 'Kindly enter the surname of the student'
    },
    idNumber: {
        type: String,
        required: 'Kindly enter the ID Number of the student'
    },
    address: {
        type: String,
        required: 'Kindly enter the address of the student'
    },
    guardianName: {
        type: String,
        required: 'Kindly enter the Guardian Name'
    },
    relationshipToGuardian: {
        type: String,
        required: 'Kindly enter the relationship of the student to the guardian'
    },
    phoneNumber: {
        type: Number,
        required: 'Kindly enter the phonenumber'
    },
    dateOfBirth: {
        type: Date
    },
    gender: {
        type: [{
            type: String,
            enum: ['male', 'female']
        }],
    },
    dateJoined: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Students', StudentSchema);