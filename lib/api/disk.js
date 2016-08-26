"use strict";

var fs = require("fs"),
    Promise = require("bluebird"),
    path = require("path"),
    lodash = require("lodash"),
    handlebars = require("handlebars");

var readFileAsync = Promise.promisify(fs.readFile),
    appendFileAsync = Promise.promisify(fs.appendFile),
    readDirAsync = Promise.promisify(fs.readdir),
    statAsync = Promise.promisify(fs.stat),
    writeFileAsync = Promise.promisify(fs.writeFile),
    accessSync = Promise.promisify(fs.access);

var config = {
    dirname: "0nl.in/e/",
    filenames: "user.json",
    templateDir: "lib/templates",
    default : "index.html"
};

module.exports = new function() {
    this.lodashfs = fs;

    this.writeFileAsync = writeFileAsync;
    this.checkUser = function(user) {
        return accessSync(path.join(config.dirname + user));
    };
    //Load the users in the application
    this.loadUser = function(user, flag) {
        let data = lodash.set({}, "key", user);
        return readFileAsync(path.join(config.dirname, user, "/", config.filenames), "utf8").then(function(data) {
            let temp = JSON.parse(data),
                d = {};
            lodash.set(d, "twitter_id", temp.twitter.user.id)
            lodash.set(d, "username", this.key)
            userData.push(lodash.set(d, "user", temp));
            if (flag) {
                return lodash.set({}, this.key, temp)
            } else {
                return lodash.set(temp, "username", this.key)
            }
        }.bind(data));
    };

    this.loadUsers = function(flag) {
        console.log("Calling loadUSers", flag)
        flag = flag ? flag : false;
        return this._getDirectories(config.dirname).map((a) => {
            return this.loadUser(a, flag)
        });
    };

    this._getDirectories = function(srcpath) {
        return readDirAsync(srcpath).filter(function(file) {
            return statAsync(path.join(srcpath, file)).then((stat) => {
                return stat.isDirectory();
            });
        }.bind(this));
    };

    this._newUser = function() {
        return {
            name: "",
            twitter: {},
            facebook: {}
        };
    };

    this.writeUser = function(user, domain, data) {
        let d = userData[user] ? lodash.clone(userData[user]) : this._newUser();
        lodash.set(d, domain, data);
        return writeFileAsync(path.join(config.dirname, user, "/", config.filenames), JSON.stringify(d));
    };

    this.getUser = function(userId) {
        return this.loadUsers().then((a) => {
            let user = lodash.find(userData, (a) => {
                return a.twitter_id == userId
            });
            return user;
        });
    };

    this.getTemplate = function(tpl) {
        return readFileAsync(path.join(config.templateDir, tpl + ".hbs")).then(a => {
            return a.toString()
        })
    };

    this.writeTweets = function(obj) {
        let user = obj.user,
            tweets = obj.tweets;

        this.getTemplate("meList").then(a => {
            console.log(a)
            let tpl = handlebars.compile(a),
                file = path.join(config.dirname,user,config.default) 
            require("jsdom").env({
                file: file,
                done: function(err, window) {
                  console.log("Calling DOM")
                    var $ = require("jquery")(window);

                    $("#portfolio").html();
                    for(var i = 0; i < tweets.length; i++){
                        let string = tpl({link : tweets[i]});
                        $("#portfolio").append(string);
                    }
                    writeFileAsync(file,$("html").html());
                  }
            });
        });
        return obj;
    };

};