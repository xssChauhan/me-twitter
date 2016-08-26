"use strict";

var twitter = include("api/twitter"),
    disk = include("api/disk"),
    me = include("api/_meList"),
    _ = require('lodash'),
    Promise = require("bluebird");

module.exports = function(app) {
    app.get('/meList', function(req, res) {
        var u = req.params.user;
        var user;
        let accessToken, accessSecret;
        me.run().then((d) => {
              res.send(d);
        });
    });

    app.get("/tweet",(req,res) => {
        twitter.getTweet({
          id : "767435116167696384",
        },"132851877-HRM2Riwwyygze3yLb3pzhv2ev9lE00kaUysffznY","DagqLru1x3EVwM42GNSSCzChPmyFv8GNfeV3vAHkf09NK").then((a) => {
          res.send(a);
        });
    });

    app.get("/user/:id",(req,res) => {
      me.getUserByID(req.params.id).then(a => {
        res.send(a);
      }).catch(err => {
        res.send(err)
      })
    })
}.bind({});
