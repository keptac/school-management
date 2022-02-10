'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClassSchema = new Schema({

    classId: {
        type: String,
        required: 'Kindly enter the class ID',
        unique: true,
        dropDups: true
    },

    className: {
        type: String,
        required: 'Kindly enter the class name'
    },

    station: {
        type: String,
        required: 'Kindly enter the station'
    },

    created_At: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Classes', ClassSchema);