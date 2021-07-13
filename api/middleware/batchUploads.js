'use strict';

let mongoose = require('mongoose'), StudentEnrolment = mongoose.model('StudentEnrolments');

const fs = require('fs');
const excelToJson = require('convert-excel-to-json');

module.exports = function importStudents(fileName) {
    const excelData = excelToJson({
        sourceFile: __dirname + '/../../uploads/' + fileName,
        sheets: [{
            name: 'Students',
            header: {
                rows: 1
            },
            columnToKey: {
                A: 'studentId',
                B: 'subjectCode',
                C: 'status',
                D: 'dateJoined',
                E: 'studentSubjectCode'
            }
        }]
    });

    let new_studentEnrolment = new StudentEnrolment();

    new_studentEnrolment.collection.insertMany(excelData.Students)
        .then((res) => {
            console.log("Number of documents inserted: " + res.insertedCount);
        })
        .catch(err => {
            res.send(err);
        })

    fs.unlinkSync(__dirname + '/../../uploads/' + fileName);
}

