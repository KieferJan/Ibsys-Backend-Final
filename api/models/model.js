'use strict';
 var mongoose = require('mongoose');
 var Schema = mongoose.Schema;


 var TaskSchema = new Schema({
 titel: String,
 xmlData: Object
 });

 module.exports = mongoose.model('Tasks', TaskSchema);