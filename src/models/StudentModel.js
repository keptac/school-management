'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let StudentSchema = new Schema({

    name: {
        type: String,
        required: 'Kindly enter the name of the student'
    },

    surname: {
        type: String,
        required: 'Kindly enter the surname of the student'
    },
    studentId:{
        type: String,
        required: 'Kindly provide the student ID',
        unique: true,
        dropDups:true
    },

    idNumber: {
        unique: true,
        dropDups:true,
        type: String,
        required: 'Kindly enter the ID Number of the student'
    },

    address: {
        type: String,
        default:""
        //required: 'Kindly enter the address of the student'
    },
    emailAddress: {
        type: String,
        required: 'Kindly enter the email address of the student'
    },

    guardianName: {
        type: String,
        default:""
        //required: 'Kindly enter the Guardian Name'
    },
    relationshipToGuardian: {
        type: String,
        default:""
        //required: 'Kindly enter the relationship of the student to the guardian'
    },
    phoneNumber: {
        type: Number,
        required: 'Kindly enter the phonenumber'
    },
    dob: {
        type: Date
    },
    gender: {
        type: [{
            type: String,
            enum: ['MALE', 'FEMALE','']
        }],
    },
    disability: {
        type: String,
        default: 'NA'
    },
    classId: {
        type: String,
        required: 'Kindly select class of the student'
    },
    dateJoined: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Students', StudentSchema);