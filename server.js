var express =  require("express");
var fs = require("fs");
var bodyParser = require("body-parser");
var dateFormat = require('dateformat');

console.log("[CT] Reading test data...")
var lea = JSON.parse(fs.readFileSync('app/LEA.json', 'utf8'));

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

for (var i =0; i < lea.cards.length; i++) {
    var date = randomDate(new Date(2001, 0, 1), new Date());
    var formattedDate = dateFormat(date, "YYYY/DD/MM");
    lea.cards[i].date = formattedDate;
}
console.log("[CT] database size:",lea.cards.length);
console.log("[CT] Setting server and configuring");
var app = express();
app.use(express.static('app'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/card/:id', function (req, res) {
    console.log("[CT] get: /card");
});

app.get('/cards', function (req, res) {
    // hardcoded per page value to 10 to simplify
    var perpage = 10;
    var query = req.query.id | "*";
    var page = req.query.page | 0; // set default page to 1
    console.log("[CT] get: /cards", page);
    if(query != "*") {
        var temp = [];
        for (var i =0; i < lea.cards.length; i++) {
            if (lea.cards[i].name.search(/query/i) != -1 ||
                lea.cards[i].text.search(/query/i) != -1 ||
                lea.cards[i].flavor.search(/query/i) != -1 ||
                lea.cards[i].artist.search(/query/i) != -1) {
                temp.push(lea.cards[i]);
            }
        }

        res.send(temp.slice(page*perpage, page*perpage + perpage));
    } else {
        res.send(lea.cards.slice(page*perpage, page*perpage + perpage));
    }
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
    var id = req.query.id;
    var found = -1;

    for (var i =0; i < lea.cards.length; i++) {
        if (card.id == id) {
            found = i;
            break;
        }
    }

    if (found != -1) {
        res.send("not deleted");
    } else {
        lea.cards.splice(i,1);
        res.send("deleted");
    }
});

var server = app.listen(8888, function () {
    var port = server.address().port;

    console.log('[CT] Angular in 1 day - is listening at %s', port);
});

console.log("[CT] Server running..");