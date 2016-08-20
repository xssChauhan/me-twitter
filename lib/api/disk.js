"use strict";

var fs = require("fs"),
    Promise = require("bluebird"),
    path = require("path"),
    _ = require("lodash");

var readFileAsync = Promise.promisify(fs.readFile),
    appendFileAsync = Promise.promisify(fs.appendFile),
    readDirAsync = Promise.promisify(fs.readdir),
    statAsync = Promise.promisify(fs.stat),
    writeFileAsync = Promise.promisify(fs.writeFile);

var config = {
  dirname : "lib/users/",
  filenames : "user.json"
}
module.exports = new function(){
  this._fs = fs;

  //Load the users in the application
  this.loadUser = function(user){
    console.log("calling loaduser");
    var dirname = "lib/users/",
        filenames = "user.json",
        data = _.set({},"key",user);
        return readFileAsync( path.join(config.dirname , user , "/" , config.filenames) , "utf8").then(function(data) {
            let temp = JSON.parse(data);
            _.set(userData, this.key, temp);
            console.log("REading user data",userData);
            return _.set({},this.key,temp);
        }.bind(data));
  };

  this.loadUsers = function() {
      return this._getDirectories(config.dirname).map((a) => {
          return this.loadUser(a)
      });
  };

  this._getDirectories = function(srcpath) {
    return readDirAsync(srcpath).filter(function(file) {
      return statAsync(path.join(srcpath, file)).then((stat) => {
        return stat.isDirectory();
      });
    }.bind(this));
  };

  this.writeUser = function(user,domain,data){
    let d = userData[user];
    _.set(d,domain,data);
    return writeFileAsync(path.join(config.dirname , user , "/" , config.filenames),d );
  };

};
