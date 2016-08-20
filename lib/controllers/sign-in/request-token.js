"use strict";

var twitter = include("api/twitter"),
    _ = require("lodash"),
    disk = include("api/disk");
var authenticationUrl = "https://api.twitter.com/oauth/authenticate?oauth_token=";
module.exports = function(app) {
    app.get("/request-token/:user", function(req, res) {
        let user = req.params.user;
        disk.loadUser(user).then((a) => {
            twitter.requestToken().then(function(requestToken, name) {
                res.cookie("user",user,{
                  expires: new Date(Date.now() + 3000000)
                })
                res.redirect( authenticationUrl + requestToken );
            }).catch(function(err) {
                res.send("twitter Error");
            });
        }).catch((err) => {
            console.log(req.cookies);
            res.send("User Not found");
        })
    })
}
