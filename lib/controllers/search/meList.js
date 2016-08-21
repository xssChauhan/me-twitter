"use strict";

var twitter = include("api/twitter"),
    disk = include("api/disk"),
    me = include("api/_meList"),
    _ = require('lodash');

module.exports = function(app) {
    app.get('/meList/:user', function(req, res) {
        var u = req.params.user;
        var user;
        let accessToken, accessSecret;
        me.run().then((data)=>{
            res.send(data);
        });
    });
}.bind({});
