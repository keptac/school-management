'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OnlineApplicationSchema = new Schema({
    fullName: {
        type: String,
        required: 'The full name is required'
    },

    dateOfBirth: {
        type: Date
    },

    idNumber: {
        unique: true,
        dropDups:true,
        type: String,
        required: 'Kindly enter the ID Number of the student'
    },

    applicationID: {
        type: String,
    },

    grade: {
        type: Number,
        required: 'Kindly enter the grade'
    },

    units: {
        type: Number,
        required: 'Kindly enter the Teacher for the subject'
    },

    resourcePath: {
        type: String,
    },

    interviwedScheduled:{
        type: Boolean,
        default:false
    },

    status: {
        type: [{
            type: String,
            enum: ['APPROVED', 'DECLINED', 'PENDING']
        }],
        default: ['PENDING']
    },

    Created_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('OnlineApplications', OnlineApplicationSchema);