"use strict";

var twitter = include("api/twitter"),
    disk = include("api/disk"),
    _ = require('lodash');


module.exports = function(app) {
    app.get("/access-token", function(req, res) {
        var token = req.query.oauth_token,
            verifier = req.query.oauth_verifier;
        twitter.accessToken(token, verifier).then(function(accessToken) {
            console.log(req.cookie);
            return twitter.verifyCredentials(accessToken);
        }).then(function(data) {
          //Add the data to the files
          disk.writeUser(req.cookies.user,"twitter",data).then((a) => {
            res.send(data);
          })
        }).catch(function(err) {
            res.status(500).send(err);
        });
    });
};
