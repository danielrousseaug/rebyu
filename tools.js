var csvsync = require('csvsync');
var fs = require('fs');
// read file
var csv = fs.readFileSync('userdb.csv');
var data = csvsync.parse(csv);

function readData() {
    var csv = fs.readFileSync('userdb.csv');
    var data = csvsync.parse(csv);
}

function showImg(id) {

    poster = document.getElementById("moviePoster")
    poster.style.opacity = "1";
    document.getElementById("moviePoster").src = data[id.id][3]

}

function hideImg(id) {
    poster = document.getElementById("moviePoster")
    poster.style.opacity = "0";

}

function loadMovies() {
    // innitialize elements
    var html;

    // create elements from csv 
    for (i = 1; i < data.length; i++) {
        html += "<div class=\"movieContainer\"><a target=\"_blank\"  href=\"" + data[i][5] + "\"><span id=\"" + i + "\" class=\"movieTitle\" onmouseover=\"showImg(this)\" onmouseout=\"hideImg(this)\">" + data[i][4] + "</span><sup class=\"movieRating\">" + data[i][1] + "</sup></a></div>"
    }
    // remove undefined
    html = html.substring(9)

    // load elements
    document.getElementById('movies').innerHTML = html;
}

var clicked = false;

function openAdd() {
    if (!clicked) {
        document.getElementById("ruLogo").style.opacity = "0";
        document.getElementById("addMovie").style.visibility = "visible";
        document.getElementById("addMovie").style.height = "300px";
        setTimeout(function () {
            document.getElementById("addMovie").style.opacity = "1";
        }, 100)
        document.getElementById("plusAndX").innerHTML = "x";
        clicked = true;
    } else {
        document.getElementById("ruLogo").style.opacity = "1";
        document.getElementById("addMovie").style.visibility = "hidden";
        document.getElementById("addMovie").style.opacity = "0";

        setTimeout(function () {
            document.getElementById("addMovie").style.height = "0";

        }, 100)
        document.getElementById("plusAndX").innerHTML = "+";
        clicked = false;
    }

}

var navclicked = false;

function openNav() {
    if (!navclicked) {

        document.getElementById("navBar").style.visibility = "visible";
        document.getElementById("content").style.visibility = "visible";
        document.getElementById("navBar").style.height = "100%";

        setTimeout(function () {
            document.getElementById("content").style.visibility = "visible";
            document.getElementById("content").style.opacity = "1";
            document.getElementById("plusAndX").innerHTML = "";


        }, 400);


        navclicked = true;
    } else {
        document.getElementById("navBar").style.visibility = "hidden";
        document.getElementById("content").style.visibility = "hidden";
        document.getElementById("plusAndX").innerHTML = "+";
        document.getElementById("navBar").style.height = "0";
        document.getElementById("content").style.visibility = "hidden"
        document.getElementById("content").style.opacity = "0";;
        navclicked = false;
    }

}


// scroll show and hide menu

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("header").style.top = "0";
    } else {
        if (!navclicked) {
            document.getElementById("header").style.top = "-85px";
        }
    }
    prevScrollpos = currentScrollPos;

}