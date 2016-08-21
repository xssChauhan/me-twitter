"use strict";

var twitter = include("api/twitter"),
    disk = include("api/disk"),
    Promise = require("bluebird"),
    _ = require('lodash');


module.exports = new function(app) {

    //Start the cron activity
    this.start = function() {
        return disk.loadUsers(true).then((a) => {
          console.log("From strt",userData)
          return Promise.each(a,(user)=> {
            return this.getSearchData(user).then((a) => {
              return a;
            });;
          })
        })
    };

    this.run = function() {
        return this.start();
    };

    this.getSearchData = function(user) {
        console.log("From Search Data",user);
        let username = _.keys(user)[0],
            accessToken = user[username].twitter.accessToken,
            accessSecret = user[username].twitter.accessSecret;
        return twitter.search({
                q: "#meList"
            },
            accessToken,
            accessSecret
        );
    };
    this.retrieveTweets = function(status){

    };

    this.getTweet = function(status) {
        return new Promise(function(resolve,reject){

        })
    };
};
