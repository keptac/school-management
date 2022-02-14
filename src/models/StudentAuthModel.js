'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let StudentAuthSchema = new Schema({

    studentId:{
        type: String,
        required: 'Kindly provide the student ID',
        unique: true,
        dropDups:true
    },

    firstName: {
        type: String,
        required: 'Kindly enter the name of the student'
    },

    surname: {
        type: String,
        required: 'Kindly enter the surname of the student'
    },

    classId: {
        type: String
    },

    email: {
        type: String,
        required: 'Kindly enter the email address of the student'
    },

    password: {
        type: String,
        required: 'Kindly enter password'
    },
    passwordReset:{
        type: Boolean,
        default: true
    },

    userType: {
        type: String,
        default:"STUDENT"
    },
    
    dateJoined: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('StudentAuth', StudentAuthSchema);