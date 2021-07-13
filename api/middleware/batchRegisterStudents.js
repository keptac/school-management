'use strict';

let mongoose = require('mongoose'), StudentRegister = mongoose.model('Students');

const fs = require('fs');
const excelToJson = require('convert-excel-to-json');
var count;
module.exports = function batchRegisterStudents(fileName, req, res) {
    try {
        const excelData = excelToJson({
            sourceFile: __dirname + '/../../uploads/' + fileName,
            sheets: [{
                name: 'Students',
                header: {
                    rows: 1
                },
                columnToKey: {
                    A: 'studentId',
                    B: 'name',
                    C: 'surname',
                    D: 'idNumber',
                    E: 'address',
                    F: 'guardianName',
                    G: 'relationshipToGuardian',
                    H: 'phoneNumber',
                    I: 'dateOfBirth',
                    J: 'gender',
                    K: 'dateJoined'
                }
            }]
        });

        let new_studentRegister = new StudentRegister();
        
        new_studentRegister.collection.insertMany(excelData.Students)
            .then((res) => {
                console.log("File upload success ------> "+res.insertedCount+" record inserted");
            })
            .catch(err => {
                console.log("File upload failed ------> "+err);
            })

        fs.unlinkSync(__dirname + '/../../uploads/' + fileName);
        return res.status(201).json({ success: true, messsage: "Students successfully uploaded" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": "Failed to upload file", reason: error })
    }
}

