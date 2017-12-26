'use strict';

var fs = require('fs');
var js2xmlparser = require("js2xmlparser");
var mongoose = require('mongoose'),
    Task = mongoose.model('Tasks');

exports.list_all_tasks = function(req, res) {
    Task.find({}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.create_a_task = function(req, res) {
    var new_task = new Task(req.body);
    new_task.save(function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.read_a_task = function(req, res) {
    Task.findById(req.params.taskId, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.update_a_task = function(req, res) {
    Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.delete_a_task = function(req, res) {


    Task.remove({
        _id: req.params.taskId
    }, function(err, task) {
        if (err)
            res.send(err);
        res.json({ message: 'Task successfully deleted' });
    });
};

exports.generate_xml = function(req, res) {
    var xml = js2xmlparser.parse("input", req.body);
    var fileName = './downloads/SCSIM_XML'+Date.now()+'.xml';
    fs.writeFile(fileName, xml, function(err) {
        if (err)
            throw err;
        var stat = fs.statSync(fileName);
        res.download(fileName);

    });
}