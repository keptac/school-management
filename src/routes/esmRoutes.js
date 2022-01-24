'use strict';

module.exports = function (app) {
    var announcements = require('../controllers/announcementsController');
    var resources = require('../controllers/resourceController');
    var assignments = require('../controllers/assignmentsController');
    var subjects = require('../controllers/subjectController');
    var submissions = require('../controllers/submissionsController');
    var studentSubjectEnrolments = require('../controllers/studentSubjectEnrolmentController');
    var multiplechoice = require('../controllers/multipleChoiceController');
    var students = require('../controllers/studentController');
    var meetings = require('../controllers/meetingController');

    var payments = require('../controllers/allPaymentsController');

    var upload = require('../middleware/upload');
    var uploadFiles = require('../middleware/uploadResources');
    var teacherClasses = require('../controllers/teacherClassesController');
    var staff = require('../controllers/staffContoller');
    var classes = require('../controllers/classesController');
    var reportSubmissions = require('../controllers/ReportSubmissionController');
    var reportGeneration = require('../controllers/reportGenerationController');
    var studentMarks = require('../controllers/studentMarksController');

    const auth = require("../middleware/auth");

    //Batches|Bulk uploads
    app.post('/api/esm/batch-student-enrolment', upload, studentSubjectEnrolments.batchStudentsSubject);
    app.post('/api/esm/batch-student-registation', upload, students.batchStudentsRegister);

    //Announcement Routes
    app.route('/api/esm/announcements')
        .get(announcements.list_all_announcements)
        .post(announcements.create_an_announcement);

    app.route('/api/esm/announcements/:target')
        .get(announcements.listAnnouncementsByTarget)

    app.route('/api/esm/accouncements/:announcementId')
        .get(announcements.read_an_announcement)
        .put(announcements.update_an_announcement)
        .delete(announcements.delete_an_announcement);

    //Assignments
    app.post('/api/esm/teacher/assignments', uploadFiles, assignments.uploadAssignment);
    

    app.route('/api/esm/teacher/assignments/subject/:subjectCode')
        .get(assignments.listAssignmentsBySubjectCode);

    app.route('/api/esm/teacher/assignments/:assignmentId')
        .get(assignments.readAssignment)
        .put(assignments.updateAssignment)
        .delete(assignments.deleteAssignment);

    app.route('/api/esm/teacher/assignmentStatus/:teacherId/:assignmendId')
        .get( assignments.checkAssignmentStatus)


    //Learning Resources
    app.post('/api/esm/teacher/resources', uploadFiles, resources.uploadResource);

    app.route('/api/esm/teacher/resources/subject/:subjectCode')
        .get(resources.listResourcesBySubjectCode);

    app.route('/api/esm/teacher/resources/:resourceId')
        .get(resources.readResource)
        .put(resources.updateResource)
        .delete(resources.deleteResource);

    // Students enrolments to classes
    app.route('/api/esm/student-enrolment')
        .post(studentSubjectEnrolments.enrolForSubject);

    app.route('/api/esm/student-enrolment/subject/:subjectCode')
        .get(studentSubjectEnrolments.listStudentEnrolmentsPerSubject);

    app.route('/api/esm/student-enrolment/student/:classId')
        .get(studentSubjectEnrolments.listEnrolmentsPerStudent);
        
    app.route('/api/esm/student-enrolment/:studentEnrolmentId')
        .delete(studentSubjectEnrolments.deleteStudentEnrolment);

    //Subjects Routes
    app.route('/api/esm/subjects')
        .get(subjects.listSubjects)
        .post(subjects.createSubject);

    app.route('/api/esm/subjects/teacher/:teacherId')
        .get(subjects.listSubjectsPerTeacher);

    app.route('/api/esm/subjects/:subjectId')
        .get(subjects.readSubject)
        .put(subjects.updateSubject)
        .delete(subjects.deleteSubject);
    
    //Teacher Routes
    app.route('/api/esm/teacherClasses')
        .get( teacherClasses.listTeacherClasses)
        .post( teacherClasses.createTeacherClass);
    
    app.route('/api/esm/teacherClasses/teacher/:teacherId')
        .get( teacherClasses.listTeacherClassPerTeacher);
    
    app.route('/api/esm/teacherClasses/:classId')
        .get( teacherClasses.readTeacherClass)
        .delete( teacherClasses.deleteTeacherClass);

    //Submissions Routes
    app.post('/api/esm/submissions/subject', uploadFiles, submissions.submitAssignment);

    app.route('/api/esm/submissions/:assignmentId')
        .get(submissions.listSubmissionsByAssignmentId);

    app.route('/api/esm/submissions/student/:subjectCode/:studentId')
        .get(submissions.submissionsForStudent)
        .put(submissions.update_submission);

    app.route('/api/esm/submissions/:submissionId')
        .get(submissions.readSubmission)
        .put(submissions.gradeSubmission)
        .delete(submissions.deleteSubmission);

    //Multiple Choice Questions
    app.route('/api/esm/multiplechoice')
        .post(multiplechoice.createTest)
        .get(multiplechoice.getAllTests);
    
    app.route('/api/esm/multiplechoice/:subjectCode/')
        .get(multiplechoice.getQuestionsBySubject);

    app.route('/api/esm/multiplechoice/:subjectCode/:testTitle')
        .get(multiplechoice.getQuestions);

    //Student Routes
    app.route('/api/esm/student/authenticate')
        .post(students.studentAuthentication);

    app.route('/api/esm/student/authenticateReg')
        .post(students.registerStudentAuth);

    app.route('/api/esm/students')
        .get(students.listStudents)
        .post(students.registerStudent);

    app.route('/api/esm/students/:studentId')
        .get(students.readStudent)
        
    app.route('/api/esm/students/class/:classId')
        .get( students.listStudentsPerClass)    
    
    //Student Marks Routes
    app.route('/api/esm/studentMarks')
        .post( studentMarks.submitMarks);

    app.route('/api/esm/studentMarks/class/:classId')
        .get( studentMarks.listStudentMarksByClassId);

    app.route('/api/esm/studentMarks/student/:studentId')
        .get( studentMarks.studentMarksForStudent);

    app.route('/api/esm/studentMarks/:submissionId')
        .delete( studentMarks.deleteStudentMarks);

    //Progress Report Generation
    app.route('/api/esm/studentMarks/reportgeneration')
        .get( reportGeneration.generateReports);
    
    app.route('/api/esm/studentMarks/reportgeneration:studentId')
        .get( reportGeneration.generateSingleChildReport);

    // Classes Routes
    app.route('/api/esm/class')
        .get( classes.listClasses)
        .post( classes.addClass);

    app.route('/api/esm/class/:classId')
        .delete( classes.deleteClass)

    // Subjects Routes
    app.route('/api/esm/subjects')
        .get( subjects.listSubjects)
        .post( subjects.createSubject);

    app.route('/api/esm/students/:subjectCode')
        .get( subjects.deleteSubject)

    // Report Submission Routes
    app.route('/api/esm/reportsubmissions')
        .get( reportSubmissions.listAllReportSubmissions)
        .post( reportSubmissions.addReportSubmission);
    
    app.route('/api/esm/reportsubmissions/teacherSubmissionStatus/:teacherId/:subjectCode')
        .get( reportSubmissions.checkSubmissionStatus)

    app.route('/api/esm/students/:classId')
        .get( reportSubmissions.deleteReportSubmission)

    // Staff Routes
    app.route('/api/esm/staff')
        .get( staff.listStaffs)
        .post(staff.registerStaff);

    app.route('/api/esm/staffType/:userType')
        .get( staff.listStaffs)
    
    app.route('/api/esm/staff/:staffId')
        .get( staff.readStaff)

    app.route('/api/esm/staff/authenticate')
        .post(staff.staffAuthentication);

    //Payments
    app.route('/api/esm/payments')
        .get(payments.listPayments)
        .post(payments.addNewPayment);

    app.route('/api/esm/payments/student/:studentId')
        .get(payments.getPaymentsByStudent)
        
    app.route('/api/esm/payments/:paymentReference')
        .get( payments.getpaymentByRefernce)   

      //Meetings
    app.route('/api/esm/meetings')
        .post(meetings.createMeeting);

    app.route('/api/esm/meetings/teacher/:teacherId')
        .get(meetings.listMeetingsPerTeacher);
    
    app.route('/api/esm/meetings/class/:classId')
        .get(meetings.listMeetingsByClass);
};