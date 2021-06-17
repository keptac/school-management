const express = require('express');

var app = express(), port = process.env.PORT || 3000, mongoose = require('mongoose');

//Register Models
const task = require('./api/models/todoListModel'); 

const assignment = require('./api/models/assignmentModel');
const announcement = require('./api/models/AnnouncementsModel');
const resources = require('./api/models/ResourcesModel'); 
const student = require('./api/models/StudentModel');
const studentRegistration = require('./api/models/StudentRegistration');
const subject = require('./api/models/SubjectModel'); 
const submissions = require('./api/models/SubmissionsModel');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/ElearnSchoolManagement',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}); 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//register the route
var routes = require('./api/routes/esmRoutes');
routes(app); 

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);
console.log('School Manangement API server started on: ' + port);