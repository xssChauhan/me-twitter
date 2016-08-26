"use strict";

require("./lib/globals");

var express = require("express"),
    controllers = include("controllers"),
    app = express(),
    Promise = require("bluebird"),
    cookieParser = require("cookie-parser"),
    path = require("path"),
    disk = include("api/disk"),
    me = include("api/_meList"),
    lodash = require("lodash"),
    handlebars = require("handlebars");


app.use(cookieParser());

controllers(app);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/files", function(req, res) {
    disk.loadUsers().then((a) => {
        res.send(userData);
    });
});

app.get('/cookies', (req, res) => {
    res.send(req.cookies);
});

app.get("/users", (req, res) => {
    disk.loadUsers().then(a => {
        res.send(a);
    });
});

app.get("/test", (req, res) => {
    me.getSearchData().then(a => {
        res.send(a);
    })
});

app.get("/tpl", (req, res) => {
    disk.getTemplate("meList").then(a => {
        let tpl = handlebars.compile(a);
        let string = tpl("https:/www.twitter.com/ShikharChauhan7/status/765650042552217600");
        require("jsdom").env({
            file: "0nl.in/e/sauravtom/index.html",
            done: function(err, window) {
                var $ = require("jquery")(window);
                $("#portfolio").html("<p>wow</p>");
                //disk.writeFileAsync("0nl.in/e/sauravtom/index.html",$(window))
                
                res.send($("html").html());
            }   
        });

        // res.send(string)
    })
})

// app.get("/:user",(req,res) => {
//   console.log("Users");
//   let user = req.params.user;
//   disk.loadUser(user).then((a) => {
//     res.send(a);
//   })
// });


app.listen(process.env.PORT || 3000, function() {
    console.log("Listening on " + process.env.port);
});