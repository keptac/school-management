'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let StaffSchema = new Schema({

    staffId:{
        type: String,
        required: 'Kindly provide the staff ID',
        unique: true,
        dropDups:true
    },

    firstName: {
        type: String,
        required: 'Kindly enter the name of the staff'
    },

    surname: {
        type: String,
        required: 'Kindly enter the surname of the staff'
    },

    idNumber: {
        unique: true,
        dropDups:true,
        type: String,
        required: 'Kindly enter the ID Number of the staff'
    },

    email: {
        type: String,
        required: 'Kindly enter the email address of the staff'
    },

    password: {
        type: String,
        required: 'Kindly enter password'
    },
    userType: {
        type: String,
        required: 'Kindly enter the user Type'
    },
    dateJoined: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Staff', StaffSchema);