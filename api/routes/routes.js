'use strict';
module.exports = function(app) {
    var todoList = require('../controllers/controller');


    // todoList Routes
    app.route('/element')
        .post(todoList.create_a_task);

    app.route('/element')
        .get(todoList.list_all_tasks);

    app.route('/element/:taskId')
        .get(todoList.read_a_task);

    app.route('/generate')
        .post(todoList.generate_xml);

};