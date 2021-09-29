const express = require('express');
require('dotenv').config();

var app = express(), port = process.env.PORT, mongoose = require('mongoose');

//Register Models
const assignment = require('./api/models/assignmentModel');
const announcement = require('./api/models/AnnouncementsModel');
const resources = require('./api/models/ResourcesModel'); 
const student = require('./api/models/StudentModel');
const studentEnrolment = require('./api/models/StudentEnrolment');
const subject = require('./api/models/SubjectModel'); 
const submissions = require('./api/models/SubmissionsModel');
const multiplchoice = require('./api/models/MultipleChoiceModel');
const onlineApplicaiton = require('./api/models/OnlineApplicationModel');
const multer = require('multer');
global.__basedir = __dirname;

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}); 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));
app.use('/uploads', express.static('uploads'));

//register the route
var routes = require('./api/routes/esmRoutes');
routes(app); 

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);
console.log('School Manangement API server started on: ' + port);