"use strict";

var twitter = include("api/twitter"),
    disk = include("api/disk"),
    Promise = require("bluebird"),
    _ = require('lodash'),
    path = require("path");

module.exports = new function(app) {

    //Start the cron activity
    this.start = function() {
        return this.getSearchData().then((data) => {
            console.log(data.statuses.length)
            return Promise.map(data.statuses, (e, i, l) => {
                console.log("Mapping Statuses")
                return this.retrieveTweets(e);
            });
        });
    };

    this.run = function() {
        return this.start();
    };

    this.getSearchData = function() {
        return twitter.search({
            q: "#meList"
        });
    };

    this.retrieveTweets = function(status) {
        return this.getTweet(status);
    };

    this.getParent = function(status) {
        return this.getUserByID(status.user.id).then(a => {
            return this.getTweet(status, a.user.twitter.accessToken, a.user.twitter.accessSecret)
        })
    };
    this.isParent = function(tweet) {
        return tweet.in_reply_to_status_id_str ? false : true;
    };

    this.getUserByID = function(userId) {
        return disk.getUser(userId);
    };

    this.makeTweetURL = function(status) {
        let screenname = status.in_reply_to_screen_name ? status.in_reply_to_screen_name : status.user.screen_name,
            id = status.in_reply_to_status_id_str ? status.in_reply_to_status_id_str : status.id_str;
        console.log(screenname,id);
        let url = path.join("https://www.twitter.com", screenname, "status", id);
        return url
    };

    this.getTweet = function(status, accessToken, accessSecret, parent) {
        let url = this.makeTweetURL(status);
        return url;
    };
};
