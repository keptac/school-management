'use strict';

module.exports = function (app) {

    let announcements = require('../controllers/announcementsController');
    var resources = require('../controllers/resourceController');
    var assignments = require('../controllers/assignmentsController');
    var subjects = require('../controllers/subjectController');
    var submissions = require('../controllers/submissionsController');
    var studentSubjectRegistrations = require('../controllers/studentSubjectRegistrationController');

    //Announcement Routes
    app.route('/api/esm/announcements')
        .get(announcements.list_all_announcements)
        .post(announcements.create_an_announcement);

    app.route('/api/esm/accouncements/:announcementId')
        .get(announcements.read_an_announcement)
        .put(announcements.update_an_announcement)
        .delete(announcements.delete_an_announcement);

    //Assignments
    app.route('/api/esm/teacher/assignments')
        .post(assignments.uploadAssignment);

    app.route('/api/esm/teacher/assignments/subject/:subjectCode')
        .get(assignments.listAssignmentsBySubjectCode);

    app.route('/api/esm/teacher/assignments/:assignmentId')
        .get(assignments.readAssignment)
        .put(assignments.updateAssignment)
        .delete(assignments.deleteAssignment);

    //Learning Resources
    app.route('/api/esm/teacher/resources')
        .post(resources.uploadResource);

    app.route('/api/esm/teacher/resources/subject/:subjectCode')
        .get(resources.listResourcesBySubjectCode);

    app.route('/api/esm/teacher/resources/:resourceId')
        .get(resources.readResource)
        .put(resources.updateResource)
        .delete(resources.deleteResource);

    // Students enrolments to classes
    app.route('/api/esm/student-registrations')
        .post(studentSubjectRegistrations.enrolForSubject);

    app.route('/api/esm/student-registrations/subject/:subjectCode')
        .get(studentSubjectRegistrations.listStudentRegistrationsPerSubject);

    app.route('/api/esm/student-registrations/student/:studentId')
        .get(studentSubjectRegistrations.listRegistrationsPerStudent);

    app.route('/api/esm/student-registrations/:studentRegistrationId')
        .delete(studentSubjectRegistrations.deleteStudentRegistration);


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


    //Submissions Routes
    app.route('/api/esm/submissions')
        .post(submissions.submitAssignment);

    app.route('/api/esm/submissions/subject/:subjectCode')
        .get(submissions.listSubmissionsByAssignmentId);

    app.route('/api/esm/submissions/student/:subjectCode/:studentId')
        .get(submissions.submissionsForStudent)
        .put(submissions.update_submission);

    app.route('/api/esm/submissions/:submissionId')
        .get(submissions.readSubmission)
        .put(submissions.gradeSubmission)
        .delete(submissions.deleteSubmission);
};