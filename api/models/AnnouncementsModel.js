'use strict';
import { Schema as _Schema, model } from 'mongoose';
let Schema = _Schema;

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

export default model('Announcements', AnnouncementSchema);