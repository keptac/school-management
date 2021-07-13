'use strict';

let mongoose = require('mongoose'), Question = mongoose.model('Question');

exports.getQuestions = function (req, res) {
    try {
        Question.find({ subjectCode: req.params.subjectCode, testTitle: req.params.testTitle }, function (err, question) {
            if (err)
                res.send(err);
            return res.status(201).json(question)
        });
    } catch (error) {
        return res.status(500).json({ "error": error })
    }
};

exports.createTest = function (req, res) {
    try {
        let new_subject = new Question(req.body);
        new_subject.save(function (err, question) {
            if (err)
                res.send(err);
            return res.status(201).json({success:true, message:"Question added"});
        });
    } catch (error) {
        return res.status(500).json({ "error": error })
    }
};

