"use strict";

var fs = require("fs"),
    Promise = require("bluebird"),
    path = require("path"),
    _ = require("lodash");

var readFileAsync = Promise.promisify(fs.readFile),
    appendFileAsync = Promise.promisify(fs.appendFile),
    readDirAsync = Promise.promisify(fs.readdir),
    statAsync = Promise.promisify(fs.stat),
    writeFileAsync = Promise.promisify(fs.writeFile),
    accessSync = Promise.promisify(fs.access);

var config = {
  dirname : "lib/users/",
  filenames : "user.json"
}
module.exports = new function(){
  this._fs = fs;

  this.checkUser = function(user){
    return accessSync(path.join(config.dirname + user));
  };
  //Load the users in the application
  this.loadUser = function(user,flag){
    console.log("calling loaduser",flag);
    let data = _.set({},"key",user);
        return readFileAsync( path.join(config.dirname , user , "/" , config.filenames) , "utf8").then(function(data) {
            let temp = JSON.parse(data);
            _.set(userData, this.key, temp);
            if(flag){
              return _.set({},this.key,temp)
            }else{
              return temp
            }
        }.bind(data));
  };

  this.loadUsers = function(flag) {
      console.log("Calling loadUSers",flag)
      flag = flag?flag:false;
      return this._getDirectories(config.dirname).map((a) => {
          return this.loadUser(a,flag)
      });
  };

  this._getDirectories = function(srcpath) {
    return readDirAsync(srcpath).filter(function(file) {
      return statAsync(path.join(srcpath, file)).then((stat) => {
        return stat.isDirectory();
      });
    }.bind(this));
  };
  this._newUser = function(){
    return {
      name : "",
      twitter : {},
      facebook : {}
    };
  };
  this.writeUser = function(user,domain,data){
    let d = userData[user]?_.clone(userData[user]):this._newUser();
    console.log("From write user",d);
    _.set(d,domain,data);
    return writeFileAsync(path.join(config.dirname , user , "/" , config.filenames),JSON.stringify(d) );
  };

};
