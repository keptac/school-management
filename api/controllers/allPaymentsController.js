'use strict';

let mongoose = require('mongoose'), Payment = mongoose.model('Payments');

exports.listPayments = function (req, res) {
    console.log('List All Payment::::');
    Payment.find({}, function (err, student) {
        if (err)
            res.send(err);
        res.json(student);
    });
};

exports.addNewPayment = function (req, res) {
    console.log('New Payment:::: '+req.body.amount +' '+req.body.studentId);
    let newPayment = new Payment(req.body);
    newPayment.save(function (err, payment) {
        if (err)
            res.send({success:false, message:"An error occured please contact admin", error:err});
        res.json({success:true, message:"Payment captured successfully."});
    });
};

exports.getpaymentByRefernce  = function (req, res) {
    Payment.find({reference:req.params.paymentReference}, function (err, student) {
        if (err)
            res.send(err);
        res.json(student);
    });
};

exports.getPaymentsByStudent = function (req, res) {
    Payment.find({studentId:req.params.studentId}, function (err, student) {
        if (err)
            res.send(err);
        res.json(student);
    });
};

