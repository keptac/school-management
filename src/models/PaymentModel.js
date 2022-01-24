'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PaymentSchema = new Schema({
    term: {
        type: String,
        required: 'Term is required'
    },

    amount: {
        type: String,
        required: 'Kindly enter the amount'
    },

    narration: {
        unique: true,
        dropDups:true,
        type: String,
        required: 'Transaction narration required'
    },
    studentId:{
        type: String,
        required: 'Kindly provide the student ID',
        unique: true,
        dropDups:true
    },

    reference: {
        unique: true,
        dropDups:true,
        type: String,
        required: 'Kindly provide Payment reference'
    },
    datePaid: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Payments', PaymentSchema);