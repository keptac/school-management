'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AnnouncementSchema = new Schema({
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