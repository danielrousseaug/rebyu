const imdb = require('imdb-api')
const cli = new imdb.Client({
    apiKey: 'c99c4fb3'
});
var csvsync = require('csvsync');
var fs = require('fs');


function getInfo(titleOrId) {
    // if start with 'tt' then it is id
    if (titleOrId.substring(0, 2) == "tt") {
        const thingy = cli.get({
            'id': titleOrId
        });

        thingy.then((value) => {
            console.log(value);
        });
        // else it is just title
    } else {
        const thingy = cli.get({
            'name': titleOrId
        });

        thingy.then((value) => {
            console.log(value);
        });
    }
}

function infoToAdd(id, rating) {
    if (!rating) {
        return;
    }
    // if start with tt is id
    if (id.substring(0, 2) == "tt") {
        const thingy = cli.get({
            'id': id
        });

        thingy.then((value) => {
            addMovie(value, rating);
        });
        // else it is just title
    } else {
        const thingy = cli.get({
            'name': id
        });

        thingy.then((value) => {
            addMovie(value, rating);
        });
    }


}

function addMovie(info, rating) {
    console.log(info);
    // get day and month
    var date = new Date();
    var month = date.getMonth();
    var year = date.getFullYear();
    var day = date.getDate();

    var monthMap = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    month = monthMap[month];

    formattedDate = year + " " + month + " " + day;

    // read file
    var csv = fs.readFileSync('userdb.csv');
    var data = csvsync.parse(csv);

    // get hd image
    var n;
    var hd;
    console.log(info['poster']);
    if (info['poster'].indexOf("@@") > 0) {
        console.log("has two '@@'")
        var n = info['poster'].indexOf("@@");
        var hd = info['poster'].substring(0, n + 1) + "@._V1_.jpg";
    } else {
        console.log("has one '@'")
        var n = info['poster'].indexOf("@");
        var hd = info['poster'].substring(0, n + 1) + "._V1_.jpg";
    }


    // add info and write
    data.push([
        [info['imdbid'], rating, formattedDate, hd, info['title'], info['imdburl']]
    ]);
    for (var i = 0; i < data.length; i++) {
        if (i == 0) {
            continue;
        }
        if (info['imdbid'] == data[i][0]) {
            return;
        }
    }

    var csv = csvsync.stringify(data);
    fs.writeFileSync('userdb.csv', csv);
    location.reload()
}

function removeMovie(id) {
    // read file
    var csv = fs.readFileSync('userdb.csv');
    var data = csvsync.parse(csv);

    // remove id and write back
    console.log(data);
    data.splice(id, 1);
    console.log(data);

    var csv = csvsync.stringify(data);
    fs.writeFileSync('userdb.csv', csv);

}