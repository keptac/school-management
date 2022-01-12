const express = require('express');
require('dotenv').config();

var app = express(), port = process.env.PORT, mongoose = require('mongoose');

//Register Models
const announcement = require('./src/models/AnnouncementsModel');
const resources = require('./src/models/ResourcesModel'); 
const assignment = require('./src/models/AssignmentModel');
const student = require('./src/models/StudentModel');
const studentEnrolment = require('./src/models/StudentEnrolment');
const subject = require('./src/models/SubjectModel'); 
const submissions = require('./src/models/SubmissionsModel');
const multiplchoice = require('./src/models/MultipleChoiceModel');
const onlineApplicaiton = require('./src/models/OnlineApplicationModel');
const classes = require('./src/models/ClassesModel');
const reportSubmissions = require('./src/models/ReportSubmissionsModel'); 
const staff = require('./src/models/StaffModel');
const studentMarks = require('./src/models/StudentMarksModel'); 
const teacherClasses = require('./src/models/TeacherClassModel');
const payments = require('./src/models/PaymentModel');

const multer = require('multer');
global.__basedir = __dirname;

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URL_DEV,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}); 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));
app.use('/uploads', express.static('uploads'));
app.use('/public', express.static('public'));
app.use(allowCrossDomain);

//register the route
var routes = require('./src/routes/esmRoutes');
routes(app); 

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);
console.log('School Manangement API server started on: ' + port);
