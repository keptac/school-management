'use strict';

module.exports = function (app) {
    var announcements = require('../controllers/announcementsController');
    var classes = require('../controllers/classesController');
    var subjects = require('../controllers/subjectsController');
    var submissions = require('../controllers/ReportSubmissionController');
    var teacherClasses = require('../controllers/teacherClassesController');
    var studentMarks = require('../controllers/studentMarksController');
    var reportGeneration = require('../controllers/reportGenerationController');
    var students = require('../controllers/studentController');
    var staff = require('../controllers/staffContoller');
    var upload = require('../middleware/upload');
    const auth = require("../middleware/auth");

    //Batches|Bulk uploads
    app.post('/api/esm/batch-student-registation', upload, students.batchStudentsRegister);

    app.route('/api/westminster/studentMarks/reportgeneration')
        .get(auth, reportGeneration.generateReports);
    
    // app.route('/api/westminster/studentMarks/reportgeneration/:path')
    //     .get(reportGeneration.generateReportsToFolder);

    //Announcement Routes
    app.route('/api/westminster/announcements')
        .get(auth, announcements.list_all_announcements)
        .post(auth, announcements.create_an_announcement);

    app.route('/api/westminster/announcements/:announcementId')
        .get(auth, announcements.read_an_announcement)
        .put(auth, announcements.update_an_announcement)
        .delete(auth, announcements.delete_an_announcement);

    //Student Marks Routes
    app.route('/api/westminster/studentMarks')
        .post(auth, studentMarks.submitMarks);

    app.route('/api/westminster/studentMarks/class/:classId')
        .get(auth, studentMarks.listStudentMarksByClassId);

    app.route('/api/westminster/studentMarks/student/:studentId')
        .get(auth, studentMarks.studentMarksForStudent);

    app.route('/api/westminster/studentMarks/:submissionId')
        .delete(auth, studentMarks.deleteStudentMarks);

    //Subjects Routes
    app.route('/api/westminster/teacherClasses')
        .get(auth, teacherClasses.listTeacherClasses)
        .post(auth, teacherClasses.createTeacherClass);

    app.route('/api/westminster/teacherClasses/teacher/:teacherId')
        .get(auth, teacherClasses.listTeacherClassPerTeacher);

    app.route('/api/westminster/teacherClasses/:classId')
        .get(auth, teacherClasses.readTeacherClass)
        .delete(auth, teacherClasses.deleteTeacherClass);

    // Student Routes
    app.route('/api/westminster/students')
        .get(auth, auth, students.listStudents)
        .post(students.registerStudent);

    app.route('/api/westminster/students/:studentId')
        .get(auth, students.readStudent)
    
    app.route('/api/westminster/students/class/:classId')
        .get(auth, students.listStudentsPerClass)
    
    // Classes Routes
    app.route('/api/westminster/class')
        .get(auth, classes.listClasses)
        .post(auth, classes.addClass);

    app.route('/api/westminster/class/:classId')
        .delete(auth, classes.deleteClass)

    // Subjects Routes
    app.route('/api/westminster/subjects')
        .get(auth, subjects.listAllSubjects)
        .post(auth, subjects.addSubject);

    app.route('/api/westminster/students/:subjectCode')
        .get(auth, subjects.deleteSubject)

    // Report Submission Routes
    app.route('/api/westminster/reportsubmissions')
        .get(auth, submissions.listAllReportSubmissions)
        .post(auth, submissions.addReportSubmission);
    
    app.route('/api/westminster/reportsubmissions/teacherSubmissionStatus/:teacherId/:subjectCode')
        .get(auth, submissions.checkSubmissionStatus)

    app.route('/api/westminster/students/:classId')
        .get(auth, submissions.deleteReportSubmission)

    // Staff Routes
    app.route('/api/westminster/staff')
        .get(auth, staff.listStaffs)
        .post(staff.registerStaff);

    app.route('/api/westminster/staffType/:userType')
        .get(auth, staff.listUserByType)
    
    app.route('/api/westminster/staff/:staffId')
        .get(auth, staff.readStaff)

    app.route('/api/westminster/staff/authenticate')
        .post(staff.staffAuthentication);

};
