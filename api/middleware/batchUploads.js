'use strict';

let mongoose = require('mongoose'), StudentRegistration = mongoose.model('StudentRegistrations');
const fs = require('fs');
const excelToJson = require('convert-excel-to-json');

//let's export this function to show them to the world outside
module.exports = function importStudents(filePath) {
    console.log(filePath);
    const excelData = excelToJson({
        sourceFile: filePath,
        sheets: [{
            name: 'Students',
            header: {
                rows: 1
            },
            columnToKey: {
                A: 'studentId',
                B: 'subjectCode',
                C: 'status',
                D: 'dateJoined'
            }
        }]
    });

    let new_studentRegistration = new StudentRegistration();

    new_studentRegistration.collection.insertMany(excelData.Students)
        .then((res) => {
            console.log("Number of documents inserted: " + res.insertedCount);

        })
        .catch(err => {
            res.send(err);
        })

    fs.unlinkSync(filePath);
}

