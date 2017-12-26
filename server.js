var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Task = require('./api/models/model'), //created model loading here
    xml2js = require('xml2js'),
    fs = require('fs'),
    bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/ibsysdb');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '50mb'}));


var routes = require('./api/routes/routes'); //importing route
routes(app); //register the route

///FILE UPLOAD
String.prototype.replaceAll = function(target, replacement) {
    return this.split(target).join(replacement);
};

const multer = require('multer');
var fileName = 'xmlUpload'+Date.now()+'.xml';
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, fileName);
    }
})

var upload = multer({ storage: storage });

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// It's very crucial that the file name matches the name attribute in your html
app.post('/upload', upload.single('xml-file'), (req, res) => {
    var theTask = mongoose.model('Tasks');
var parser = new xml2js.Parser();
fs.readFile(__dirname + '/uploads/'+fileName, function(err, data) {
    parser.parseString(data, function (err, result) {
        console.dir(result);
        console.log('Done');
        //Restructure the JSON
        var jsonString = JSON.stringify(result);
        //var parsedJson = JSON.parse(jsonString);
        var stringWODollar = jsonString.replaceAll('$', 'dollardollar');
        var parsedJson = JSON.parse(stringWODollar);

        var new_task = new theTask();
        new_task.titel = 'Upload'+ Date.now();
        new_task.xmlData = parsedJson;
        new_task.save(function(err, task) {
            if (err) {
                res.send(err);
                console.log(err);
            }

            res.json(task);
        });
    });
});
});



app.listen(port);


console.log('todo list RESTful API server started on: ' + port);