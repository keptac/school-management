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
    try {
        console.log('Student New Registration :::: '+req.body.idNumber);
        console.log(req.body);
        let new_student = new Student(req.body);
        new_student.save(function (err, student) {
            if (err)
                res.send({success:false, message:"A student with that ID already exists.", error:err});
            res.json({success:true, message:"Student Register successfully."});
        });
    } catch (error) {
        res.send({success:false, message:"An error occured please contact admin", error:err});
    }
};

exports.updateStudent = function (req, res) {
    try {
        console.log('Edit Student Record :::: '+req.body.studentId);
        Student.findOneAndUpdate({ studentId: req.body.studentId }, req.body, { new: true }, function (err, student) {
            if (err)
                res.send({success:false, message:"Failed to update records please try again later", error:err});
            res.json({success:true, message:"Student Record update successful."});
        });
    } catch (error) {
        res.send({success:false, message:"An error occured please contact admin.", error:err});
    }
};

exports.updateStudentClass = function (req, res) {
    try {
        console.log('Edit Student Record :::: '+req.body.studentId);
        Student.findOneAndUpdate({ studentId: req.body.studentId }, req.body, { new: true }, function (err, student) {
            if (err)
                res.send({success:false, message:"Failed to update please try again later", error:err});
            StudentAuth.findOneAndUpdate({ studentId: req.body.studentId }, req.body, { new: true }, function (err, student) {
                if (err)
                    res.send({success:false, message:"Failed to update auntentication records. Please try again later", error:err});
                res.json({success:true, message:"Student Record update successful."});
            });
        });
    } catch (error) {
        res.send({success:false, message:"An error occured please contact admin", error:err});
    }
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

exports.deleteStudent = function(req, res) {
    console.log('Deleting Student Record:::: '+req.param.email);
    Student.deleteOne({
        studentId: req.params.studentId
    }, function(err, student) {
        if (err)
            res.send(err);
        StudentAuth.deleteOne({
            studentId: req.params.studentId
        }, function(err, student) {
            if (err)
                res.send(err);
            res.json({ message: 'Student records successfully deleted' });
        });
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
                token: token,
                passwordReset: user.passwordReset
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

exports.studentPasswordReset = async function (req, res) {
    console.log('Password Reset Student :::: '+req.body.email);
    try {
        const { email, oldPassword, newPassword } = req.body;
        const user = await StudentAuth.findOne({ email });

        if (user && (await bcrypt.compare(oldPassword, user.password))) {
            const secureNewPassword =  await bcrypt.hash(newPassword, 10);
            StudentAuth.findOneAndUpdate({ studentId: user.studentId }, {password: secureNewPassword, passwordReset: false}, { new: true }, function (err, student) {
                if (err)
                    res.send({success:false, message:"Failed to update password. Please contact Adminstrator", error:err});

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
                    token: token,
                }
                res.status(201).json({success:true, message:'Password changed successfully.', user:userBody})
            });
        }else{
            res.json({success:false, message:'The Old Password entered is incorrect.', error:"Invalid Email or password"})
        }
    } catch (error) {
        console.log('Password Reset Student Failed :::: '+err);
        res.send({success:false, message:"An error occured please contact admin", error:err});
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
