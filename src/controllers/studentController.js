'use strict';

let mongoose = require('mongoose'), Student = mongoose.model('Students'), StudentAuth = mongoose.model('StudentAuth');
var batchRegisterStudents = require('../middleware/batchRegisterStudents');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.listStudents = function (req, res) {
    Student.find({}, function (err, student) {
        if (err)
            res.send(err);
        res.json(student);
    });
};

exports.registerStudent = function (req, res) {
    console.log('Student New Registration :::: '+req.body.idNumber);
    let new_student = new Student(req.body);
    new_student.save(function (err, student) {
        if (err)
            res.send({success:false, message:"An error occured please contact admin", error:err});
        res.json({success:true, message:"Student Register successfully."});
    });
};


exports.batchStudentsRegister= function (req, res) {
    batchRegisterStudents(req.file.filename,req, res );
}

//Online Application
exports.onlineApplication = function (req, res) {
    let application = new Student(req.body);
    application.save(function (err, student) {
        if (err)
            res.send(err);
        res.json(student);
    });
};

exports.readStudent = function (req, res) {
    Student.find({studentId:req.params.studentId}, function (err, student) {
        if (err)
            res.send(err);
        res.json(student);
    });
};

// For reports get all students in a class
exports.listStudentsPerClass = function (req, res) {
    Student.find({ classId: req.params.classId }, function (err, students) {
        if (err)
            res.send(err);
        res.json(students);
    });
};


exports.studentAuthentication = async function (req, res) {
    console.log('Authentication:::: '+req.body.email);
    try {
        const { email, password } = req.body;
        const user = await StudentAuth.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            console.log("User logged in "+ email);

            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            const userBody = {
                email:user.email,
                name: user.firstName + ' ' + user.surname,
                userType: user.userType,
                studentId: user.studentId,
                classId: user.classId,
                token: token
            }
            res.status(201).json({success:true, message:'Authentication successful', user:userBody})
        }else{
            res.json({success:false, message:'Invalid email or password. ', error:"Invalid Email or password"})
        }
    } catch (err) {
        console.log(err);
        res.send({success:false,message:"Snap, something happened. Please contact the Admin or your helpdesk.", error:error});
    }
};

exports.registerStudentAuth = async function (req, res) {
    console.log('Student Authentication Registration:::: '+req.body.email);
    try {
        const {  email, password } = req.body;
        const oldUser = await StudentAuth.findOne({email});
    
        if (oldUser) {
            return res.status(409).send({success:false, message:"User Already Exist. Please Login"});
        }else{
            var encryptedPassword = await bcrypt.hash(password, 10);
            req.body.password = encryptedPassword;
    
            var newStudent = new StudentAuth(req.body);
            newStudent.save(function (err, staff) {
                if (err){
                    console.log(err);
                    res.status(400).send({success:false,message:"Registration failed. Please contact the Admin or your helpdesk.", error:error});
                }else{
                    res.json({success:true, message:"Account has been created successfully. Please login to activate account"});
                }
            });
        }
    } catch (error) {
        console.log("Snap Error in registration "+ error);
        res.status(400).send({success:false,message:"Snap, something happened. Please contact the Admin or your helpdesk.", error:error});
    }

};
