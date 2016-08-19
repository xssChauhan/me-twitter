"use strict";

var fs = require("fs"),
    Promise = require("bluebird");

//Promisifying the file systems
var config = {
  userFile : "lib/users/user.json"
};

Promise.promisifyAll(fs);

module.exports = new function(){
  this.write = function(data){
    return fs.appendFileAsync(config.userFile,data).bind(this);
  };

  //Load the users in the application
  this.loadUser = function(){
    return fs.readFileAsync(config.userFile).bind(this);
  }
};
