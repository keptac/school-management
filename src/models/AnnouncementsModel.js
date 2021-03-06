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
    target: {
        type: String,
        default: 'ALL',
    },
    imageUrl: {
        type: String,
        default: '/static/images/resources/mtgs.png',
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Announcements', AnnouncementSchema);