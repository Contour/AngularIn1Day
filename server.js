var express =  require("express");
var fs = require("fs");
var bodyParser = require("body-parser");

console.log("[CT] Reading test data...")
var testData = JSON.parse(fs.readFileSync('app/LEA.json', 'utf8'));

console.log("[CT] Setting server and configuring");
var app = express();
app.use(express.static('app'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/card', function (req, res) {
    console.log("[CT] get: /card");
});

app.get('/cards', function (req, res) {
    console.log("[CT] get: /cards");
});

app.post('/card', function (req, res) {
    console.log("[CT] post: /card");
});

app.delete('/card', function (req, res) {
    console.log("[CT] delete: /card");
});

app.get('/task', function(req, res) {
    console.log("[CT] task requested");
    var randomTest = Math.floor((Math.random() * testData.data.length)); // random between 0 and 1

    res.send(testData.data[randomTest]);
});

var server = app.listen(8888, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('[CT] Angular in 1 day - is listening at http://%s:%s', host, port);
});

console.log("[CT] Server running..");