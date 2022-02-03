'use strict';

let mongoose = require('mongoose'), Announcements = mongoose.model('Announcements');

exports.list_all_announcements = function (req, res) {
    Announcements.find({}, function (err, announcement) {
        if (err)
            res.send(err);
        res.json(announcement);
    });
};

exports.create_an_announcement = function (req, res) {
    let new_announcement = new Announcements(req.body);
    new_announcement.save(function (err, announcement) {
        if (err)
            res.send(err);
        res.json(announcement);
    });
};

exports.listAnnouncementsByTarget = function (req, res) {
    Announcements.find({ target: req.params.target }, function (err, announcements) {
        if (err)
            res.send(err);
        res.json(announcements);
    });
};

exports.read_an_announcement = function (req, res) {
    Announcements.findById(req.params.announcementId, function (err, announcement) {
        if (err)
            res.send(err);
        res.json(announcement);
    });
};

exports.update_an_announcement = function (req, res) {
    Announcements.findOneAndUpdate({ _id: req.body.noticeId }, req.body, { new: true }, function (err, announcement) {
        if (err)
            res.send(err);
        res.json({ message: 'Announcements successfully updated' });
    });
};

exports.delete_an_announcement = function (req, res) {
    Announcements.remove({
        _id: req.params.noticeid
    }, function (err, announcement) {
        if (err)
            res.send(err);
        res.json({ message: 'Announcements successfully deleted' });
    });
};