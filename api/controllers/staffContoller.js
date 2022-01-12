'use strict';

let mongoose = require('mongoose'), Staff = mongoose.model('Staff');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.listStaffs = function (req, res) {
    Staff.find({}, function (err, staff) {
        if (err)
            res.send(err);
        res.json(staff);
    });
};

exports.listUserByType = function (req, res) {
    Staff.find({userType: req.param.userType}, function (err, staff) {
        if (err)
            res.send(err);
        res.json(staff);
    });
};

exports.registerStaff = async function (req, res) {

    try {
        const {  email, password } = req.body;
        const oldUser = await Staff.findOne({email});
    
        if (oldUser) {
            return res.status(409).send({success:false, message:"User Already Exist. Please Login"});
        }else{
            var encryptedPassword = await bcrypt.hash(password, 10);
            req.body.password = encryptedPassword;
    
            var new_staff = new Staff(req.body);
            new_staff.save(function (err, staff) {
                if (err){
                    console.log(err);
                    res.status(400).send({success:false,message:"Registration failed. Please contact the Admin or your helpdesk.", error:error});
                }else{
                    res.json({success:true, message:"Account has been created successfully. Please login to activate account"});
                }
            });
        }
    } catch (error) {
        console("Snap Error in registration "+ error);
        res.status(400).send({success:false,message:"Snap, something happened. Please contact the Admin or your helpdesk.", error:error});
    }

};

exports.readStaff = function (req, res) {
    Staff.find({staffId:req.params.staffId}, function (err, staff) {
        if (err)
            res.send(err);
        res.json(staff);
    });
};


exports.staffAuthentication = async function (req, res) {

    try {
        const { email, password } = req.body;
        const user = await Staff.findOne({ email });

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
                staffId: user.staffId,
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



