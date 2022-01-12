'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AnnouncementSchema = new Schema({
    noticeTitle: {
        type: String,
        required: 'Kindly enter the announcement'
    },
    noticeBody: {
        type: String,
        required: 'Kindly enter the announcement'
    },
    imageUrl: {
        type: String,
        default: '/static/images/resources/westminster.png',
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Announcements', AnnouncementSchema);