'use strict';
module.exports = function(app) {
    var todoList = require('../controllers/todoListController');
    var announcements = require('../controllers/announcementsController');
    var resources = require('../controllers/resourceController');

    //Announcement Routes
    app.route('/api/esm/announcements')
        .get(announcements.list_all_announcements)
        .post(announcements.create_an_announcement);
    
    app.route('/api/esm/accouncements/:announcementId')
        .get(announcements.read_an_announcement)
        .put(announcements.update_an_announcement)
        .delete(announcements.delete_an_announcement);


    //Assignments
    app.route('/api/esm/assignments')
        .get(resources.listAssignments)
        .post(resources.uploadAssignment);
    
    app.route('/api/esm/assignments/:assignmentId')
        .get(resources.readAssignment)
        .put(resources.updateAssignment)
        .delete(resources.deleteAssignment);


    //Learning Resources
    app.route('/api/esm/resources')
        .get(resources.listResources)
        .post(resources.uploadResource);
        
    app.route('/api/esm/resources/:resourceId')
        .get(resources.readResource)
        .put(resources.updateResource)
        .delete(resources.deleteResource);


    //Student Routes
    app.route('/api/esm/students')
        .get(todoList.list_all_tasks)
        .post(todoList.create_a_task);
    
    app.route('/api/esm/students/:studentId')
        .get(todoList.read_a_task)
        .put(todoList.update_a_task)
        .delete(todoList.delete_a_task);


    // Students registrations tp classes
    app.route('/api/esm/student-registrations')
        .get(todoList.list_all_tasks)
        .post(todoList.create_a_task);

    app.route('/api/esm/student-registrations/:recordId')
        .get(todoList.read_a_task)
        .put(todoList.update_a_task)
        .delete(todoList.delete_a_task);


    //Subjects Routes
    app.route('/api/esm/subjects')
        .get(todoList.list_all_tasks)
        .post(todoList.create_a_task);
    
    app.route('/api/esm/subjects/:subjectCode')
        .get(todoList.read_a_task)
        .put(todoList.update_a_task)
        .delete(todoList.delete_a_task);


    //Submissions Routes
    app.route('/api/esm/submissions')
        .get(todoList.list_all_tasks)
        .post(todoList.create_a_task);
    
    app.route('/api/esm/submissions/:submissionId')
        .get(todoList.read_a_task)
        .put(todoList.update_a_task)
        .delete(todoList.delete_a_task);
};