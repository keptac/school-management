'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnnouncementSchema = new Schema({
    message: {
        type: String,
        required: 'Kindly enter the announcement'
    },
    date_created: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Announcements', AnnouncementSchema);