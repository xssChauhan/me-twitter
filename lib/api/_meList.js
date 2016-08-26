"use strict";

var twitter = include("api/twitter"),
    disk = include("api/disk"),
    Promise = require("bluebird"),
    lodash = require('lodash'),
    path = require("path");

module.exports = new function(app) {

    //Start the cron activity
    this.start = function() {

        return disk.loadUsers().map(user => {
            let accessToken = user.twitter.accessToken,
                accessSecret = user.twitter.accessSecret,
                user_id = user.twitter.user.id_str;
            return twitter.timeLine({
                    user_id: user_id
                },
                accessToken,
                accessSecret).then(a => {
                //Load the tweets with #meList
                return lodash.filter(a, o => {
                    let possibles = lodash.filter(o.entities.hashtags, {
                        "text": "meList"
                    });
                    return possibles.length > 0
                });
            }).map(a => {
                return this.getTweet(a);
            }).then(a => {
                let data = {
                    user: user.username,
                    tweets: lodash.uniq(a)
                };
                return disk.writeTweets(data)
            })
        });

        return this.getSearchData().then((data) => {
            return Promise.map(data.statuses, (e, i, l) => {
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

    this.makeTweetURL = function(status) {
        let screenname = status.in_reply_to_screen_name ? status.in_reply_to_screen_name : status.user.screen_name,
            id = status.in_reply_to_status_id_str ? status.in_reply_to_status_id_str : status.id_str;
        console.log(screenname, id);
        let url = path.join("https://www.twitter.com", screenname, "status", id);
        return url
    };

    this.getTweet = function(status, accessToken, accessSecret, parent) {
        let url = this.makeTweetURL(status);
        return url;
    };
};