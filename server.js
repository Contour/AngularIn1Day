var express =  require("express");
var fs = require("fs");
var bodyParser = require("body-parser");

console.log("[CT] Reading test data...")
var lea = JSON.parse(fs.readFileSync('app/LEA.json', 'utf8'));

console.log("[CT] Setting server and configuring");
var app = express();
app.use(express.static('app'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/card/:id', function (req, res) {
    console.log("[CT] get: /card");
});

app.get('/cards/:page', function (req, res) {
    // hardcoded per page value to 10 to simplify
    var perpage = 10;
    var page = req.params.page | 0; // set default page to 1
    console.log("[CT] get: /cards", page);

    console.log("[CT] total number:",lea.cards.length);

    res.send(lea.cards.slice(page*perpage, page*perpage + perpage));
});

app.post('/card', function (req, res) {
    console.log("[CT] post: /card");
    var card = req.body.card;
    var found = false;

    for (var i =0; i < lea.cards.length; i++) {
        if (card.id == card.id) {
            lea.cards[i] = card;
            found = true;
            res.send("updated");
            break;
        }
    }

    if (!found) {
        lea.cards.push(card);
        res.send("created");
    }
});

app.delete('/card:id', function (req, res) {
    console.log("[CT] delete: /card");
});

app.get('/task', function(req, res) {
    console.log("[CT] task requested");
    var randomTest = Math.floor((Math.random() * lea.data.length)); // random between 0 and 1

    res.send(lea.data[randomTest]);
});

var server = app.listen(8888, function () {
    var port = server.address().port;

    console.log('[CT] Angular in 1 day - is listening at %s', port);
});

console.log("[CT] Server running..");