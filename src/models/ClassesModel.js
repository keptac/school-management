'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClassSchema = new Schema({

    classId: {
        type: String,
        required: 'Kindly enter the class ID'
    },

    className: {
        type: String,
        required: 'Kindly enter the class name'
    },

    created_At: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Classes', ClassSchema);