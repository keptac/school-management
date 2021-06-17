'use strict';
module.exports = function(app) {
    var todoList = require('../controllers/todoListController');

    //Announcement Routes
    app.route('/api/esm/announcements')
        .get(todoList.list_all_tasks)
        .post(todoList.create_a_task);
    
    app.route('/api/esm/accouncements/:announcementId')
        .get(todoList.read_a_task)
        .put(todoList.update_a_task)
        .delete(todoList.delete_a_task);


    //Assignments
    app.route('/api/esm/assignments')
        .get(todoList.list_all_tasks)
        .post(todoList.create_a_task);
    
    app.route('/api/esm/assignments/:assignmentId')
        .get(todoList.read_a_task)
        .put(todoList.update_a_task)
        .delete(todoList.delete_a_task);


    //Learning Resources
    app.route('/api/esm/resources')
        .get(todoList.list_all_tasks)
        .post(todoList.create_a_task);
        
    app.route('/api/esm/resources/:resourceId')
        .get(todoList.read_a_task)
        .put(todoList.update_a_task)
        .delete(todoList.delete_a_task);


    //Student ROutes
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