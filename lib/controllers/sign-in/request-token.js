"use strict";

var twitter = include("api/twitter"),
    _ = require("lodash"),
    disk = include("api/disk"),
    authenticationUrl = "https://api.twitter.com/oauth/authenticate?oauth_token=";

module.exports = function(app) {
    app.get("/request-token/:user", function(req, res) {
        let user = req.params.user;
        disk.checkUser(user).then((a) => {
            twitter.requestToken().then(function(requestToken) {
                res.cookie("user",user,{
                  expires: new Date(Date.now() + 30000)
                })
                res.send("oke")
                res.redirect( authenticationUrl + requestToken );
            }).catch(function(err) {
                res.send("twitter Error");
            });
        }).catch((err) => {
            console.log(req.cookies);
            res.send("User Not found");
        })
    })
};
